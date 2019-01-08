<template>
  <div class="root" id="root">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">密码设置</span>
      <span style="visibility: hidden"><Icon type="ios-arrow-back" size="large"/></span>
    </div>
    <div class="main">
      <div class="input-div">
        <input class="input" type="password" v-model="newPassword" placeholder="输入密码"/>
      </div>
      <div class="input-div">
        <input class="input" id="password" type="password" v-model="againPassword" placeholder="确认密码"/>
      </div>
      <!--<div class="email">发送验证码到邮箱:{{email}}</div>-->
      <!--<div class="input-div2">-->
        <!--<input class="input2" id="captcha" type="password" v-model="captcha" placeholder="验证码"/>-->
        <!--<Button type="error" class="captchaButton" ghost @click="sendCaptcha">发送验证码</Button>-->
      <!--</div>-->
      <div class="text">可包含数字、字母、下划线，长度不小于六位</div>
      <button class="button" @click="activate">确认提交</button>
    </div>
  </div>
</template>

<script>
    export default {
      name: "activate",
      data() {
        return {
          newPassword: '',
          againPassword: '',
          id: localStorage.getItem("token"),
          role:this.$route.params.role,
        }
      },
      methods: {
        activate: function () {
          let _this = this;
          if (_this.$data.newPassword === '') {
            _this.$message({
              message: '密码不能为空！',
              type: 'error'
            })
          } else {
            if (_this.$data.newPassword !== _this.$data.againPassword) {
              _this.$message({
                message: '两次输入的密码不一致,请检查',
                type: 'error'
              })
            } else {
              console.log(_this.$data.role);
              if (_this.$data.role === false) {
                this.$axios({
                  method: 'put',
                  url: '/student/active',
                  data: {
                    password: _this.$data.newPassword,
                  },
                  headers: {
                    'Authorization': 'Bearer ' + _this.$data.id
                  }
                }).then(function (response) {
                  _this.$message({
                    message: '激活成功!',
                    type: 'success'
                  });
                  _this.enter1(_this.$data.id);
                }).catch(function (error) {
                  _this.$message({
                    message: '激活失败，请重试!',
                    type: 'error'
                  })
                })
              }
              else{
                this.$axios({
                  method: 'put',
                  url: '/teacher/active',
                  data: {
                    password: _this.$data.newPassword,
                  },
                  headers: {
                    'Authorization': 'Bearer ' + _this.$data.id
                  }
                }).then(function (response) {
                  _this.$message({
                    message: '激活成功!',
                    type: 'success'
                  });
                  _this.enter(_this.$data.id);
                }).catch(function (error) {
                  _this.$message({
                    message: '激活失败，请重试!',
                    type: 'error'
                  })
                })
              }
            }
          }
        },
        enter:function(id){
          this.$router.push({
            name:'teacherMobileProfile',
            params:{id}
          })
        },
        back:function(){
          this.$router.go(-1);
        },
        enter1:function(id){
          this.$router.push({
            name:'StudentMobileAccountIndex',
            params:{id}
          })
        },

        hei:function() {
          let Height = window.innerHeight;
          document.getElementById("root").style.height = Height + "px";
        }
      },
      mounted() {
        this.hei();
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
    height: 85%;
    width: 100%;
    margin-top:8%
  }
  .input-div{
    height: 9%;
    width: 96%;
    margin-left: 2%;
    margin-top: 4%;
    background:#fff;
  }
  .input-div2{
    height: 9%;
    width: 96%;
    margin-left: 2%;
    background:#fff;
  }
  .input{
    background-color:#fff;
    border:0;
    height:100%;
    width:100%;
    padding:0 7% 0 7%;
    font-size: 2.3vmax;
  }
  .input2{
    background-color:#fff;
    border:0;
    height:100%;
    width:60%;
    padding:0 0 0 7%;
    font-size: 2.3vmax;
  }
  .input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { /* WebKit*/
    color:#CCCCCC;
    font-size:2.3vmax;
  }
  .input2::-webkit-input-placeholder, textarea::-webkit-input-placeholder { /* WebKit*/
    color:#CCCCCC;
    font-size:2.3vmax;
  }
  .captchaButton{
    width:25%;
    margin-left: 10%;
    height: 60%;
    margin-bottom: 1%;
  }
  .email{
    font-size:1.8vmax;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    height: 7%;
    margin-left: 4%;
  }
  .text{
    margin-left:2%;
    color:#a9a9a9;
    font-size:1.5vmax;
    position: relative;
    top: 10px;
  }
  .button {
    display: inline-block;
    background-color: #96c864;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 2.3vmax;
    /*padding: 20px;*/
    height: 9%;
    width: 100%;
    margin-top: 1%;
    position: absolute;
    bottom: 0;
  }
</style>
