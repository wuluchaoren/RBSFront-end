/*
新建讨论课  从讨论课主页面进入
*/

<template>
  <div class="root" id="root">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">{{this.$route.params.name}}</span>
      <span style="visibility: hidden"><Icon type="ios-arrow-back" size="large"/></span>
    </div>
    <div class="main">
      <div class="header">新建讨论课</div>
      <div class="base">
        <input class="input1" placeholder="讨论课主题" v-model="seminar"></input>
        <textarea class="input2" placeholder="讨论课主要内容、要求、具体讨论" v-model="intro"></textarea>
      </div>
      <div class="visible">
        <div class="col1">讨论课是否可见</div>
        <div class="col2" id="vis" @click="isVisble">✔</div>
      </div>
      <div class="info">
        <div class="row">
          <div class="row-col1">展示报名开始时间：</div>
          <div class="row-col2">
            <DatePicker type="datetime" placeholder="选择展示报名开始时间" style="width: 80%;border: 1px solid #259B24;border-radius: 5px" v-model="startTime"></DatePicker>
          </div>
        </div>
        <div class="row">
          <div class="row-col1">展示报名结束时间：</div>
          <div class="row-col2">
            <DatePicker type="datetime" placeholder="选择展示报名截止时间" style="width: 80%;border: 1px solid #259B24;border-radius: 5px" v-model="endTime"></DatePicker>
          </div>
        </div>
        <div class="row">
          <div class="row-col1">报名小组数：</div>
          <div class="row-col2">
            <input style="width: 30%;height: 50%;border: 1px green solid;border-radius: 3px;padding:0 2% 0 2%;font-size: 120%" v-model="maxTeam"></input>
          </div>
        </div>
        <div class="row">
          <div class="row-col1">所属Round：</div>
          <div class="row-col2">
            <Select v-model="roundId" class="select">
              <Option v-for="item in roundList" :key="item.name" :value="item.value">{{ item.name }}</Option>
            </Select>
          </div>
        </div>
      </div>
      <button class="button" @click="createSeminar">发布</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "createSeminar",
      data(){
          return{
            id:localStorage.getItem("token"),
            courseName:this.$route.params.name,
            courseNumber:this.$route.params.courseNumber,
            seminar:'',
            roundId:'',
            intro:'',
            maxTeam:'',
            visible:1,//1表示可见 0表示不可见
            startTime:'',
            endTime:'',
            roundList:[{
              name:'（默认）',
              value:'',
            }]
          }
      },
      methods: {
        hei: function () {
          let Height = window.innerHeight;
          document.getElementById("root").style.height = Height + "px";
        },
        isVisble: function () {
          if (document.getElementById("vis").style.color === "green") {
            document.getElementById("vis").style.color = "gray";
            this.$data.visble = 0;
          } else {
            document.getElementById("vis").style.color = "green";
            this.$data.visble = 1;
          }
        },
        back:function(){
          this.$router.go(-1);
        },
        createSeminar:function(){
          let _this=this;
          this.$axios({
            url:'/seminar',
            method:'post',
            headers:{
              'Authorization': 'Bearer ' + this.$data.id
            },
            data: {
              courseId: _this.$data.courseNumber,
              roundId: _this.$data.roundId,
              name: _this.$data.seminar,
              intro: _this.$data.intro,
              maxTeam: _this.$data.maxTeam,
              visible: _this.$data.visible,
              enrollStartTime: this.myFormatDate(_this.$data.startTime),
              enrollEndTime: this.myFormatDate(_this.$data.endTime)
            }
          }).then(function(response){
            if(isNaN(response.data)){
              _this.$message({
                message:'出了一点意外哦',
                type:'error'
              })
            }
            else{
              _this.$message({
                message:'新建成功!',
                type:'success'
              });
              _this.enter();
            }
          }).catch(function(error){
            console.log(error);
          })
        },
        checkTime:function(i){
          if (i<10){
            const x="0" + i
            return x;
          }
          return i;
        },
        myFormatDate:function(abc){
          const date = abc.toString();
          var date1=new Date(date);
          return date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate() + ' ' + this.checkTime(date1.getHours()) + ':' + this.checkTime(date1.getMinutes()) + ':' + this.checkTime(date1.getSeconds());
        },
        enter:function(){
          this.$router.push({
            name:'teacherMobileSpecificSeminar',
            params:{
              name:this.$data.courseName,
              courseNumber:this.$data.courseNumber
            }
          })
        },
        getAllRound:function(){
          let _this=this;
          this.$axios({
            url:'/course/'+_this.$data.courseNumber+'/seminars',
            method:'get',
            headers:{
              'Authorization': 'Bearer ' + this.$data.id
            },
          }).then(function(response){
            for(var i=0;i<response.data.rounds.length;i++){
              _this.$data.roundList.push({
                name:'第'+response.data.rounds[i].roundSerial+'轮',
                value:response.data.rounds[i].roundId
              })
            }
          }).catch(function(error){
            console.log(error);
          })
        }
      },
      mounted() {
          this.hei();
          this.getAllRound();
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
    height: 8%;
    width: 100%;
    background: white;
    border-bottom: 1px #aaaaaa solid;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 150%;
    color:black
  }
  .base{
    height: 32%;
    width: 96%;
    margin-left: 2%;
    border-bottom: 1px #aaaaaa solid;
  }
  .input1{
    width: 100%;
    height: 25%;
    border: none;
    font-size: 150%;
    border-bottom: 1px #aaaaaa solid;
    padding:5%
  }
  .input2{
    width: 100%;
    height: 75%;
    border: none;
    padding:1% 5% 1% 5%;
    font-size: 150%;
  }
  .input1::-webkit-input-placeholder, textarea::-webkit-input-placeholder { /* WebKit*/
    color:#CCCCCC;
    font-size:100%;
  }
  .input2::-webkit-input-placeholder, textarea::-webkit-input-placeholder { /* WebKit*/
    color:#CCCCCC;
    font-size:100%;
  }
  .visible{
    height: 10%;
    width: 100%;
  }
  .col1{
    width: 30%;
    height: 100%;
    color: #000;
    display: flex;
    align-items: center;
    margin-left: 5%;
    float: left;
    font-size:130%
  }
  .col2{
    width: 10%;
    height: 100%;
    color: green;
    display: flex;
    align-items: center;
    margin-left: 55%;
    float: left;
    font-size:200%;
  }
  .info{
    width: 100%;
    border-top: 1px #aaaaaa solid;
    height: 35%;
    background: #f2f2f2;
  }
  .row{
    width: 100%;
    height: 25%;
  }
  .row-col1{
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    float: left;
    font-size: 130%;
    padding-left: 5%;
  }
  .row-col2{
    width: 60%;
    height: 100%;
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button{
    height: 8%;
    width: 100%;
    background: #96c864;
    color:white;
    position: fixed;
    bottom: 0;
    font-size: 150%;
    border: none;
  }
  .select{
    border: green 1px solid;
    border-radius: 5px;
    width: 80%;
  }
</style>
