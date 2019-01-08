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
      <div class="white-div"><span class="span1">主题：</span><span class="span2">{{theme}}</span></div>
      <div class="gray-div"><span class="span1">课程序号：</span><span class="span2">{{number}}</span></div>
      <div class="white-div"><span class="span1">要求：</span><span class="span2">{{requirement}}</span></div>
      <div class="gray-div">
        <span class="span1">课程情况：</span>
        <span class="P-span2">暂停</span>

      </div>
      <button class="button" onclick="window.location.href='../../seminar/MTprocessingSeminar/1'"><span>继续讨论课</span></button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "processingSeminarHome",
    data(){
      return {
        name:'OOAD',
        round:'第二轮',
        theme:'领域模型',
        number:'1',
        requirement:'界面导航图和所有界面原型设计课堂讨论每个小组15分钟',
        current_class:'2016（2）'
      }
    },
    methods:{
      closeMenu: function () {
        const menu = document.getElementById("show");
        if (document.getElementById("show").style.display === "block") {
          if (!menu.contains(event.target)) document.getElementById("show").style.display = "none";
        }
      },

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
  .button {
    display: inline-block;
    background-color: #96c864;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 2.5vmax;
    /*padding: 20px;*/
    height: 9%;
    width: 100%;
    margin-top: 30%;
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
  .span1{
    font-family:思源黑体;
    font-size: 2vmax;
    margin-left: 7%;
    color: black;
    width: 21%;
  }
  .span2{
    font-family:思源黑体;
    font-size: 2vmax;
    color: black;
    width: 66%;
    display: flex;
    justify-content: center;
  }
  .P-span2{
    font-family:思源黑体;
    font-size: 2vmax;
    color: red;
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
