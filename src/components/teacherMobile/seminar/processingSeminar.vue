<template>
  <div class="root" @click="closeMenu">
    <div class="head1">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">{{name}}-讨论课</span>
      <OCMenu></OCMenu>
    </div>

    <div class="main">
      <down-menu></down-menu>
      <div class="head2">
        <span style="width:70%;margin-left: 15%">{{seminar}}</span>
        <span style="height: 25px;width:15%;color: #ffd070;" @click="reback()">继续</span>
      </div>
      <div class="main1">
        <span style="width:70%;letter-spacing:1px;visibility: hidden"></span>
        <span style="width: 30%;text-align: right;padding-right: 5%">已有{{askTimes}}位同学提问</span>
      </div>
      <div class="main2">
        <div style="width: 25%;height: 100%;background: #fff;border: 1px solid #dddddd;border-left: transparent">
          <div class="group1" v-for="(item,index) in showGroup" @click="switchGroup(index.toString())" :id="index.toString()">{{item.num}}</div>
        </div>
        <div style="width: 55%;height: 100%;display: flex;align-items: center;justify-content: center;flex-direction: column">
          <div class="score">{{currentType==='1'?"展示分数":"提问分数"}}</div>
          <div class="score-input" @click="showScoreSelect"><input class="input" placeholder="输入成绩" v-model="currentType==='1'?showGroup[chooseAlter].score:askGroup[chooseAsking].score" disabled="disabled"></input></div>
          <div class="scoreSelect" id="scoreSelect">
            <div class="row1">
              <div class="s1" @click="chooseScore(0)">0</div>
              <div class="s1" @click="chooseScore(0.5)">0.5</div>
              <div class="s1" @click="chooseScore(1)">1</div>
              <div class="s1" @click="chooseScore(1.5)">1.5</div>
              <div class="s1" @click="chooseScore(2)">2</div>
              <div class="s1" @click="chooseScore(2.5)">2.5</div>
            </div>
            <div class="row2">
              <div class="s2" @click="chooseScore(3)">3</div>
              <div class="s2" @click="chooseScore(3.5)">3.5</div>
              <div class="s2" @click="chooseScore(4)">4</div>
              <div class="s2" @click="chooseScore(4.5)">4.5</div>
              <div class="s2" @click="chooseScore(5)">5</div>
            </div>
          </div>
          <div style="width: 100%;height: 10%;display: flex;align-items: center"><button style="width: 50%;height:60%;margin-left: 40%;background: transparent;border: 1px solid red;color:red;border-radius: 4px" @click="chooseThis">选择该小组展示</button></div>
        </div>
        <div style="width: 20%;height: 100%;background: #fff;">
          <div class="asking" v-for="(item,index) in askGroup" :id="askId(index)" @click="switchAsk(index)">{{item.team.teamSerials}} {{item.student.name}}</div>
        </div>
      </div>
      <div class="main3">
        <button class="button3" @click="sendScore"><span>打分</span></button>
        <Button v-if="isConnect" class="button1"  @click="getAsk"><span>{{currentType==='1'?"抽取提问":"下个提问"}}</span></Button>
        <button class="button2" @click="nextShow"><span>下组展示</span></button>
      </div>
    </div>

    <!--<el-dialog :visible.sync="pauseDialogVisible" :show-close="false" top="40%" width="60%" center>-->
      <!--<div slot="title" style="color:red">-->
        <!--<Icon type="md-information-circle" size="35"/>-->
      <!--</div>-->
      <!--<div style="text-align: center;font-size: 2vmax;color: #000;">-->
        <!--<p>确认暂停</p>-->
        <!--<p>{{name}}</p>-->
        <!--<p>{{seminar}}讨论课</p>-->
      <!--</div>-->
      <!--<div slot="footer">-->
        <!--<button class="textButton" onclick="window.location.href='../../seminar/MTpauseSeminar'">确认</button>-->
        <!--<button class="textButton" @click="pauseDialogVisible=false">取消</button>-->
      <!--</div>-->
    <!--</el-dialog>-->

    <el-dialog :visible.sync="endDialogVisible" :show-close="false" top="40%" width="60%" center :close-on-click-modal='false' :close-on-press-escape='false'>
      <div slot="title" style="color:red">
        <Icon type="md-information-circle" size="35"/>
      </div>
      <div style="text-align:center;font-size: 2vmax;color: #000;">
        <p>讨论课已结束</p>
        <p>请设置书面报告截止时间</p>
        <DatePicker type="datetime" placeholder="选择日期和时间" style="width: 100%;margin-top: 5%" size="small" v-model="DDL"></DatePicker>
      </div>
      <div slot="footer">
        <button class="textButton" @click="confirmEnd()">确认</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import SockJS from  'sockjs-client';
  import  Stomp from 'stompjs';
  export default {
    name: "processingSeminar",
    data() {
      return {
        DDL:new Date().toLocaleDateString(),
        id:localStorage.getItem("token"),
        name:this.$route.params.name,
        courseNumber:this.$route.params.courseNumber,
        seminar:this.$route.params.seminar,
        seminarId:this.$route.params.seminarNumber,
        className:this.$route.params.class,
        classId:this.$route.params.classNumber,
        //当前类型(提问/展示) 1表示展示 0表示提问
        currentType:'1',
        showNumber:0,

        //被提问的次数
        askTimes:0,

        //展示的小组
        showGroup:[],

      // {
      //   id:'',
      //     attendanceId:'',
      //   order:'',
      //   num:'',
      //   score:'',
      //   isPresent:''
      // }

        //提问的人
        askGroup:[],
        chooseShowing:'0',
        chooseAlter:0,
        chooseAsking:0,

        endDialogVisible:false,

        //sockjs
        stompClient:'',
        timer:'',
        isConnect:false,
      }
    },
    methods:{

      getAsk:function () {
        //抽取提问
        if (this.isConnect){
          this.stompClient.send(`/app/teacher/class/${this.$data.classId}/seminar/${this.$data.seminarId}/pickQuestion`, {}, JSON.stringify(this.$data.showGroup[this.showNumber].attendanceId));
          this.$data.currentType=0;
        }
        // console.log(this.showGroup)

      },

      initWebSocket() {
        this.connection();
        let that= this;
        // 断开重连机制,尝试发送消息,捕获异常发生时重连
        // this.timer = setInterval(() => {
        //   try {
        //     that.stompClient.send("test1");
        //   } catch (err) {
        //     console.log("断线了: " + err);
        //     that.connection();
        //   }
        // }, 5000);
      },
      connection() {
        // 建立连接对象
        this.socket = new SockJS('http://119.29.24.35:8001/rbs-websocket');

        // 获取STOMP子协议的客户端对象
        this.stompClient = Stomp.over(this.socket);

        // 定义客户端的认证信息,按需求配置

        //todo add 向服务器发起websocket连接
        this.stompClient.connect({},{},
          (frame) => {
            // this.stompClient.send('/app/teacher/class/' + this.$data.classId + '/seminar/' + this.$data.seminarId + '/pickQuestion', {}, JSON.stringify('91'));

            //todo 从loacalStorage获得teacherId
            let teacherId = parseInt(localStorage.getItem("teacherId"));

            this.isConnect = true

            //监听学生提问
            this.stompClient.subscribe('/topic/client/class/' + this.$data.classId + '/seminar/' + this.$data.seminarId + '/raiseQuestion', (msg) => { // 订阅服务端提供的某个topic
              this.askTimes = JSON.parse(msg.body)
            }, {});


            //抽奖
            this.stompClient.subscribe(`/topic/client/class/${this.$data.classId}/seminar/${this.$data.seminarId}/pickQuestion`, (msg) => { // 订阅服务端提供的某个topic
              //将提问放到队列
              // this.askGroup.push({
              //   (JSON.parse(msg.body))

              let ask = (JSON.parse(msg.body));
              ask.score = '';

              this.askGroup.push(ask);

              console.log(JSON.parse(msg.body));

              //更新当前提问人数
              this.stompClient.send(`/app/student/${teacherId}`,
                {},
                JSON.stringify({attendanceId:this.showGroup[this.showNumber].attendanceId}),
          )
            }, {});

            //进入时获取提问人数
            this.stompClient.subscribe(`/topic/client/student/${teacherId}`, (msg) => {
              console.log(JSON.parse(msg.body))
              this.askTimes = JSON.parse(msg.body)
            },{});

            this.stompClient.send(`/app/student/${teacherId}`,
              {},
              JSON.stringify({attendanceId:this.showGroup[this.showNumber].attendanceId}),
            )

            this.$data.isConnect=true
          }, (err) => {
            // 连接发生错误时的处理函数
            console.log('连接失败');
            console.log(err);
          });
      },    //连接 后台
      disconnect() {
        if (this.stompClient) {
          this.stompClient.disconnect();
        }
      },  // 断开连接

      back:function(){
        this.$router.go(-1);
      },

      askId:function(index){
        return 'ask'+index
      },
      confirmEnd:function(){
        let _this=this;
        this.$axios({
          url:'/seminar/'+_this.$data.seminarId+'/class/'+_this.$data.classId+'/reportDDL',
          method:'put',
          headers:{
            'Authorization': 'Bearer ' + _this.$data.id
          },
          data:{
            reportDDL:this.myFormatDate(_this.$data.DDL)
          }
        }).then(function(response) {
          if(response.data===true){
            _this.$message({
              message:'设置成功!',
              type:'success'
            })
          }

            _this.$axios({
              url:'/seminar/'+_this.$data.seminarId+'/class/'+_this.$data.classId+'/status',
              method:'put',
              headers:{
                'Authorization': 'Bearer ' + _this.$data.id
              },
              data:{
                status:2
              }
            }).then(function(response) {
              if (response.data === true) {
                _this.$router.push({
                  name:'teacherMobileSpecificSeminarHome',
                  params:{
                    name:_this.$data.name,
                    courseNumber:_this.$data.courseNumber,
                    seminar:_this.$data.seminar,
                    seminarNumber:_this.$data.seminarId,
                    class:_this.$data.className,
                    classNumber:_this.$data.classId
                  }
                })
              }
            });
        }).catch(function(error){
          console.log(error)
        });
      },
      checkTime:function(i){
        if (i<10){
          const x="0" + i
          return x;
        }
        return i;
      },
      myFormatDate:function(abc){
        const date = abc.toString();
        var date1=new Date(date);
        return date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate() + ' ' + this.checkTime(date1.getHours()) + ':' + this.checkTime(date1.getMinutes()) + ':' + this.checkTime(date1.getSeconds());
      },
      closeMenu: function () {
        const menu = document.getElementById("show");
        if (document.getElementById("show").style.display === "block") {
          if (!menu.contains(event.target)) document.getElementById("show").style.display = "none";
        }
      },

      switchGroup:function(id){
        let _this=this;
        if(id!=='0'&&_this.$data.showGroup[parseInt(id)].present==='0'){
          _this.$message({
            message:'该组还未展示哦',
            type:'warning'
          })
        }
        else {
          _this.$data.currentType = '1';
          _this.$data.showGroup[_this.$data.chooseAlter].num = _this.$data.showGroup[_this.$data.chooseAlter].num.split("▶")[0];
          _this.$data.chooseAlter = id;
          _this.$data.showGroup[_this.$data.chooseAlter].num += " ▶";
          document.getElementById(_this.$data.chooseAsking).style.color = "black";
        }
      },

      switchAsk:function(id) {
        let _this = this;
        _this.$data.currentType = '0';
        document.getElementById('ask'+_this.$data.chooseAsking).style.color = "black";
        _this.$data.chooseAsking=id;
        document.getElementById('ask'+_this.$data.chooseAsking).style.color = "red"
      },

      nextShow:function(){
        let _this=this;
        this.stompClient.send('/app/teacher/class/' + this.$data.classId + '/seminar/' + this.$data.seminarId + '/nextTeam', {}, JSON.stringify({teamOrder:this.$data.showNumber+1,attendanceId:this.showGroup[this.showNumber].attendanceId}));
        if(_this.$data.chooseShowing.toString()!==(_this.$data.showGroup.length-1).toString()){
          _this.$data.currentType='1';
          if(document.getElementById('ask'+_this.$data.chooseAsking)) {
            document.getElementById('ask' + _this.$data.chooseAsking).style.color = "black";
          }
          _this.$data.askGroup.splice(0,_this.$data.askGroup.length);
          document.getElementById(_this.$data.chooseShowing).style.color="black";
          document.getElementById(_this.$data.chooseShowing).style.background="#fff";
          _this.$data.chooseShowing=parseInt(_this.$data.showNumber)+1;
          _this.$data.showNumber=parseInt(_this.$data.showNumber)+1;
          document.getElementById(_this.$data.chooseShowing).style.color="red";
          document.getElementById(_this.$data.chooseShowing).style.background="#f2f2f2";
          _this.$data.showGroup[_this.$data.chooseAlter].num=_this.$data.showGroup[_this.$data.chooseAlter].num.split(" ▶")[0];
          _this.$data.chooseAlter=_this.$data.chooseShowing;
          _this.$data.showGroup[_this.$data.chooseShowing].num+=" ▶";
        }
        else{
          _this.$data.showGroup[_this.$data.chooseAlter].num=_this.$data.showGroup[_this.$data.chooseAlter].num.split(" ▶")[0];
          document.getElementById(_this.$data.chooseShowing).style.color="black";
          document.getElementById(_this.$data.chooseShowing).style.background="#fff";
          _this.$data.endDialogVisible=true;
        }
      },
      showScoreSelect:function(){
        event.stopPropagation();
        if (document.getElementById("scoreSelect").style.display === "none") {//如果show是隐藏的
          document.getElementById("scoreSelect").style.display = "block";//show的display属性设置为block（显示）
        }
        else {
          document.getElementById("scoreSelect").style.display = "none";
        }
      },
      chooseScore:function(number){
        let _this=this;
        if(_this.$data.currentType==='1'){
          _this.$data.showGroup[_this.$data.chooseAlter].score=number;
        }
        else{
          _this.$data.askGroup[_this.$data.chooseAsking].score=number;
        }
        document.getElementById("scoreSelect").style.display = "none";
      },

      getAllTeam:function(){
        let _this=this;
        this.$axios({
          url:'/attendance/?cClassId='+_this.$data.classId+'&seminarId='+_this.$data.seminarId,
          method:'get',
          headers:{
            'Authorization': 'Bearer ' + this.$data.id
          }
        }).then(function(response){
          _this.$data.showGroup.splice(0,_this.$data.showGroup.length);
          for(var i=0;i<response.data.length;i++) {
            _this.$data.showGroup.push({
              attendanceId:response.data[i].id,
              id: response.data[i].teamBaseInfoVO.id,
              order: response.data[i].teamOrder,
              num: response.data[i].teamBaseInfoVO.teamSerials,
              score: response.data[i].presentationScore,
              present:(response.data[i].present).toString()
            })
          }

          console.log(_this.$data.showGroup);

          for(var j=_this.$data.showGroup.length-1;j>=0;j--){
            if(_this.$data.showGroup[j].present==='1') {
              console.log('aaaa'+j);
              _this.$data.chooseShowing=(j+1).toString();
              _this.$data.chooseAlter=_this.$data.chooseShowing;
              break;
            }
            if(j===0){
              _this.$data.chooseShowing=j.toString();
              _this.$data.chooseAlter=_this.$data.chooseShowing;
            }
          }
          console.log(_this.$data.chooseShowing);
        }).catch(function(error){
          console.log(error)
        });
      },
      reback:function(){
        let _this=this;
        document.getElementById(_this.$data.chooseShowing).style.color="red";
        document.getElementById(_this.$data.chooseShowing).style.background="#f2f2f2";
        _this.$data.showGroup[_this.$data.chooseAlter].num+=" ▶";
      },
      chooseThis:function(){
        document.getElementById(this.$data.chooseShowing).style.color="black";
        document.getElementById(this.$data.chooseShowing).style.background="#fff";
        this.$data.chooseShowing=this.$data.chooseAlter;
        document.getElementById(this.$data.chooseShowing).style.color="red";
        document.getElementById(this.$data.chooseShowing).style.background="#f2f2f2";
      },
      sendScore:function(){
        let _this=this;
        if(_this.$data.currentType==='1') {
          this.$axios({
            url: '/seminarscore/presentationscore',
            method: 'put',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
            data: {
              seminarId: _this.$data.seminarId,
              classId: _this.$data.classId,
              teamId: _this.$data.showGroup[_this.$data.chooseAlter].id,
              presentationScore: _this.$data.showGroup[_this.$data.chooseAlter].score
            }
          }).then(function (response) {
            if (response.data === true) {
              _this.$message({
                message: '打分成功!',
                type: 'success'
              })
            }
          }).catch(function (error) {
            console.log(error);
          })
        }
        else{
          this.$axios({
            url: '/question/student/'+_this.$data.askGroup[_this.$data.chooseAsking].student.id,
            method: 'post',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
            data: {
              attendanceId:_this.$data.showGroup[_this.$data.chooseShowing].attendanceId,
              teamId: _this.$data.askGroup[_this.$data.chooseAsking].student.teamId,
              score: _this.$data.showGroup[_this.$data.chooseAsking].score
            }
          }).then(function (response) {
            if (response.data === true) {
              _this.$message({
                message: '打分成功!',
                type: 'success'
              });
            }
          }).catch(function (error) {
            console.log(error);
          })
        }
      },

    },
    created(){
      this.getAllTeam();
    },
    mounted() {
      this.initWebSocket();
    },
    beforeDestroy: function () {
      // 页面离开时断开连接,清除定时器
      this.disconnect();
      clearInterval(this.timer);
    },

  }
</script>

<style scoped>
  .head1{
    text-align: center;
    background: #96C864;
    width:100%;
    height: 8%;
    border:1px solid transparent;
    font-family:思源黑体;
    font-size: 2.5vmax;
    color:#000;
    letter-spacing:1px;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
  }
  .head2{
    text-align: center;
    background: #fff;
    width:100%;
    height: 10%;
    font-size: 2vmax;
    color:#000;
    letter-spacing:1px;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
  }
  .root {
    height: 100%;
    width: 100%;
    background: #f2f2f2;
  }
  .main{
    height: 84%;
    width:100%;
    background: #f2f2f2;
  }
  .main1{
    height: 5%;
    width:100%;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    font-size:1.5vmax;
    margin-left: 3%;
    color:#0B710A;
  }
  .main2{
    height: 65%;
    width:100%;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
  }
  .main3{
    height: 30%;
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .score{
    font-size: 3vmax;
  }
  .score-input{
    width:80%;
    height:50%;
    border: #BBBBBB solid 1px;
    margin-top:15%;
    background: #FFFFFF;
  }
  .input{
    background-color:#FFFFFF;
    border: #BBBBBB solid 1px;
    height:60%;
    width:60%;
    margin-top: 15%;
    margin-left: 10%;
    font-size: 8vmax;
    text-align: center;
  }
  .button1 {
    display: inline-block;
    background-color: #96c864;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 2vmax;
    /*padding: 20px;*/
    height: 20%;
    width: 50%;
    margin-top: 3%;
    border-radius:6px
  }
  .button2 {
    display: inline-block;
    background-color: #ffffff;
    border: solid 1px #BBBBBB;
    color: #96C864;
    text-align: center;
    font-size: 2vmax;
    /*padding: 20px;*/
    height: 20%;
    width: 50%;
    margin-top: 3%;
    border-radius:6px
  }
  .button3 {
    display: inline-block;
    background-color: green;
    border: solid 1px #BBBBBB;
    color: #fff;
    text-align: center;
    font-size: 2vmax;
    /*padding: 20px;*/
    height: 20%;
    width: 50%;
    margin-top: 3%;
    border-radius:6px
  }
  .input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { /* WebKit*/
    color:#CCCCCC;
    font-size:2vmax;
    padding: 5%;
  }
  .group1{
    font-size: 2vmax;
    height: 16%;
    width: 100%;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
  }
  .group2{
    font-size: 2vmax;
    height: 17%;
    width: 100%;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
  }
  .asking{
    height:10%;
    width:90%;
    font-size:1.5vmax;
    display: flex;
    align-items: center;
    margin-left: 5%;
    border-bottom:1px solid #f2f2f2;
    font-weight: bold;
    color:black;
  }
  .textButton{
    border: 0px;
    background: #fff;
    font-size:2vmax;
    color:#259B24;
    width: 30%;
  }
  .scoreSelect{
    width: 60%;
    background: #fff;
    height: 15%;
    display: none;
    position: absolute;
    margin-top: 35%;
    border-radius: 5px;
    border: 1px solid #c6e2ff;
    filter:alpha(Opacity=60);-moz-opacity:0.7;opacity: 0.7;
    font-size: 130%;
  }
  .row1{
    width: 100%;
    height: 50%;
    color:#000;
  }
  .row2{
    width: 100%;
    height: 50%;
    color:#000;
  }
  .s1{
    float:left;
    width: 16%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .s2{
    float:left;
    width: 16%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
