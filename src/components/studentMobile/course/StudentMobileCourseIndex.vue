<template>
  <div class="root">
    <div class="header">
      <student-mobile-header title="我的课程"></student-mobile-header>
    </div>
    <div class="main">

      <div style="background: #f2f2f2;padding-bottom: 100px">
        <el-table class="table" :data="courses" :show-header=false max-height="500%">
          <el-table-column prop="courseName">
            <template slot-scope="scope">
              <div style="font-size: 2.5vmax">{{scope.row.courseName}}</div>
              <div style="font-size: 1.5vmax" v-if="scope.row.isMainCourse">主</div>
              <div style="font-size: 1.5vmax" v-else>从</div>
            </template>
          </el-table-column>
          <el-table-column>

          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <div class="expand">
                <div class="expand-div" @click="enterCourseInfo(scope.row)">课程信息</div>
                <div class="expand-div" @click="enterCourseScore(scope.row)">我的成绩</div>
                <div class="expand-div" @click="enterCourseTeam(scope.row)">我的组队</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
    import StudentMobileHeader from "../common/StudentMobileHeader";
    export default {
        name: "StudentMobileCourseIndex",
      components: {StudentMobileHeader},
      data () {
        return {
          courses:[],
          getCoursesUrl:'course',
        }
      },
      created(){
        this.getCourses(this.getCoursesUrl,{})
      },
      methods:{
        //通过userId从后端查找所选择的课程
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
                  isMainCourse:data.teamMainCourseId==0?true:false,
                  vis:false
                  }
                courses.push(course)
              })

              console.log(courses)
              this.courses = courses

            })
            .catch((err) => {
              console.log(err)
            })
        },
        enterCourseInfo(row){
            this.$router.push({name:'StudentMobileCourseInfo',query:{courseId:row.courseId,courseName:row.courseName}})
        },
        enterCourseScore(row){
            this.$router.push({name:'StudentMobileCourseScore',
            query:{courseId:row.courseId,courseName:row.courseName,classId:row.myClassId,className:row.myClassName}})
        },
        enterCourseTeam(row){
            this.$router.push({name:'StudentMobileCourseTeam',
              query:{courseId:row.courseId,courseName:row.courseName,classId:row.myClassId,className:row.myClassName}})
        },
      }
    }
</script>

<style scoped>
  .header{
    text-align: center;
    background: #f8f8f8;
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
  .table{
    background: #fff;
    font-size:2.4vmax;
    color:#000;
    width:96%;
    margin-left:2%;
  }
  .expand{
    height: 21vmax;
  }
  .expand-div{
    height: 33%;
    display: flex;
    align-items: center;
    justify-content: center;
    width:100%;
    font-size: 2.5vmax;
    border-bottom: 1px #f2f6fc solid;
  }
</style>
