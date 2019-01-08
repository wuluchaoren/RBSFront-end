<template>
  <div class="root">
    <div class="header">
      <student-mobile-header title="讨论课"></student-mobile-header>
    </div>
    <div class="main">
      <div class="course-cell" v-for="course in courses" :key="course.courseId"
           @click="enterSeminarSelect(course.courseId,course.courseName)">
        <span class="course-cell-front"><img class="icon" src="../../../assets/book.png"></span>
        <span class="course-cell-center">{{course.courseName}}</span>
        <span class="course-cell-right">{{course.myClassName}}</span>
        <span class="course-cell-end"><img class="arrow" src="../../../assets/arrow.png"></span>
      </div>
    </div>
  </div>
</template>

<script>
    import StudentMobileHeader from "../common/StudentMobileHeader";
    export default {
        name: "StudentMobileSeminarCourseSelect",
      components: {StudentMobileHeader},
      data () {
        return {
          courses:'',
          getCoursesUrl:'course',
        }
      },
      created(){
        this.getCourses(this.getCoursesUrl,{})
      },
      methods:{
        getCourses:function (url, params) {

          this.$http.get(url, {params})
            .then((res) => {
              let courses =[]

              let datas = res.data

              datas.forEach(data=>{
                console.log(data)
                let course = {
                  courseId:data.id,
                  courseName:data.name,
                  myClassId:data.cClassInfoVO.id,
                  myClassName:data.cClassInfoVO.name,
                  vis:false
                }
                courses.push(course)
              })

              this.courses = courses

            })
            .catch((err) => {
              console.log(err)
            })
        },
        getMyTeam:async function(url,params){

          await this.$http.get(url,{params})
            .then(res=>{

              let datas = res.data



              let teamLeader = {
                studentId:datas.leader.id,
                account:datas.leader.account,
                userName:datas.leader.name
              }


              let teamMembers = []

              datas.members.forEach(member=>{
                let teamMember = {
                  studentId:member.id,
                  account:member.account,
                  userName:member.name
                }
                teamMembers.push(teamMember)
              })

              let team = {
                teamNumber:datas.teamInfo.teamSerials,
                teamName:datas.teamInfo.teamName,
                teamId:datas.teamInfo.id,
                teamState:'invalid',
                teamLeader:teamLeader,
                teamMembers:teamMembers,
                teamState:'valid'
              }

              console.log(team)

              this.team = team

            })
            .catch((err)=>{
              console.log(err)
            })

        },
        enterSeminarSelect(courseId,courseName){
          this.$router.push({name:'StudentMobileSeminarSelect',query:{courseId:courseId,courseName:courseName}})
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
  .course-cell{
    height: 8vmax;
    display: flex;
    align-items: center;
    width:96%;
    font-size:3.5vmax;
    border-bottom: 1px #f2f6fc solid;
    background-color: white;
    margin-right: 2%;
    margin-left: 2%;
  }
  .course-cell-front{
    margin-left: 5%;
    width: 10%;
    text-align: center;
  }
  .course-cell-center{
    width: 40%;
    word-wrap: break-word;
    text-align: center;
    color: green;
  }
  .course-cell-right{
    font-size: 2.4vmax;
    width: 30%;
    text-align: center;
  }
  .course-cell-end{
    width: 20%;
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
    max-height: 85vmax;
    overflow-y:scroll
  }
</style>
