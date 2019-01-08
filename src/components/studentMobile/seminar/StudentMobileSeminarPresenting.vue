<template>
  <div class="root">
    <div class="header">
      <student-mobile-header :title="title"></student-mobile-header>
    </div>
    <div class="main">
        <div style="display: flex;height:8vmax;width: 100%;justify-content:center">

          <div style="width: 35%;justify-content: center;text-align: center">
            <span class="span1" style="font-size:2.3vmax;color: red;">第{{presentTeamCount+1}}组展示中</span>
          </div>

          <div style="width:30%;display:block;justify-content: center;text-align: center">
            <span class="span2" style="font-size: 2.5vmax" >{{this.$route.query.seminarTopic}}</span>
          </div>

          <div style="width:35%;justify-content: center;text-align: center">
            <span class="span1" style="font-size:2vmax;">已有
              <span style="font-size: 3vmax;color: green">
                {{questionNumber}}
              </span>
              同学提问</span>
          </div>
        </div>

        <div v-for="(pre,index) in allPres" style="display: flex;height:8vmax;width: 100%;justify-content:center" :key="pre.attendanceId" :class="{shade:index%2==0}">
            <div style="width: 40%;justify-content: center;text-align: center">
              <span v-if="index==presentTeamCount" class="span1" style="color: red">第{{index+1}}组(展示）</span>
              <span v-else class="span1">第{{index+1}}组</span>
            </div>

            <div style="width:30%;display:block;justify-content: center;text-align: center">
              <span class="span2">{{pre.teamNumber}}</span>
            </div>

            <div  style="width:40%;visibility: hidden;justify-content: center;text-align: center">
              <span class="span1">第{{index+1}}组</span>
            </div>
        </div>
    <div class="footer">
      <Button v-if="isConnect" class="button" style="width: 50%" @click="raiseQuestion">Q&A</Button>
    </div>

      <Modal v-if="showStudent"
        v-model="askModal"
        title="提问">
        <div style="justify-content: center">
          <div style="text-align: center">
            <span class="span2">请组号为<span style="color: green">{{showStudent.team.teamSerials}}</span>的</span>
          </div>
          <div style="text-align: center">
            <span class="span2">学号为<span style="color: green">{{showStudent.student.account}}</span>的</span>
          </div>
          <div style="text-align: center">
            <span class="span1"><span style="color: green">{{showStudent.student.name}}</span>同学提问</span>
          </div>
        </div>
        <div slot="footer"></div>
      </Modal>
  </div>
  </div>
</template>

<script>
    import SockJS from  'sockjs-client';
    import  Stomp from 'stompjs';
    import StudentMobileHeader from "../common/StudentMobileHeader";
    import ThreePartCell from "../common/threePartCell";
    export default {
        name: "StudentMobileSeminarPresenting",
      components: {ThreePartCell, StudentMobileHeader},
      data(){
        return{
          title:this.$route.query.courseName+'-'+"讨论课",
          pres:[],
          questionNumber:0,
          getTeamListUrl:`attendance`,
          stompClient:'',
          presentTeamCount:0,
          timer:'',
          isConnect:false,
          showStudent:'',
          askModal:false
        }
      },
      created(){
        this.getTeamList(this.getTeamListUrl,{cClassId:this.$route.query.classId,seminarId:this.$route.query.seminarId})
      },
      mounted(){
        this.initWebSocket();
      },
      beforeDestroy: function () {
        // 页面离开时断开连接,清除定时器
        this.disconnect();
        clearInterval(this.timer);
      },
      methods:{
        initWebSocket() {
          this.connection();
          let that= this;
          // 断开重连机制,尝试发送消息,捕获异常发生时重连
          // this.timer = setInterval(() => {
          //   try {
          //     let studentId = localStorage.getItem('studentId')
          //     this.stompClient.send(`/app/student/${studentId}`,
          //       {},
          //       JSON.stringify({attendanceId:this.allPres[this.presentTeamCount].attendanceId}),
          //     )
          //   } catch (err) {
          //     console.log("断线了: " + err);
          //     that.connection();
          //   }
          // }, 5000);
        },
        connection() {
          // 建立连接对象
          let socket = new SockJS('http://119.29.24.35:8001/rbs-websocket');
          // 获取STOMP子协议的客户端对象

          this.stompClient = Stomp.over(socket);

          //向服务器发起websocket连接
          this.stompClient.connect({},{},() => {

            let studentId = localStorage.getItem('studentId')

            //监听下一组
            this.stompClient.subscribe(`/topic/client/class/${this.$route.query.classId}/seminar/${this.$route.query.seminarId}/nextTeam`, (msg) => {
              console.log(JSON.parse(msg.body))
              this.presentTeamCount = JSON.parse(msg.body)
              if (this.pres!=false){
                this.stompClient.send(`/app/student/${studentId}`,
                  {},
                  JSON.stringify({attendanceId:this.allPres[this.presentTeamCount].attendanceId}),
                )
              }
            },{});

            //监听抽取提问
            this.stompClient.subscribe(`/topic/client/class/${this.$route.query.classId}/seminar/${this.$route.query.seminarId}/pickQuestion`, (msg) => { // 订阅服务端提供的某个topic
              this.askModal=true
              this.showStudent =JSON.parse(msg.body)
              if (this.pres!=false){
                this.stompClient.send(`/app/student/${studentId}`,
                  {},
                  JSON.stringify({attendanceId:this.allPres[this.presentTeamCount].attendanceId}),
                )
              }
            }, {});

            //监听学生提问
            this.stompClient.subscribe(`/topic/client/class/${this.$route.query.classId}/seminar/${this.$route.query.seminarId}/raiseQuestion`, (msg) => {
              console.log(JSON.parse(msg.body))
              this.questionNumber = JSON.parse(msg.body)
            },{});

            //获取提问人数
            this.stompClient.subscribe(`/topic/client/student/${studentId}`, (msg) => {
              console.log(JSON.parse(msg.body))
              this.questionNumber = JSON.parse(msg.body)
            },{});

            if (this.pres!=false){
              this.stompClient.send(`/app/student/${studentId}`,
                {},
                JSON.stringify({attendanceId:this.allPres[this.presentTeamCount].attendanceId}),
              )
            }

            this.isConnect=true
          }, (err) => {
            // 连接发生错误时的处理函数
            console.log('失败')
            console.log(err);
          });
         },
        disconnect() {
          if (this.stompClient) {
            this.stompClient.disconnect();
          }
        },  // 断开连接
        getTeamList:function (url,params) {
          this.$http.get(url,{params:params})
            .then((res)=>{

              let datas = res.data

              let pres = []

              datas.forEach(presentation=>{
                let pre = {
                  teamId:presentation.teamBaseInfoVO.id,
                  teamNumber:presentation.teamBaseInfoVO.teamSerials,
                  teamName:presentation.teamBaseInfoVO.teamName,
                  preOrder:presentation.teamOrder,
                  isPresent:presentation.present,
                  attendanceId:presentation.id
                }

                pres[pre.preOrder-1] = pre

              })

              var r = pres.filter(function (s) {
                return !(s==null);
              });

              let presentTeamCount=0;

              r.forEach(pre=>{
                if (pre.isPresent==1){
                  presentTeamCount+=1;
                }
              })

              this.presentTeamCount = presentTeamCount;

              if (this.isConnect){
                let studentId = localStorage.getItem('studentId')
                this.stompClient.send(`/app/student/${studentId}`,
                  {},
                  JSON.stringify({attendanceId:r[presentTeamCount].attendanceId}),
                )
              }
              this.pres = r
              console.log(this.pres)
            })
            .catch(err=>{

            })
        },
        raiseQuestion:async function(){
            let studentId = localStorage.getItem('studentId')
            if (studentId){
              let message = {
                studentId:parseInt(studentId),
                attendanceId:this.pres[this.presentTeamCount].attendanceId,
                teamId:parseInt(this.$route.query.teamId),
              }
              await this.stompClient.send(`/app/teacher/class/${this.$route.query.classId}/seminar/${this.$route.query.seminarId}/raiseQuestion`,
                {},
                JSON.stringify(message),
              )
              // localStorage.setItem('studentId',(parseInt(studentId)+1).toString())
            }
            else {
            }

            // this.showStudent = {
            //   account:'24320162202805',
            //   name:'才悦动',
            //   teamNumber:'2-4'
            // }
            // this.askModal= true
        }
      },
      computed:{
          allPres:function () {
            console.log(this.pres)
            return this.pres;
          }
      },
    }
</script>

<style scoped>
  .header{
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
  .root {
    height: 100%;
    width: 100%;
    background: #fff;
  }
  .main{
    /*margin-top: 8%;*/
    height: 92%;
    width: 100%;
    background: #fff;
  }
  .shade{
    background-color:#f8f8f9;
  }
  .footer{
    text-align: center;
    position:fixed;
    width:100%;
    bottom: 8vmax
  }
  .span1{
    text-align: center;
    font-family:思源黑体;
    font-size:3vmax;
    color: black;
    width: 100%;
    line-height: 8vmax;
  }
  .span2{
    font-family:思源黑体;
    font-size:2.5vmax;
    color: black;
    text-align: center;
    line-height: 8vmax;
  }
  .button{
    display: inline-block;
    background-color: #96C864;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 2.5vmax;
    /*padding: 20px;*/
    height: 5vmax;
    width: 30%;
  }
</style>
