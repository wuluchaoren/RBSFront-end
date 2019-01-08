<template>
  <div class="root" @click="closeMenu">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">{{name}}-讨论课</span>
      <OCMenu></OCMenu>
    </div>
    <div class="main">
      <down-menu></down-menu>
      <div class="current-class">{{current_class}}</div>
      <div style="margin-left:5%;border-bottom:solid #E3E3E3 1px;width:90%;background: #fff"></div>
      <div class="gray-div"><span class="span1">轮次：</span><span class="R-span2">{{round}}</span></div>
      <div class="white-div"><span class="span1">主题：</span><span class="span2">{{theme}}</span></div>
      <div class="gray-div"><span class="span1">课程序号：</span><span class="span2">{{number}}</span></div>
      <div class="white-div1"><span class="span1">要求：</span><span class="span2">{{requirement}}</span></div>
      <div class="gray-div">
        <span class="span1">课程情况：</span>
        <span class="span2">{{situation}}</span>
        <!--<a href="../../" style="color:#8BC34A;margin-left: 12%;text-decoration: underline ">查看信息</a>-->
      </div>
      <div id="processing" class="processing">
        <button class="button" @click="enterSeminar()"><span>进入讨论课</span></button>
      </div>
      <div id="unStarted" class="unStarted">
        <button class="button" @click="startSeminar()"><span>开始讨论课</span></button>
      </div>
      <div id="end" class="end">
        <div style="height: 46%;width: 100%">
          <button class="button" @click="enterReport()"><span>书面报告</span></button>
        </div>
        <div style="height: 46%;width: 100%;margin-top: 3%">
          <button class="button2" @click="enterScore()"><span>查看成绩</span></button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "processingSeminarHome",
      data(){
          return {
            name:this.$route.params.name,
            courseNumber:this.$route.params.courseNumber,
            round:'',
            id:localStorage.getItem("token"),
            theme:'',
            seminarId:this.$route.params.seminarNumber,
            number:'',
            requirement:'',
            situation:'',
            current_class:this.$route.params.class,
            classNumber:this.$route.params.classNumber
          }
      },
      methods: {
        //加载当前讨论课信息
        getSeminarInfo: function () {
          let _this = this;
          this.$axios({
            methods: 'get',
            url: '/seminar/' + this.$data.seminarId + '/class/' + this.$data.classNumber,
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
          }).then(function (response) {
            _this.$data.theme = response.data.seminarTopic;
            _this.$data.number = response.data.seminarOrder;
            _this.$data.requirement = response.data.seminarIntro;
            _this.$data.round=response.data.roundSerial;

            switch( _this.$data.round){
              case 1:{
                _this.$data.round='第一轮';
                break;
              }
              case 2:{
                _this.$data.round='第二轮';
                break;
              }
              case 3:{
                _this.$data.round='第三轮';
                break;
              }
              case 4:{
                _this.$data.round='第四轮';
                break;
              }
              case 5:{
                _this.$data.round='第五轮';
                break;
              }
              case 6:{
                _this.$data.round='第六轮';
                break;
              }
              case 7:{
                _this.$data.round='第七轮';
                break;
              }
              case 8:{
                _this.$data.round='第八轮';
                break;
              }
              case 9:{
                _this.$data.round='第九轮';
                break;
              }
              case 10:{
                _this.$data.round='第十轮';
                break;
              }
              case 11:{
                _this.$data.round='第十一轮';
                break;
              }
              case 12:{
                _this.$data.round='第十二轮';
                break;
              }
              case 13:{
                _this.$data.round='第十三轮';
                break;
              }
              case 14:{
                _this.$data.round='第十四轮';
                break;
              }
              case 15:{
                _this.$data.round='第十五轮';
                break;
              }
            }

            if (response.data.status === 0)
              _this.$data.situation = '未开始';
            else if (response.data.status === 1) _this.$data.situation = '正在进行';
            else _this.$data.situation = '已完成';

            if (_this.$data.situation === '未开始') document.getElementById("unStarted").style.display = "block";
            else if (_this.$data.situation === '正在进行') document.getElementById("processing").style.display = "block";
            else if (_this.$data.situation === '已完成') document.getElementById("end").style.display = "block";
          }).catch(function(error){
            console.log(error);
          })
        },
        enterSeminar:function(){
          this.$router.push({
            name: 'teacherMobileProcessingSeminar',
            params: {
          // /:name/:courseNumber/:seminar/:seminarNumber/:class/:classNumber
              name:this.$data.name,
              courseNumber:this.$data.courseNumber,
              seminar:this.$data.theme,
              seminarNumber:this.$data.seminarId,
              class:this.$data.current_class,
              classId:this.$data.classNumber,
            }
          })
        },
        enterReport:function(){
          this.$router.push({
            name:'teacherMobileSeminarReport',
            params:{
          // /:id/:name/:courseNumber/:seminar/:seminarNumber/:class/:classNumber
              id:this.$data.id,
              name:this.$data.name,
              courseNumber:this.$data.courseNumber,
              seminar:this.$data.theme,
              seminarNumber:this.$data.seminarId,
              class:this.$data.current_class,
              classNumber:this.$data.classNumber
            }
          })
        },
        startSeminar:function(){
          this.$axios({
            url:'/seminar/'+this.$data.seminarId+'/class/'+this.$data.classNumber+'/status',
            method:'put',
            headers:{
              'Authorization': 'Bearer ' + this.$data.id
            },
            data:{
              status:1,
            }
          }).then(function(response){
          }).catch(function(error){
            console.log(error)
          });
          this.enterSeminar()
        },
        enterScore:function(){
          this.$router.push({
            name:'teacherMobileSeminarScore',
            params:{
              id:this.$data.id,
              name:this.$data.name,
              courseNumber:this.$data.courseNumber,
              seminar:this.$data.theme,
              seminarNumber:this.$data.seminarId,
              class:this.$data.current_class,
              classNumber:this.$data.classNumber
            }
          })
        },
        back:function(){
          this.$router.go(-1);
        },
        closeMenu:function(){
          const menu=document.getElementById("show");
          if(document.getElementById("show").style.display==="block"){
            if(!menu.contains(event.target)) document.getElementById("show").style.display="none";
          }
        },
        back:function(){
          this.$router.go(-1);
        }
      },
      created(){
          this.getSeminarInfo();
      },
      mounted() {
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
  .processing{
    height: 9%;
    width: 100%;
    margin-top: 20%;
    display: none;
    /*display: block;*/
  }
  .end{
    height: 20%;
    width: 100%;
    margin-top: 10%;
    display: none;
    /*display: block;*/
  }
  .unStarted{
    height: 9%;
    width: 100%;
    margin-top: 20%;
    display: none;
    /*display: block;*/
  }
  .button {
    display: inline-block;
    background-color: #96c864;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 2.5vmax;
    /*padding: 20px;*/
    height: 100%;
    width: 100%;
  }
  .button2 {
    display: inline-block;
    background-color: #fff;
    border: #96c864 1px solid;
    color: #96c864;
    text-align: center;
    font-size: 2.5vmax;
    /*padding: 20px;*/
    height: 100%;
    width: 100%;
  }
  .gray-div{
    height: 10%;
    background: #F2F2F2;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
  }
  .white-div{
    height: 10%;
    background: #fff;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
  }
  .white-div1{
    height: 35%;
    background: #fff;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
  }
  .span1{
    font-family:思源黑体;
    font-size:2vmax;
    margin-left: 7%;
    color: black;
    width: 21%;
  }
  .span2{
    font-family:思源黑体;
    font-size:2vmax;
    color: black;
    width: 66%;
    display: flex;
    justify-content: center;
  }
  .R-span2{
    font-family:思源黑体;
    font-size:2vmax;
    color: #8BC34A;
    width: 66%;
    display: flex;
    justify-content: center;
  }
  .current-class{
    height: 3%;
    background: #F2F2F2;
    text-indent: 75%;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    font-size: 2vmax;
    color:#000;
  }
</style>
