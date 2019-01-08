/*
找回密码验证验证码成功后跳转至此页面设置新密码
*/

<template>
  <div class="root">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">密码设置</span>
      <span style="visibility: hidden"><Icon type="ios-arrow-back" size="large"/></span>
    </div>
    <div class="main">
      <div class="input-div">
        <input class="input" v-model="newPassword" placeholder="输入密码"/>
      </div>
      <div class="input-div">
        <input class="input" v-model="confirmPassword" placeholder="确认密码"/>
      </div>
      <div class="text">可包含数字、字母、下划线，长度不小于六位</div>
      <button class="button" @click="update">确认提交</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "setPassword",
      data(){
        return {
          newPassword:'',
          confirmPassword:'',
          name:'1',
        }
      },
      methods:{
        update:function(){
          let _this=this;
          _this.return(_this.$data.name);
        },
        return:function(id){
          this.$router.push({
            name:'teacherMobileProfile',
            params:{id}
          });
          this.$message({
            type:'success',
            message:'修改成功!'
          })
        },
        back:function(){
          this.$router.go(-1);
        }
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
    background:#fff;
    margin-top: 4%;
  }
  .input{
    background-color:#fff;
    border:0;
    height:100%;
    width:100%;
    padding:0 0 0 7%;
    font-size: 2.3vmax;
  }
  .input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { /* WebKit*/
    color:#CCCCCC;
    font-size:2.3vmax;
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
  }
  .text{
    margin-top:50%;
    margin-left:2%;
    color:#a9a9a9;
    font-size:1.5vmax;
    height: 5%;
  }
</style>
