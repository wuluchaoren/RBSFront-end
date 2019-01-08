<template>
  <div class="root" id="root">
    <div class="head">
      讨论课管理系统登录
    </div>
    <div class="main">
      <!--<form action="http://172.18.28.206:8001/loginabc" method="post" onsubmit=true>-->
        <div class="input-div">
          <input class="input" type="text" v-model="userNumber" placeholder="学号/教工号" name="username"/>
        </div>
        <div class="input-div">
          <input class="input" id="password" type="password" v-model="userPassword" placeholder="登录密码" name="password"/>
        </div>
      <!--</form>-->
      <i style="display: block;float: right;margin-right: 3%" @click="showPassword"><Icon type="ios-eye-outline" size="25"/></i>
      <button class="button" @click="login"><span>登录</span></button>
      <div class="a-dev"><a style="float:right;margin-right: 3%;"  @click="enterFindPassword">忘记密码</a></div>
      <div class="foot">初始登录默认密码为123456</div>
    </div>
  </div>
</template>

<script>
  import qs from 'qs';
    export default {
      name: "login",
      data() {
        return{
          userNumber:'',
          userPassword:'',
        }
      },
      methods: {
        enterFindPassword:function(){
          this.$router.push({
            path:'/accountAndSettings/MTfindPassword',
          })
        },
        showPassword:function(){
          if (document.getElementById("password").type === "password") {
            document.getElementById("password").type= "text";
          }
          else {
            document.getElementById("password").type = "password";
          }
        },

        // login:function(){
        //   let _this=this;
        //   const name = _this.$data.userNumber;
        //   const password = _this.$data.userPassword;
        //   this.$axios({
        //     method:'get',
        //     url:'/users/login?userid='+name+'&password='+password,
        //   }).then(function(response){
        //     if(response.data===true) {
        //       _this.$message({
        //         message: '登陆成功',
        //         type: 'success',
        //       });
        //       _this.enter(name);
        //     }
        //     else{
        //       _this.$data.userNumber='';
        //       _this.$data.userPassword='';
        //       _this.$message({
        //         message:'账号或密码错误',
        //         type:'warning',
        //       })
        //     }
        //   }).catch(function(error){
        //     console.log(error.response);
        //   })
        // },

        login:function(){
          let _this=this;
          const name = _this.$data.userNumber;
          const password = _this.$data.userPassword;
          this.$axios({
            method: 'post',
            url: '/user/login',
            data:qs.stringify({
              account:name,
              password:password
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Access-Control-Allow-Origin':'*'
            },
          }).then(function(response){
            if(response.data.status===200) {
              _this.$message({
                message: '登陆成功',
                type: 'success',
              });
              localStorage.setItem("token", response.data.jwtToken);
              console.log(response.data.jwtToken);
              if (response.data.obj.isActive === true){
                //教师
                if(response.data.obj.isTeacher===true){
                  _this.enter(localStorage.getItem("token"),response.data.obj.isTeacher);
                }
                //学生
                else{
                  _this.enter1(localStorage.getItem("token"),response.data.obj.isTeacher);
                }
              }
              else _this.enterActive(localStorage.getItem("token"),response.data.obj.isTeacher);
            }
          }).catch(function(error){
            _this.$data.userPassword='';
            _this.$message({
              message:'账号或密码错误',
              type:'warning',
            })
          })
        },

        enter:function(id){
          this.$router.push({
            name:'teacherMobileProfile',
            params:{id}
          });
        },

        enter1:function(id,role){
          this.$router.push({
            name:'StudentMobileAccountIndex',
            params:{
              id:localStorage.getItem("token"),
              role:role
            }
          });
        },

        enterActive:function(id,role){
          this.$router.push({
            name:'teacherMobileActivate',
            params:{
              id:id,
              role:role
            }
          })
        },

        hei:function() {
          let Height = window.innerHeight;
          document.getElementById("root").style.height = Height + "px";
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
    background: #96c864;
    width:100%;
    height: 10%;
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
    background: #fff;
  }
  .main{
    margin-top: 0%;
    height: 85%;
    width: 100%;
  }
  .input-div{
    height: 10%;
    width: 100%;
    margin-top: 4%;
    background:#F2F2F2;
  }
  .input{
    background-color:#F2F2F2;
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
  .button {
    display: inline-block;
    background-color: #96c864;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 130%;
    /*padding: 20px;*/
    height: 9%;
    width: 100%;
    margin-top: 9%;
  }
  .a-dev{
    margin-top:4%;
    width:100%;
    height: 5%
  }
  a{
    font-size: 130%;
    font-family:思源黑体;
  }
  .foot{
    color:#259B24;
    text-align: center;
    width:100%;
    position: fixed;
    bottom: 1%;
  }
</style>
