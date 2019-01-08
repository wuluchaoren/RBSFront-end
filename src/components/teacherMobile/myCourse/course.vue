/*
课程管理
*/

<template>
  <div class="root" @click="closeMenu">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">课程管理</span>
      <OCMenu></OCMenu>
    </div>
    <div class="main">
      <down-menu></down-menu>
      <el-table class="table" :data="tableData" :show-header=false height="91%" max-height="500%">
        <el-table-column>
          <template slot-scope="scope">
            <div>🎓  {{scope.row.name}}</div>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="expand">
              <div class="expand-div" @click="enterStudentScore(id,scope.row)">学生成绩</div>
              <div class="expand-div" @click="enterStudentTeam(id,scope.row)">学生组队</div>
              <div class="expand-div" @click="enterCourseInfo(id,scope.row)">课程信息</div>
              <div class="expand-div" @click="enterClassInfo(id,scope.row)">班级信息</div>
              <div class="expand-div" @click="enterSeminarSettings(id,scope.row)">讨论课设置</div>
              <div class="expand-div" @click="enterShareSettings(id,scope.row)">共享设置</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom" @click="enterNewCourse(id)">
        <span style="display:inline-block;width: 10%;margin-left: 5%;"><img src="../../../assets/add2.png" style="width:80%"/></span>
        <span style="display:inline-block;width: 70%;font-size:2.8vmax;margin-left:5%">新建课程</span>
        <span style="display:inline-block;font-size: 3vmax;float: right;">></span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "course",
      data(){
          return{
            id:localStorage.getItem("token"),
            tableData:[{
              name:''
            }]
          }
      },
      methods:{
        closeMenu: function () {
          const menu = document.getElementById("show");
          if (document.getElementById("show").style.display === "block") {
            if (!menu.contains(event.target)) document.getElementById("show").style.display = "none";
          }
        },
        back:function(){
          this.$router.go(-1);
        },
          enterNewCourse:function(id){
            this.$router.push({
              name:'teacherMobileCreateCourse',
              params:{id}
            })
          },
        enterStudentScore:function(id,row){
          this.$router.push({
            name:'teacherMobileStudentScore',
            params:{
              id:id,
              name:row.name,
              courseNumber:row.id
            }
          })
        },
        enterStudentTeam:function(id,row){
          this.$router.push({
            name:'teacherMobileStudentTeam',
            params:{
              id:id,
              name:row.name,
              courseNumber:row.id
            }
          })
        },
        enterShareSettings:function(id,row){
          this.$router.push({
            name:'teacherMobileShareSettings',
            params:{
              id:id,
              name:row.name,
              courseNumber:row.id
            }
          })
        },
        enterSeminarSettings:function(id,row){
          this.$router.push({
            name:'teacherMobileSpecificSeminar',
            params:{
              id:id,
              name:row.name,
              courseNumber:row.id
            }
          })
        },
        enterClassInfo:function(id,row){
          this.$router.push({
            name:'teacherMobileClassInfo',
            params:{
              id:id,
              name:row.name,
              courseNumber:row.id
            }
          })
        },
        enterCourseInfo:function(id,row){
          this.$router.push({
            name:'teacherMobileCourseInfo',
            params:{
              id:id,
              name:row.name,
              courseNumber:row.id
            }
          })
        },
        getAllCourse:function() {
          let _this = this;
          this.$axios({
            method: 'get',
            url: '/course',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
          }).then(function (response) {
            _this.$data.tableData=response.data;
            for(let i=0;i<response.data.length;i++){
              _this.$data.tableData[i].id=response.data[i].id;
              _this.$data.tableData[i].name=response.data[i].name;
            }
          }).catch(function (error) {
            console.log(error.data);
          })
        }
      },
      created() {
          this.getAllCourse();
      }
    }
</script>

<style scoped>
  .head{
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
  .bottom{
    position: absolute;
    background: #fff;
    bottom: 0;
    width: 100%;
    height: 9%;
    display: flex;
    align-items: center;
  }
  .table{
    background: #fff;
    font-size:2.4vmax;
    color:#000;
    width:96%;
    margin-left:2%;
    margin-top: 1%;
  }
  .expand{
    height: 40vmax;
  }
  .expand-div{
    height: 16%;
    display: flex;
    align-items: center;
    justify-content: center;
    width:100%;
    font-size: 2.5vmax;
    border-bottom: 1px #f2f6fc solid;
  }
  .rowClass{
    background: #f2f2f2;
  }
</style>
