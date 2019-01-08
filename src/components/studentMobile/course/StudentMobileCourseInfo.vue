<template>
  <div class="root">
    <div class="header">
      <student-mobile-header :title="title"></student-mobile-header>
    </div>
    <div class="main">

      <div class="intro">
        <div class="intro-title">
          课程简介:
        </div>
        <div class="intro-content">
          {{course.intro}}
        </div>
      </div>

      <Divider/>

      <div class="score">
        <div class="score-title">成绩计算规则
        </div>
        <div class="score-content">
          <div>
            课堂展示:{{course.presentationPercentage}}
          </div>
          <div>
            课堂提问:{{course.questionPercentage}}
          </div>
          <div>
            书面报告:{{course.reportPercentage}}
          </div>
        </div>
      </div>

      <div class="time" title="组队开始时间" extra="2018.10.11 12:00">
          <span slot="default" class="time-title">
            组队开始时间
          </span>
          <span slot="extra" class="time-content">
            {{course.teamStartTime}}
          </span>
      </div>

      <div class="time" title="组队截止时间" extra="2018.11.11 12:00">
          <span slot="default" class="time-title">
            组队截止时间
          </span>
          <span slot="extra" class="time-content">
            {{course.teamEndTime}}
          </span>
      </div>

      <Divider/>

      <!--<router-link :to="{name:'StudentMobileCourseTeamLimit',query:{courseId:this.$route.query.courseId,courseName:this.$route.query.courseName}}">-->
        <!--<div class="limit">-->
          <!--<span class="limit-title">-->
            <!--组队要求-->
          <!--</span>-->
          <!--<span class="limit-content">-->
            <!--<img src="../../../assets/arrow.png" style="width: 2vmax;height: 2vmax">-->
          <!--</span>-->
        <!--</div>-->
      <!--</router-link>-->

        <div class="base-require">
          <div class="base-require-title">
            组队基本要求:
          </div>
        </div>


        <div class="require" v-if="course.memberLimitStrategy">
          <div class="require-title">
            小组总人数（含组长）：
          </div>
          <div class="require-content">
            <div style="font-size: 2.5vmax">
              {{course.memberLimitStrategy.minMember}} - {{course.memberLimitStrategy.maxMember}}
            </div>
          </div>
        </div>

        <div class="require" v-if="course.courseMemberLimitStrategyVOS">
          <div class="require-title">
            组内选修课程人数：
          </div>
          <div class="require-content">
            <div v-for="st in course.courseMemberLimitStrategyVOS">
            <span style="font-size: 2vmax">
              {{st.courseName}}
            </span>
              <span style="font-size: 2vmax;margin-left: 3vmax">
              {{st.minMember}}-{{st.maxMember}}
            </span>
            </div>
          </div>
        </div>


        <div class="require">
          <div class="require-title">
            选修课人数要求：
          </div>
          <div class="require-content">
            <div v-if="course.courseMemberLimitStrategyStyle" style="font-size: 2.5vmax">
                均满足
            </div>
            <div v-else style="font-size: 2.5vmax">
                满足其一
            </div>
          </div>
        </div>

        <div class="comment">
        <span>
          均满足指选课人数达到需求
          满足其一指任意选课人数满足即可（多指冲突课程)
        </span>
        </div>

        <Divider />

        <div class="conflict">
          <div class="conflict-title">冲突课程</div>
          <div class="conflict-content">
            <div v-for="conflictCoursePair in course.conflictCourses" style="display: flex;margin-bottom: 3vmax;margin-top: 1vmax">
              <div style="margin-left: 3vmax;width: 5vmax;text-align: center" v-for="conflictCourse in conflictCoursePair">
                {{conflictCourse.name}}
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
        name: "StudentMobileCourseInfo",
      components: {StudentMobileHeader},
      data(){
          return{
            title:this.$route.query.courseName,
            course:{
              id:'',
              name:'',
              intro:'',
              presentationPercentage:'',
              questionPercentage:'',
              reportPercentage:'',
              teamStartTime:'',
              teamEndTime:'',
              courseMemberLimitStrategy:'',
              conflictCourses:'',
              shareSeminar:'',
              shareTeam:''
            }
          }
      },
      created(){
          this.getCourseInfo(`/course/${this.$route.query.courseId}`,{})
      },
      methods:{
          getCourseInfo:function(url,params){
            this.$http.get(url,params)
              .then(res=>{
                this.course = res.data
              })
          }
      }
    }
</script>

<style scoped>
  .header{
    text-align: center;
    background: #f8f8f8;
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
    height: 130%;
    width: 100%;
    background: #f2f2f2;
  }
  .main{
    /*margin-top: 8%;*/
    height: 92%;
    width: 96%;
    margin: 2%;
    background-color: white;
  }
  .intro{
    height: 12%;
    padding-top: 2%;
    display: block;
    margin:  1%;
  }
  .intro-title{
    font-family:思源黑体;
    font-size:3vmax;
    margin-left: 2%;
  }
  .intro-content{
    margin-top: 2%;
    margin-left: 2%;
    font-family:思源黑体;
    font-size:2vmax;
  }
  .score{
    height: 10%;
    display: flex;
    padding-bottom: 6%;
    margin:  1%;
  }
  .score-title{
    width: 40%;
    margin-left: 2%;
    font-family:思源黑体;
    font-size:3vmax;
  }
  .score-content{
    position: absolute;
    right: 2vmax;
    font-family:思源黑体;
    font-size:2vmax;
  }
  .time-title{
    width: 40%;
    margin-left: 2%;
    font-family:思源黑体;
    font-size:3vmax;
  }
  .time-content{
    position: absolute;
    margin-top:1vmax;
    right: 2vmax;
    font-family:思源黑体;
    font-size:2vmax;
  }
  .time{
    height: 5%;
    display: flex;
    margin:  1%;
  }
  .limit-title{
    width: 40%;
    margin-left: 2%;
    font-family:思源黑体;
    font-size:3vmax;
    color: black;
  }
  .limit-content{
    position: absolute;
    margin-top:1vmax;
    right: 2vmax;
    font-family:思源黑体;
    font-size:2vmax;
  }
  .limit{
    height: 7%;
    display: flex;
    margin-top: 3%;
  }
  .base-require{
    height: 6vmax;
    padding-top: 2%;
    display: block;
    margin:  1%;
  }
  .base-require-title{
    font-family:思源黑体;
    font-size:3vmax;
    margin-left: 2%;
  }
  .require{
    height: 6.5%;
    display: flex;
    margin:  1%;
  }
  .require-title{
    width: 60%;
    margin-left: 2%;
    font-family:思源黑体;
    font-size:2.5vmax;
  }
  .require-content{
    width: 40%;
    font-family:思源黑体;
    font-size:2vmax;
  }
  .comment{
    width: 80%;
    margin-left: 10%;
    font-family:思源黑体;
    font-size:2vmax;
    color: darkgray;
  }
  .conflict{
    height: 6.5%;
    display: flex;
    margin:  1%;
  }
  .conflict-title{
    width: 60%;
    margin-left: 2%;
    font-family:思源黑体;
    font-size:2.5vmax;
  }
  .conflict-content{
    width: 40%;
    right: 2.3vmax;
    font-family:思源黑体;
    font-size:2vmax;
  }
</style>
