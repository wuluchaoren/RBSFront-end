/*
讨论课主页面 右上角进入
*/

<template>
  <div class="root" @click="closeMenu">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">讨论课</span>
      <OCMenu></OCMenu>
    </div>
    <div class="main">
      <downMenu></downMenu>
      <div style="height: 90%;width:100%">
        <div class="seminarRow" v-for="item in tableData" @click="enterSpecificSeminar(id,item.name,item.id)">
          <div style="float: left;width: 75%;margin-left: 5%;height: 100%;display: flex;align-items: center;font-size:150%;color: black">📔 {{item.name}}{{item.type}}</div>
          <div style="margin-left: 10%;float:left;width: 5%;height:100%;font-size: 200%;color:#747474;display: flex;align-items: center">></div>
        </div>
      </div>
      <div style="height: 10%;width:100%;position: fixed;bottom: 0">
        <button class="button" @click="enterProcessingHome()">正在进行的讨论课</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "seminar",
      data() {
        return{
          id:localStorage.getItem("token"),
          tableData:[{
            id:'',
            name:'',
            type:''
          }]
        }
      },
      methods: {
        closeMenu:function(){
          const menu=document.getElementById("show");
          if(document.getElementById("show").style.display==="block"){
            if(!menu.contains(event.target)) document.getElementById("show").style.display="none";
          }
        },
        back:function(){
          this.$router.go(-1);
        },
        enterProcessingHome:function(){
          let _this=this;
          this.$axios({
            url:'/seminar/underway',
            method:'get',
            headers:{
              'Authorization': 'Bearer ' + this.$data.id
            }
          }).then(function(response) {
              let mySeminarId = response.data[0].seminarId;
              let meClassId = response.data[0].class.id;
              let meClassName = response.data[0].class.name;

              console.log(mySeminarId);
              console.log(meClassId);

              _this.$axios({
                methods: 'get',
                url: '/seminar/' + mySeminarId + '/class/' + meClassId,
                headers: {
                  'Authorization': 'Bearer ' + _this.$data.id
                },
              }).then(function (response) {

                // /:id/:name/:courseNumber/:seminar/:seminarNumber/:class/:classNumber
                _this.enterSpecificSeminarHome(_this.$data.id,response.data.courseName,response.data.courseId,response.data.seminarTopic,response.data.seminarId,meClassName,meClassId);
              }).catch(function(error){
                console.log(error);
                _this.$message({
                  message:'当前没有正在进行的讨论课o!',
                  type:'warning'
                })
              })
            }).catch(function(error){
            _this.$message({
              message:'当前没有正在进行的讨论课o!',
              type:'warning'
            })
          })
        },
        enterSpecificSeminar:function(id,name,num){
          this.$router.push({
            name:'teacherMobileSpecificSeminar',
            params:{
              id:id,
              name:name,
              courseNumber:num
            }
          })
        },
        enterSpecificSeminarHome:function(id,name,courseNumber,seminar,seminarNumber,cclass,classNumber){
          this.$router.push({
            name:'teacherMobileSpecificSeminarHome',
            params:{
              id:id,
              name:name,
              courseNumber:courseNumber,
              seminar:seminar,
              seminarNumber:seminarNumber,
              class:cclass,
              classNumber:classNumber,
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

              if(response.data[i].shareSeminar===false&&response.data[i].shareTeam===false) _this.$data.tableData[i].type='';
              else _this.$data.tableData[i].type='(从)';
            }
          }).catch(function (error) {
            console.log(error);
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
  .button{
    height: 40%;
    width:35%;
    float:right;
    margin-right: 5%;
    background: red;
    border:0px;
    color:#fff;
    font-size:2vmax;
    border-radius: 5px;
  }
  .seminarRow{
    width: 96%;
    height: 10%;
    margin-left: 2%;
    border-bottom: 1px #f2f2f2 solid;
  }
</style>
