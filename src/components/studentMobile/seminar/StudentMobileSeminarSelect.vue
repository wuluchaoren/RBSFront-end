<template>
  <div class="root">
    <div class="header">
      <student-mobile-header :title="title"></student-mobile-header>
    </div>
    <div class="main">

      <div class="scroll">
        <div v-if="rounds==false" style="width: 100%;height: 80%;">
          <div style="text-align: center;margin-top: 50%">
           <span style="font-size: 4vmax">
            该课程尚未创建讨论课
            </span>
          </div>
        </div>

        <div  v-for="round in rounds" :key="round.roundId">
          <div class="title" @click="round.vis=!round.vis" >

            <img class="icon" src="../../../assets/book.png" />

            <span class="front">

            </span>

            <span class="center">
              第{{round.roundOrder}}轮
            </span>

            <img class="arrow" v-if="!round.vis" src="../../../assets/down-arrow.png" />
            <img class="arrow" v-else src="../../../assets/up-arrow.png">
          </div>

          <div class="content" v-if="round.vis">

            <div class="seminar-cell" v-for="seminar in round.mySeminars" :key="seminar.seminarId"
                 @click="enterSeminarIndex(seminar.seminarId,seminar.seminarTopic)">
              <span class="seminar-cell-front">{{seminar.seminarSerial}}</span>
              <span class="seminar-cell-center">{{seminar.seminarTopic}}</span>
              <span class="seminar-cell-end"><img class="arrow" src="../../../assets/arrow.png"></span>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import StudentMobileHeader from "../common/StudentMobileHeader";
    export default {
        name: "StudentMobileSeminarSelect",
      components: {StudentMobileHeader},
      data(){
          return{
            courseId:this.$route.query.courseId,
            courseName:this.$route.query.courseName,
            title:this.$route.query.courseName,
            rounds:'',
            getRoundsUrl:`course/${this.$route.query.courseId}/seminars`,
          }
        },
      created () {
        this.getRounds(this.getRoundsUrl,{});
      },
      methods:{
        getRounds:function (url,params) {
          this.$http.get(url,{params:{params}})
            .then(res=>{
              let datas = res.data.rounds

              let rounds =[]

              // all rounds in course
              datas.forEach((data)=>{
                //if empty
                if (!rounds[datas.roundSerial]){

                  let seminars = []

                  //all seminars in a round
                  data.seminarInfoVOS.forEach(seminar=>{

                    let s = {
                      seminarId:seminar.seminarId,
                      seminarTopic:seminar.seminarName,
                      seminarSerial:seminar.seminarSerial,
                      seminarVisible:seminar.visible
                    }
                    seminars.push(s)

                  })

                  let r = {
                    roundId:data.roundId,
                    roundOrder:data.roundSerial,
                    mySeminars:seminars,
                    vis:false,
                  }

                  rounds.push(r);
                }
              });

              var ro = rounds.filter(function (s) {
                return !(s==null);
              });

              this.rounds =  ro;

              console.log(rounds)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        enterSeminarIndex(id,topic){
          this.$router.push(
            {
              name:'StudentMobileSeminarIndex',
              query:{courseId:this.courseId,courseName:this.courseName,
              seminarId:id,seminarTopic:topic
              }
            }
            )
        }
      }
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
    background: #f2f2f2;
  }
  .main{
    /*margin-top: 8%;*/
    height: 89%;
    width: 100%;
  }
  .footer{
    position: absolute;
    text-align: center;
    width:100%;
    height: 7%;
    bottom: 0px
  }
  .title{
    height: 6vmax;
    display: flex;
    align-items: center;
    width:96%;
    font-size:3vmax;
    border-bottom: 1px #f2f6fc solid;
    background-color: white;
    margin-right: 2%;
    margin-left: 2%;
  }
  .center{
    width: 50%;
    word-wrap: break-word;
  }
  .front{
    margin-left: 5%;
    width: 30%;
  }
  .seminar-cell{
    height: 9vmax;
    display: flex;
    align-items: center;
    width:92%;
    font-size:2.4vmax;
    border-bottom: 1px #f2f6fc solid;
    background-color: white;
    margin-right: 4%;
    margin-left: 4%;
  }
  .seminar-cell-center{
    width: 50%;
    word-wrap: break-word;
    text-align: center;
  }
  .seminar-cell-front{
    margin-left: 5%;
    width: 20%;
    text-align: center;
    color: green;
  }
  .seminar-cell-end{
    width: 30%;
    text-align: center;
  }
  .icon{
    margin-left: 2%;
    left: 3vmax;
    width: 3vmax;
    height: 3vmax;
  }
  .arrow{
    right: 3vmax;
    width: 1.5vmax;
    height: 1.5vmax;
  }
  .scroll{
    max-height: 90vmax;
    overflow-y:scroll
  }
</style>
