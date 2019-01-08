<template>
  <div class="root" @click="closeMenu">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">账户与设置</span>
      <OCMenu></OCMenu>
    </div>
    <div class="main">
      <down-menu></down-menu>
      <div style="height: 100%">
        <div class="white-div"><span class="span1">姓名：</span><span class="span2">{{name}}</span></div>
        <div class="gray-div"><span class="span1">教工号：</span><span class="span2">{{idNum}}</span></div>
        <div class="white-div" @click="alterEmail(role)"><span class="span1">邮箱：</span><span class="span2">{{email}}</span><span style="float:right;font-size:3vmax;margin-right: 5%">></span></div>
        <div class="gray-div" @click="alterPassword(role)"><span class="span1">账户密码</span><span class="span2"></span><span style="float:right;font-size:3vmax;margin-right: 5%">></span></div>
        <div class="white-div"><span class="span1">管理员邮箱：</span><span class="span2">654321@163.com</span></div>
        <div class="bottom">
          <button class="button" @click="logOff"><span>退出登录</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "accountSettings",
      data() {
        return {
          name: '',
          idNum: '',
          email: '',
          id:localStorage.getItem("token"),
          role:''
        }
      },
      methods: {
        closeMenu: function () {
          const menu = document.getElementById("show");
          if (document.getElementById("show").style.display === "block") {
            if (!menu.contains(event.target)) document.getElementById("show").style.display = "none";
          }
        },
        alterEmail: function (id) {
          this.$router.push({
            name: 'teacherMobileAlterEmail',
            params: {
              role:id
            }
          })
        },
        alterPassword: function (id) {
          this.$router.push({
            name: 'teacherMobileAlterPassword',
            params: {
              role:id
            }
          })
        },
        logOff:function(){
          localStorage.setItem("token",'');
          this.$router.push({
            name:'teacherMobileLogin'
          })
        },
        getInfo:function(){
          let _this=this;
          this.$axios({
            method: 'get',
            url: '/user/information',
            headers: {
              'Authorization': 'Bearer '+localStorage.getItem("token")
            }
          }).then(function(response){
            _this.$data.name=response.data.name;
            _this.$data.idNum=response.data.account;
            _this.$data.email=response.data.email;
            _this.$data.role=response.data.role;
            console.log(_this.$data.role);
          })
        },
        back:function(){
          this.$router.go(-1);
        }
      },
      created() {
        this.getInfo();
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
    font-size:2vmax;
    margin-left: 7%;
    color: black;
    width: 25%;
  }
  .span2{
    font-family:思源黑体;
    font-size:2vmax;
    color: black;
    width: 77%;
    display: flex;
    justify-content: center;
  }
  .bottom{
    height: 8%;
    width:100%;
    position:fixed;
    bottom:0;
  }
  .button{
    display: inline-block;
    background-color: red;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 2.5vmax;
    /*padding: 20px;*/
    height: 100%;
    width: 100%;
  }
</style>
