<template>
  <div class="root" id="root">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">{{this.$route.params.name}}</span>
      <span style="visibility: hidden"><Icon type="ios-arrow-back" size="large"/></span>
    </div>
    <div class="main">
      <div class="header">修改讨论课</div>
      <div class="base">
        <input class="input1" placeholder="讨论课主题" v-model="seminar"></input>
        <textarea class="input2" placeholder="讨论课主要内容、要求、具体讨论" v-model="intro"></textarea>
      </div>
      <div class="visible">
        <div class="col1">讨论课是否可见</div>
        <div class="col2" id="vis" @click="isVisble">✔</div>
      </div>
      <div class="info">
        <div class="row">
          <div class="row-col1">展示报名开始时间：</div>
          <div class="row-col2">
            <DatePicker type="datetime" placeholder="选择展示报名开始时间" style="width: 80%;border: 1px solid #259B24;border-radius: 5px" v-model="startTime"></DatePicker>
          </div>
        </div>
        <div class="row">
          <div class="row-col1">展示报名结束时间：</div>
          <div class="row-col2">
            <DatePicker type="datetime" placeholder="选择展示报名截止时间" style="width: 80%;border: 1px solid #259B24;border-radius: 5px" v-model="endTime"></DatePicker>
          </div>
        </div>
        <div class="row">
          <div class="row-col1">报名小组数：</div>
          <div class="row-col2">
            <input style="width: 30%;height: 50%;border: 1px green solid;border-radius: 3px;padding:0 2% 0 2%;font-size: 120%" v-model="maxTeam"></input>
          </div>
        </div>
        <div class="row">
          <div class="row-col1">所属Round：</div>
          <div class="row-col2">
            <el-select v-model="roundId" class="select">
              <el-option v-for="item in roundList" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="time">
        <div style="height: 20%;width: 100%;margin-left: 5%;font-size: 130%;color:#000;display: flex;align-items: center">书面报告提交截止时间：</div>
        <div v-for="item in classList" style="width: 100%;height: 20%">
          <div style="float:left;height: 100%;width: 40%;padding-left: 10%;font-size: 120%;display: flex;align-items: center">{{item.name}}</div>
          <div style="float:left;height: 100%;width: 60%;display: flex;align-items: center">
            <DatePicker type="datetime" placeholder="选择展示报名截止时间" style="width: 80%;border: 1px solid #259B24;border-radius: 5px" v-model="item.time"></DatePicker>
          </div>
        </div>
      </div>
      <div style="height: 3%;display: flex;align-items: center;width: 25%;margin-left: 70%;margin-top: 5%">
        <Button style="width:100%;height: 100%;" type="error" ghost @click="deleteSeminar">删除该讨论课</Button>
      </div>
        <button class="button" @click="alterSeminar">修改</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "createSeminar",
    data(){
      return{
        id:localStorage.getItem("token"),
        courseName:this.$route.params.name,
        courseNumber:this.$route.params.courseNumber,
        seminar:this.$route.params.seminar,
        seminarNumber:this.$route.params.seminarNumber,
        roundId:undefined,
        roundName:'',
        intro:'',
        maxTeam:'',
        visible:1,//1表示可见 0表示不可见
        startTime:'',
        endTime:'',
        roundList:[{
          name:'',
          id:'',
        }],
        classList:[{
          name: '',
          id: '',
          time: ''
        }]
      }
    },
    methods: {
      hei: function () {
        let Height = window.innerHeight;
        document.getElementById("root").style.height = Height*1.5 + "px";
      },
      isVisble: function () {
        if (document.getElementById("vis").style.color === "green") {
          document.getElementById("vis").style.color = "gray";
          this.$data.visble = 0;
        } else {
          document.getElementById("vis").style.color = "green";
          this.$data.visble = 1;
        }
      },
      alterSeminar:function(){
        let _this=this;
        this.$axios({
          url:'/seminar/'+this.$route.params.seminarNumber,
          method:'put',
          headers:{
            'Authorization': 'Bearer ' + this.$data.id
          },
          data: {
            roundId: _this.$data.roundId,
            topic: _this.$data.seminar,
            intro: _this.$data.intro,
            maxTeam: _this.$data.maxTeam,
            visible: _this.$data.visible,
            enrollStartTime: this.myFormatDate(_this.$data.startTime),
            enrollEndTime: this.myFormatDate(_this.$data.endTime)
          }
        }).then(function(response1){
          for(var i=0;i<_this.$data.classList.length;i++) {
            _this.$axios({
              url: '/seminar/' + _this.$data.seminarNumber + '/class/'+_this.$data.classList[i].id+'/reportDDL',
              method: 'put',
              headers: {
                'Authorization': 'Bearer ' + _this.$data.id
              },
              data: {
                reportDDL: _this.myFormatDate(_this.$data.classList[i].time)
              }
            }).then(function (reposonse2) {
              if (response1.data === true && reposonse2.data === true) {
                _this.$message({
                  message: '修改成功!',
                  type: 'success'
                });
                _this.enter();
              } else {
                _this.$message({
                  message: '出了一点意外哦',
                  type: 'error'
                })
              }
            }).catch(function (error) {
              console.log(error)
            });
          }
        }).catch(function(error){
          console.log(error);
        })
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
      enter:function(){
        this.$router.push({
          name:'teacherMobileSpecificSeminar',
          params:{
            name:this.$data.courseName,
            courseNumber:this.$data.courseNumber
          }
        })
      },
      getSeminarInfo:function(){
        let _this=this;
        this.$axios({
          url:'/seminar/'+this.$route.params.seminarNumber,
          method: 'get',
          headers:{
            'Authorization': 'Bearer ' + this.$data.id
          },
        }).then(function(response){
          _this.$data.seminar=response.data.seminarTopic;
          _this.$data.intro=response.data.seminarIntro;
          _this.$data.visible=response.data.visible;
          _this.$data.maxTeam=response.data.maxTeam;
          _this.$data.startTime=response.data.enrollStartTime;
          _this.$data.endTime=response.data.enrollEndTime;
          _this.$data.roundId=response.data.roundId;
          if(response.data.visible===1){
            document.getElementById("vis").style.color = "green";
          }
          else{
            document.getElementById("vis").style.color = "gray";
          }
        }).catch(function(error){
          console.log(error);
        })
      },
      deleteSeminar:function(){
        let _this=this;
        this.$axios({
          url: '/seminar/' + this.$data.seminarNumber,
          method: 'delete',
          headers: {
            'Authorization': 'Bearer ' + this.$data.id
          },
        }).then(function(response){
          if(response.data===true){
            _this.$message({
              message:'删除成功!',
              type:'success'
            })
            _this.enter();
          }
          else{
            _this.$message({
              message:'出了一点意外哦',
              type:'error'
            })
          }
        })
      },
      back:function(){
        this.$router.go(-1);
      },
      getRound:function(){
        let _this=this;
        this.$axios({
          url:'course/'+this.$data.courseNumber+'/seminars',
          method:'get',
          headers: {
            'Authorization': 'Bearer ' + this.$data.id
          },
        }).then(function(response){
          _this.$data.roundList.splice(0,_this.$data.roundList.length);
          for(var i=0;i<response.data.rounds.length;i++) {
            var nameL = response.data.rounds[i].roundSerial;
            switch (nameL) {
              case 1: {
                nameL = '第一轮';
                break;
              }
              case 2: {
                nameL = '第二轮';
                break;
              }
              case 3: {
                nameL = '第三轮';
                break;
              }
              case 4: {
                nameL = '第四轮';
                break;
              }
              case 5: {
                nameL = '第五轮';
                break;
              }
              case 6: {
                nameL = '第六轮';
                break;
              }
              case 7: {
                nameL = '第七轮';
                break;
              }
              case 8: {
                nameL = '第八轮';
                break;
              }
              case 9: {
                nameL = '第九轮';
                break;
              }
              case 10: {
                nameL = '第十轮';
                break;
              }
              case 11: {
                nameL = '第十一轮';
                break;
              }
              case 12: {
                nameL = '第十二轮';
                break;
              }
              case 13: {
                nameL = '第十三轮';
                break;
              }
              case 14: {
                nameL = '第十四轮';
                break;
              }
              case 15: {
                nameL = '第十五轮';
                break;
              }
            }
            _this.$data.roundList.push({
              id: response.data.rounds[i].roundId,
              name: nameL
            });
          }
          _this.$data.classList.splice(0,_this.$data.classList.length);
          for(var i=0;i<response.data.cClasses.length;i++){
            _this.$data.classList.push({
              name:response.data.cClasses[i].name,
              id:response.data.cClasses[i].id,
              time:'',
            })
          }
        }).catch(function(error){
          console.log(error)
        })
      }
    },
    mounted() {
      this.hei();
      this.getSeminarInfo();
      this.getRound();
    }
  }
</script>

<style scoped>
  .head{
    text-align: center;
    background: #96C864;
    width:100%;
    height: 6%;
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
  .root {
    height: 100%;
    width: 100%;
    background: #fff;
  }
  .main{
    /*margin-top: 8%;*/
    height: 94%;
    width: 100%;
    background: #fff;
  }
  .header{
    height: 5%;
    width: 100%;
    background: white;
    border-bottom: 1px #aaaaaa solid;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 150%;
    color:black
  }
  .base{
    height: 22%;
    width: 96%;
    margin-left: 2%;
    border-bottom: 1px #aaaaaa solid;
  }
  .input1{
    width: 100%;
    height: 25%;
    border: none;
    font-size: 150%;
    border-bottom: 1px #aaaaaa solid;
    padding:5%
  }
  .input2{
    width: 100%;
    height: 70%;
    border: none;
    padding:1% 5% 1% 5%;
    font-size: 150%;
  }
  .input1::-webkit-input-placeholder, textarea::-webkit-input-placeholder { /* WebKit*/
    color:#CCCCCC;
    font-size:100%;
  }
  .input2::-webkit-input-placeholder, textarea::-webkit-input-placeholder { /* WebKit*/
    color:#CCCCCC;
    font-size:100%;
  }
  .visible{
    height: 7%;
    width: 100%;
  }
  .col1{
    width: 30%;
    height: 100%;
    color: #000;
    display: flex;
    align-items: center;
    margin-left: 5%;
    float: left;
    font-size:130%
  }
  .col2{
    width: 10%;
    height: 100%;
    color: green;
    display: flex;
    align-items: center;
    margin-left: 55%;
    float: left;
    font-size:200%;
  }
  .info{
    width: 100%;
    border-top: 1px #aaaaaa solid;
    height: 28%;
    background: #f2f2f2;
    color:#000
  }
  .row{
    width: 100%;
    height: 25%;
    color:#000
  }
  .row-col1{
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    float: left;
    font-size: 130%;
    padding-left: 5%;
    color:#000
  }
  .row-col2{
    width: 60%;
    height: 100%;
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    color:#000
  }
  .button{
    height: 8%;
    width: 95%;
    background: #96c864;
    color:white;
    font-size: 150%;
    border:none;
    position:fixed;
    bottom: 0;
  }
  .select{
    border: green 1px solid;
    border-radius: 5px;
    width: 80%;
  }
  .time{
    width: 100%;
    height: 20%;
    background: #f2f2f2;
    margin-top: 3%;
  }
</style>
