<template>
  <div class="root">
    <div class="main">
      <div class="header">
        <student-mobile-header :title="title"></student-mobile-header>
      </div>
      <CellGroup class="top-list">
        <Cell class="white" title="主题" :extra="seminarTopic">
            <span class="span1" slot="default">
              主题
            </span>
          <span class="span1" slot="extra">
              {{seminarTopic}}
            </span>
        </Cell>

        <Cell class="gray">
            <span class="span1" slot="default">
              课次序号
            </span>
          <span class="span1" slot="extra">
              第{{seminarOrder}}次
            </span>
        </Cell>

        <div class="white" style="width:100%;display:flex">
          <div style="width: 30%;">
              <span class="span1" style="margin-left: 3vmax" slot="default">
                要求
              </span>
          </div>
          <div style="width: 70%;text-align: center;">
                <span class="span2" slot="extra">
                {{seminarIntro}}
              </span>
          </div>
        </div>

      </CellGroup>

      <CellGroup class="list">

        <Cell>
                <span class="span1" slot="default">
                  报名
                </span>
          <span class="span2" slot="extra">
                  {{className}}
                  第{{preOrder}}组
          </span>
        </Cell>

      </CellGroup>

      <div class="white" style="display: flex;height:8vmax;width: 100%;justify-content:center">
        <div style="width: 30%;margin-left: 1vmax">
          <span class="span1">展示</span>
        </div>

        <div class="hidden-div">
        </div>

        <div class="left-div">
          <span v-if="score.presentationScore" class="span2 score">{{score.presentationScore}}</span>
          <span v-else class="span2 score">0</span>
        </div>
      </div>

      <div class="gray" style="display: flex;height:8vmax;width: 100%;justify-content:center">
        <div style="width: 30%;margin-left: 1vmax">
          <span class="span1">提问</span>
        </div>

        <div class="hidden-div">
        </div>

        <div class="left-div">
          <span v-if="score.questionScore" class="span2 score">{{score.questionScore}}</span>
          <span v-else class="span2 score">0</span>
        </div>

      </div>


      <div class="white" style="display: flex;height:8vmax;width: 100%;justify-content:center">
        <div style="width: 30%;margin-left: 1vmax">
          <span class="span1">书面报告</span>
        </div>

        <div class="hidden-div">
        </div>

        <div  class="left-div">
          <span v-if="score.questionScore" class="span2 score">{{score.questionScore}}</span>
          <span v-else class="span2 score">0</span>
        </div>

      </div>

        <div class="gray" style="display: flex;height:8vmax;width: 100%;justify-content:center">
          <div style="width: 30%;margin-left: 1vmax">
          <span class="span1">总分</span>
          </div>

        <div class="hidden-div">

        </div>
        <div  class="left-div">
          <span v-if="score.totalScore" class="span2 score">{{score.totalScore}}</span>
          <span v-else class="span2 score">0</span>
        </div>

      </div>
    </div>


  </div>
</template>

<script>
  import StudentMobileHeader from "../common/StudentMobileHeader";
  export default {
    name: "StudentMobileSeminarScore",
    components: {StudentMobileHeader},
    data () {
      return {
        title:this.$route.query.courseName+'-'+"讨论课",
        courseName:this.$route.query.courseName,
        seminarOrder:this.$route.query.seminarOrder,
        seminarIntro:this.$route.query.seminarIntro,
        className:this.$route.query.className,
        preOrder:this.$route.query.preOrder,
        seminarTopic:this.$route.query.seminarTopic,
        getMyTeamUrl:`seminarscore/team/${this.$route.query.teamId}`,
        score:''
      }
    },
    created() {
      this.getTeamScore(this.getMyTeamUrl,{seminarId:this.$route.query.seminarId})
    },
    methods:{
      getTeamScore(url,params){
        this.$http.get(url,{params:params})
          .then(res=>{
              this.score = res.data
            console.log(this.score)
          })
            .catch(err=>{
              console.log(err)
            })
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
    background: #fff;
  }
  .main{
    /*margin-top: 8%;*/
    height: 90%;
    width: 100%;
    background: #fff;
  }
  .footer{
    width:100%;
    height: 10%;
  }
  .time{
    color: red;
    font-size: 2vmax;
  }
  .upload-title{
    font-family:思源黑体;
    font-size:2vmax;
    color: black;
  }
  .upload{
    font-family:思源黑体;
    font-size:2vmax;
    color: green;
  }
  .no-upload{
    font-family:思源黑体;
    font-size:2vmax;
    color: red;
  }

  .top-list div{
    padding-top: 3%;
    padding-bottom: 3%;
    height: 10%;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
  }

  .list div{
    padding-top: 3%;
    padding-bottom: 3%;
    height: 10%;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
  }

  .list div:nth-child(odd) {
    height: 10%;
    background: #F2F2F2;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
  }


  .gray{
    height: 10%;
    background: #F2F2F2;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
  }
  .white{
    height: 10%;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
  }
  .span1{
    font-family:思源黑体;
    font-size:3vmax;
    margin-left: 6%;
    color: black;
  }
  .span2{
    font-family:思源黑体;
    font-size:2vmax;
    color: black;
    display: flex;
  }
  .button{
    display: inline-block;
    text-align: center;
    font-size: 2.5vmax;
    /*padding: 20px;*/
    height: 5vmax;
    width: 100%;
  }
  .hidden-div{
    width:60%;display:block;visibility: hidden;
  }
  .left-div{
    width: 10%;
  }
  .score{
    font-size: 3vmax;
    color: green;
  }
</style>
