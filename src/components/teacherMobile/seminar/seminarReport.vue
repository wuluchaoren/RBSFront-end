/*
书面报告 从结束的讨论课页面进入
*/

<template>
  <div class="root" @click="closeMenu">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">{{name}}-书面报告</span>
      <OCMenu></OCMenu>
    </div>
    <div class="main">
      <down-menu></down-menu>
      <div class="row" v-for="(item,index) in tableData">
        <div style="margin-left: 5%;width: 15%;height: 100%;display: flex;align-items: center;float:left">第{{index+1}}组：</div>
        <div style="margin-left: 3%;width: 10%;height: 100%;display: flex;align-items: center;float:left">{{item.groupNumber}}</div>
        <div style="margin-left: 1%;width: 30%;height: 100%;display: flex;align-items: center;float:left;color: #96c864">{{item.file}}</div>
        <div style="margin-left: 5%;width: 20%;height: 100%;display: flex;align-items: center;float:left"><input v-model="item.score" style="width: 90%;padding:0 7% 0 7%;color:#aaaaaa" placeholder="成绩"></input></div>
      </div>
      <div class="confirm">
        <button class="button" @click="confirm">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "seminarReport",
      data(){
          return{
            id:localStorage.getItem("token"),
            name:this.$route.params.name,
            courseNumber:this.$route.params.courseNumber,
            seminar:this.$route.params.seminar,
            seminarId:this.$route.params.seminarNumber,
            class:this.$route.params.class,
            classId:this.$route.params.classNumber,

            tableData:[{
              groupNumber:'',
              groupId:'',
              file:'',
              score:'',
            }]
          }
      },
      methods:{
        closeMenu:function(){
          const menu=document.getElementById("show");
          if(document.getElementById("show").style.display==="block"){
            if(!menu.contains(event.target)) document.getElementById("show").style.display="none";
          }
        },
        back:function(){
          this.$router.go(-1);
        },
        confirm:function() {
          let _this = this;
          for (var i = 0; i < _this.$data.tableData.length; i++) {
            this.$axios({
              url: '/seminarscore/reportscore',
              method: 'put',
              headers: {
                'Authorization': 'Bearer ' + _this.$data.id
              },
              data: {
                seminarId:_this.$data.seminarId,
                classId:_this.$data.classId,
                teamId:_this.$data.tableData[i].groupId,
                reportScore:_this.$data.tableData[i].score,
              }
            }).then(function(response){
              if(response.data===true){
                _this.$message({
                  message:'打分成功!',
                  type:'success'
                });
              }
              else{
                _this.$message({
                  message:'出了一点意外哦，重新试试',
                  type:'error'
                })
              }
              _this.returnSpecificSeminarHome();
            }).catch(function(error){
              console.log(error)
            })
          }
        },
        returnSpecificSeminarHome:function(){
          this.$router.push({
            name:'teacherMobileSpecificSeminarHome',
            params:{
              id:this.$data.id,
              name:this.$data.name,
              courseNumber:this.$data.courseNumber,
              seminar:this.$data.seminar,
              seminarNumber:this.$data.seminarId,
              class:this.$data.class,
              classNumber:this.$data.classId
            }
          })
        },
        getAllReport:function(){
          let _this=this;
          this.$axios({
            url:'/attendance?cClassId='+parseInt(_this.$data.classId)+'&seminarId='+parseInt(_this.$data.seminarId),
            method:'get',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            }
          }).then(function(response){
            _this.$data.tableData.splice(0,_this.$data.tableData.length);
            for(var i=0;i<response.data.length;i++) {
              _this.$data.tableData.push({
                groupNumber:response.data[i].teamBaseInfoVO.teamSerials,
                groupId:response.data[i].teamBaseInfoVO.id,
                file:response.data[i].reportName===null?'未上传':response.data[i].reportName,
                score:'',
              })
            }
          }).catch(function(error){
            console.log(error)
          })
        },
        reportScore:function(){
          let _this=this;
          var dto=[{
            teamId:'',
            reportScore:'',
          }];
          this.$axios({
            url:'seminarscore',
            method:'put',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
            data:{
              classId:'',
              seminarId:'',
              DTO:dto,
            }
          })
        }
      },
      created() {
          this.getAllReport();
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
    height: 85%;
    width: 100%;
  }
  .row{
    height: 10%;
    width: 100%;
    background: #f2f2f2;
    border-bottom: 1px solid #fff;
    font-size: 130%;
  }
  .confirm{
    height: 9%;
    width: 100%;
    position:relative;
    top:10%;
  }
  .button{
    background: #96c864;
    color:#fff;
    border: none;
    width: 100%;
    height: 100%;
    font-size: 150%;
  }
</style>
