/*
个人页面即登陆成功后的首页
*/

<template>
  <div class="root" @click="closeMenu">
    <div class="head">
      <span style="visibility: hidden"><Icon type="ios-arrow-back" size="large"/></span>
      <span style="width:85%">我</span>
      <OCMenu></OCMenu>
    </div>
    <div class="main">
      <down-menu></down-menu>
      <div class="man"><img style="width:80%" src="../../../assets/man.png"></div>
      <div class="entry">
        <div class="entry-div" @click="enterSetting(id)">

          <div>
            <img style="width:50%" src="../../../assets/personal.png"/>
          </div>
          <div class="entry-font-div">账户与设置</div>
        </div>
        <div class="entry-div" @click="enterCourse(id)">
          <div>
            <img style="width:50%" src="../../../assets/seminar.png"/>
          </div>
          <div class="entry-font-div">我的课程</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "profile",
      data() {
        return {
          id:localStorage.getItem("token"),
        }
      },
      methods:{
        closeMenu:function(){
          const menu=document.getElementById("show");
          if(document.getElementById("show").style.display==="block"){
            if(!menu.contains(event.target)) document.getElementById("show").style.display="none";
          }
        },
        enterCourse:function(id){
          this.$router.push({
            name:'teacherMobileCourse',
            params:{id}
          })
        },
        enterSetting:function(id){
          this.$router.push({
            name:'teacherMobileAccountSettings',
            params:{id}
          })
        },
        getId:function(){
          let _this=this;
          this.$axios({
            method: 'get',
            url: '/user/information',
            headers: {
              'Authorization': 'Bearer '+localStorage.getItem("token")
            }
          }).then(function(response){
            localStorage.setItem("teacherId", response.data.id);
            console.log(parseInt(localStorage.getItem("teacherId")));
          })
        }
      },
      created() {
          this.getId();
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
    text-align:center;
  }
  .man{
    height:30%;
    width:80%;
    margin:0 auto;
  }
  .entry{
    margin-top:30%;
    height: 50%;
    width:100%;
    text-align:center;
  }
  .entry-font-div{
    font-size:2vmax;
    margin-top: 5%;
  }
  .entry-div{
    width:50%;
    float:left;
  }
</style>
