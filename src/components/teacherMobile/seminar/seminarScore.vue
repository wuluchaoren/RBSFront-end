/*
讨论课成绩 从结束的讨论课页面进入
*/


<template>
  <div class="root" @click="closeMenu">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">{{name}}-{{seminar}}-成绩</span>
      <OCMenu></OCMenu>
    </div>
    <div class="main">
      <down-menu></down-menu>
      <div class="header">
        <div class="col1"></div>
        <div class="col1">展示</div>
        <div class="col1">提问</div>
        <div class="col1">书面报告</div>
        <div class="col2">总分</div>
      </div>
      <div class="row" v-for="item in tableData">
        <div class="col1">{{item.teamBaseInfoVO.teamSerials}}:</div>
        <div class="col1"><input v-model="item.presentationScore" style="width: 60%;text-align: center;border: 1px #f2f2f2 solid"></input></div>
        <div class="col1"><input v-model="item.questionScore" style="width: 60%;text-align: center;border: 1px #f2f2f2 solid"></input></div>
        <div class="col1"><input v-model="item.reportScore" style="width: 60%;text-align: center;border: 1px #f2f2f2 solid"></input></div>
        <div class="col2"><div style="width: 60%;text-align: center;color: #96c864">{{item.totalScore}}</div></div>
      </div>
      <div class="foot">
        <button class="button" @click="alterAll">确认修改</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "seminarScore",
      data(){
          return{
            name:this.$route.params.name,
            courseNumber:this.$route.params.courseNumber,
            id:localStorage.getItem("token"),
            seminar:this.$route.params.seminar,
            seminarId:this.$route.params.seminarNumber,
            current_class:this.$route.params.class,
            classNumber:this.$route.params.classNumber,


            tableData:[{
              teamBaseInfoVO:{
                id:undefined,
                teamSerials: undefined,
              },
              presentationScore:undefined,
              questionScore:undefined,
              reportScore:undefined,
              totalScore:undefined
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
        getAll:function(){
            let _this = this;
            this.$axios({
              methods: 'get',
              url: '/seminarscore?seminarId='+_this.$data.seminarId+'&classId='+_this.$data.classNumber,
              headers: {
                'Authorization': 'Bearer ' + this.$data.id
              },
            }).then(function (response) {
              _this.$data.tableData=response.data.scores;
              for(var i=0;i<response.data.scores.length;i++){
                _this.$data.tableData[i].totalScore=response.data.scores[i].totalScore;
                _this.$data.tableData[i].presentationScore=response.data.scores[i].presentationScore;
                _this.$data.tableData[i].questionScore=response.data.scores[i].questionScore;
                _this.$data.tableData[i].reportScore=response.data.scores[i].reportScore;
                _this.$data.tableData[i].teamBaseInfoVO.id=response.data.scores[i].teamBaseInfoVO.id;
                _this.$data.tableData[i].teamBaseInfoVO.teamSerials=response.data.scores[i].teamBaseInfoVO.teamSerials;
              }
            }).catch(function(error){
              console.log(error);
            })
          },
        alterAll:function(){
          let _this=this;
          const score=[{
            teamId:'',
            reportScore:'',
            questionScore:'',
            presentationScore:''
          }];
          score.splice(0,score.length);
          for(var i=0;i<_this.$data.tableData.length;i++){
            score.push({
              teamId:_this.$data.tableData[i].teamBaseInfoVO.id,
              reportScore:_this.$data.tableData[i].reportScore===null?0:parseFloat(_this.$data.tableData[i].reportScore),
              questionScore:_this.$data.tableData[i].questionScore===null?0:parseFloat(_this.$data.tableData[i].questionScore),
              presentationScore:_this.$data.tableData[i].presentationScore===null?0:parseFloat(_this.$data.tableData[i].presentationScore)
            })
          }

          this.$axios({
            url:'/seminarscore?seminarId='+_this.$data.seminarId+'&classId='+_this.$data.classNumber,
            method:'put',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
            data:{
              classId:parseInt(_this.$data.classNumber),
              seminarId:parseInt(_this.$data.seminarId),
              scoreDTOS:score
            }
          }).then(function(response){
            if(response.data===true){
              _this.$message({
                message:'修改成功!',
                type:'success'
              })
            }
          }).catch(function(error){
            console.log(error);
          })
        },
        back:function(){
          this.$router.go(-1);
        }
      },
      created() {
          this.getAll()
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
  .header{
    width: 96%;
    margin-left: 2%;
    height: 9%;
    border-bottom: 1px #f2f2f2 solid;
  }
  .row{
    width: 96%;
    margin-left: 2%;
    height: 8%;
    border-bottom: 1px #f2f2f2 solid;
  }
  .col1{
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color:#000;
    float:left;
    font-size: 130%;
  }
  .col2{
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color:#96c864;
    float:left;
    font-size: 130%;
  }
  .foot{
    height: 9%;
    width: 100%;
    position: relative;
    top: 50px;
  }
  .button{
    height: 100%;
    width: 100%;
    background: #96c864;
    color:#fff;
    border: none;
    font-size: 150%;
  }
</style>
