<template>
  <div class="root" @click="closeMenu">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">班级信息</span>
      <OCMenu></OCMenu>
    </div>
    <div class="main">
      <down-menu></down-menu>
      <div class="classInfo" v-for="item in classInfo">
        <div style="height: 25%;width: 100%;display:flex;align-items: center;justify-content: center;font-size:150%">{{item.classNumber}}</div>
        <div class="row">
          <div class="col1">讨论课时间：</div>
          <div class="col2">{{item.seminarTime}}</div>
        </div>
        <div class="row">
          <div class="col1">讨论课地点：</div>
          <div class="col2">{{item.seminarPlace}}</div>
        </div>
        <div class="row">
          <div class="col1">学生名单：</div>
          <div class="col2"><p style="color: red;">请使用PC端查看</p></div>
        </div>
        <div class="foot">
          <div style="width: 50%;text-align: center;height:100%;float: left;display: flex;align-items: center;justify-content: center"><button class="button1">提交</button></div>
          <div style="width: 50%;text-align: center;height:100%;float: left;display: flex;align-items: center;justify-content: center"><button class="button2" @click="deleteClass(item.classId)">删除班级</button></div>
        </div>
      </div>
      <div class="footer"><button class="new-button" @click="createClass">新增班级</button></div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "classInfo",
      data() {
        return {
          id:localStorage.getItem("token"),
          courseNumber:this.$route.params.courseNumber,
          classInfo:[{
            classId:'',
            classNumber:'',
            seminarTime:'',
            seminarPlace:'',
          }]
        }
      },
      methods: {
        closeMenu: function () {
          const menu = document.getElementById("show");
          if (document.getElementById("show").style.display === "block") {
            if (!menu.contains(event.target)) document.getElementById("show").style.display = "none";
          }
        },
        back:function(){
          this.$router.go(-1);
        },
        getAllClass:function(){
          let _this = this;
          this.$axios({
            method: 'get',
            url: '/course/'+this.$data.courseNumber+'/class',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
          }).then(function (response) {
            _this.$data.classInfo=response.data;
            for(let i=0;i<response.data.length;i++){
              _this.$data.classInfo[i].classId=response.data[i].id;
              _this.$data.classInfo[i].classNumber=response.data[i].name;
              _this.$data.classInfo[i].seminarTime=response.data[i].time;
              _this.$data.classInfo[i].seminarPlace=response.data[i].classroom;
            }
          }).catch(function (error) {
            console.log(error.data);
          })
        },
        deleteClass:function(id) {
          this.$confirm('此操作将永久删除该班级, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let _this = this;
            this.$axios({
              method: 'delete',
              url: '/class/' + id,
              headers: {
                'Authorization': 'Bearer ' + this.$data.id
              },
            }).then(function (response) {
              if (response.data === true) {
                _this.$message({
                  message: "删除成功!",
                  type: 'success'
                })
              }
              _this.$data.classInfo.splice(0,_this.$data.classInfo.length);
              _this.getAllClass();
            }).catch(function (error) {
              _this.$message({
                message: "班级不存在!",
                type: 'error'
              })
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        createClass:function(){
          this.$router.push({
            name:'teacherMobileCreateClass',
            params:{
              id:this.$data.id,
              name:this.$route.params.name,
              courseNumber:this.$data.courseNumber
            }
          })
        }
      },
      created() {
        this.getAllClass()
      }
    }
</script>

<style scoped>
  .head{
    text-align: center;
    background: #f8f8f8;
    width:100%;
    height: 8%;
    border-bottom:1px solid #aaaaaa;
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
  }
  .classInfo{
    width: 98%;
    margin-left: 1%;
    margin-bottom: 1%;
    height: 40%;
    background: #f9f9f9;
  }
  .row{
    height: 18%;
    width: 100%;
  }
  .col1{
    margin-left: 10%;
    font-size:130%;
    width: 25%;
    height: 100%;
    float: left;
    color:#000;
  }
  .col2{
    font-size:130%;
    width: 60%;
    height: 100%;
    float: left;
    text-align: center;
  }
  .foot{
    height: 21%;
    width: 100%;
  }
  .button1{
    width: 60%;
    height: 60%;
    background: #fff;
    border: 1px green solid;
    border-radius: 4px;
    font-size: 120%;
    color:green;
  }
  .button2{
    width: 60%;
    height: 60%;
    background: #fff;
    border: 1px red solid;
    border-radius: 4px;
    font-size: 120%;
    color:red;
  }
  .footer{
    height: 8%;
    width: 100%;
    position: relative;
    top:1%;
  }
  .new-button{
    height: 100%;
    width: 100%;
    background: #96C864;
    border: transparent;
    color:#fff;
    font-size: 130%;
  }
</style>
