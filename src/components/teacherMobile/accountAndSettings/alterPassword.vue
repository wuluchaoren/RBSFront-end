<template>
  <div class="root" id="root">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">修改密码</span>
      <span style="visibility: hidden"><Icon type="ios-arrow-back" size="large"/></span>
    </div>
    <div class="main">
      <down-menu></down-menu>
      <div class="text"></div>
      <!--<div class="text">发送验证码到邮箱：{{email}}</div>-->
      <div class="input-div">
        <input class="input" type="password" v-model="oldPassword" placeholder="输入原密码" name="username"/>
      </div>
      <div class="input-div1">
        <input class="input" type="password" v-model="newPassword" placeholder="输入新密码" name="username"/>
      </div>
      <div class="input-div1">
        <input class="input" id="password" type="password" v-model="againPassword" placeholder="确认新密码" name="password"/>
      </div>
      <div class="bottom">
        <div class="rule">密码长度8-32位，须包含数字、字母、符号至少两种元素</div>
        <div class="button-div"><button class="button" @click="confirmAlter">确认修改</button></div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "alterPassword",
      data() {
        return {
          email: 'handsome@xmu.edu.cn',
          newPassword:'',
          againPassword:'',
          oldPassword:'',
          id:localStorage.getItem("token")
        }
      },
      methods: {
        confirmAlter: function () {
          let _this=this;
          const reg = new RegExp("(?!^(\\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\\w~!@#$%^&*?]{8,32}$");
          if(_this.$data.newPassword===''){
            this.$message({
              message: '密码不能为空！',
              type: 'error'
            })
          }else {
            if (!reg.test(_this.$data.newPassword)) {
              this.$message({
                message: '请输入正确的密码！',
                type: 'error'
              })
            } else {
              if (_this.$data.newPassword !== _this.$data.againPassword) {
                this.$message({
                  message: '两次输入的密码不一致,请检查',
                  type: 'error'
                })
              } else {
                this.$axios({
                  method: 'put',
                  url: '/user/password',
                  data:{
                    oldPassword:_this.$data.oldPassword,
                    newPassword: _this.$data.newPassword,
                  },
                  headers: {
                    'Authorization': 'Bearer '+localStorage.getItem("token")
                  }
                }).then(function (response) {
                  if (response.data === true) {
                    _this.$message({
                      message: '修改成功',
                      type: 'success',
                    });
                    if(_this.$route.params.role==='teacher') _this.enter(_this.$data.id);
                    else _this.enter1(_this.$data.id);
                  } else {
                    _this.$message({
                      message: response.data,
                      type: 'error',
                    })
                  }
                }).catch(function (error) {
                  console.log(error.response);
                })
              }
            }
          }
        },
        back:function(){
          this.$router.go(-1);
        },
        hei:function() {
          let Height = window.innerHeight;
          document.getElementById("root").style.height = Height + "px";
        },
        enter:function(id){
          this.$router.push({
            name:'teacherMobileProfile',
            params:{id}
          });
        },
        enter1:function(id){
          this.$router.push({
            name:'StudentMobileAccountIndex',
            params:{id}
          });
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
    font-size: 150%;
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
  .text{
    font-size: 130%;
    height: 5%;
    display: flex;
    align-items: center;
    margin-left: 2%;
  }
  .input-div{
    height: 10%;
    width: 100%;
    background:#fff;
  }
  .input-div1{
    height: 10%;
    width: 100%;
    background:#fff;
    margin-top: 4%
  }
  .input{
    background-color:#fff;
    border:0;
    height:100%;
    width:100%;
    padding:0 7% 0 7%;
    font-size: 150%;
  }
  .input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { /* WebKit*/
    color:#CCCCCC;
    font-size:100%;
  }
  .bottom{
    position: absolute;
    bottom:0;
    height: 12%;
    width:100%;
  }
  .button-div{
    height: 80%;
    width:100%;
  }
  .button{
    background-color: #96c864;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 140%;
    /*padding: 20px;*/
    height: 100%;
    width: 100%;
  }
  .rule{
    height: 20%;
    font-size:120%;
    color:#f5222d;
    text-align: center;
  }
</style>
