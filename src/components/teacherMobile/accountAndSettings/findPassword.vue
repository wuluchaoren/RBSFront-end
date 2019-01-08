<template>
  <div class="root" id="root">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">找回密码</span>
      <span style="visibility: hidden"><Icon type="ios-arrow-back" size="large"/></span>
    </div>
    <div class="main">
      <div class="input-div">
        <input class="input" v-model="idNum" placeholder="教工号/学号"/>
      </div>
      <div class="input-div2">
        <!--<input class="input2" v-model="captcha" placeholder="验证码"/>-->
        <Button type="error" class="captchaButton" ghost @click="sendPassword">发送密码</Button>
      </div>
      <!--<button class="button" @click="validate">下一步</button>-->
    </div>
  </div>
</template>

<script>
    export default {
      name: "findPassword",
      data() {
        return {
          idNum:'',
          id:localStorage.getItem("token")
        }
      },
      methods: {
        hei:function() {
          let Height = window.innerHeight;
          document.getElementById("root").style.height = Height + "px";
        },
        sendPassword:function(){
          let _this=this;
          this.$axios({
            method:'put',
            url:'/user/password',
            data:{
              account:_this.$data.idNum
            }
          }).then(function(response){
            if(response.data===true){
              _this.$message({
                message:'密码已发送到您的邮箱',
                type:'success'
              })
            }
            else{
              _this.$message({
                message: response.data,
                type: 'error',
              })
            }
          })
        },
        back:function(){
          this.$router.go(-1);
        }
      },
      created() {
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
    height: 85%;
    width: 100%;
    margin-top:8%
  }
  .input-div{
    height: 9%;
    width: 96%;
    margin-left: 2%;
    background:#fff;
  }
  .input-div2{
    height: 9%;
    width: 25%;
    margin-left: 73%;
    /*background:#fff;*/
    margin-top: 4%;
  }
  .input{
    background-color:#fff;
    border:0;
    height:100%;
    width:100%;
    padding:0 0 0 7%;
    font-size: 150%;
  }
  .input2{
    background-color:#fff;
    border:0;
    height:100%;
    width:60%;
    padding:0 0 0 7%;
    font-size: 150%;
    display: none;
  }
  .input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { /* WebKit*/
    color:#CCCCCC;
    font-size: 100%;
  }
  .input2::-webkit-input-placeholder, textarea::-webkit-input-placeholder { /* WebKit*/
    color:#CCCCCC;
    font-size: 100%;
  }
  .captchaButton{
    width:100%;
    height: 60%;
    margin-bottom: 1%;
  }
  .button {
    display: inline-block;
    background-color: #96c864;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 150%;
    /*padding: 20px;*/
    height: 9%;
    width: 100%;
    margin-top: 60%;
  }
</style>
