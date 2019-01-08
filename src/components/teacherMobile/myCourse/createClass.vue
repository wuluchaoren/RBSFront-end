/*
班级信息下的新建班级页面
*/

<template>
  <div class="root" @click="closeMenu" id="root">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">新建班级</span>
      <span style="visibility: hidden"><Icon type="ios-arrow-back" size="large"/></span>
    </div>
    <div class="main">
      <down-menu></down-menu>
      <div class="contain">
        <div class="row">
          <div class="col1">班级名：</div>
          <div class="col2">
            <input class="input" placeholder="年级-班级，如：2016-2" v-model="className"></input>
          </div>
        </div>
        <div class="row">
          <div class="col1">上课时间：</div>
          <div class="col2">
            <input class="input" placeholder="如：周四1、2节" v-model="classTime"></input>
          </div>
        </div>
        <div class="row">
          <div class="col1">上课地点：</div>
          <div class="col2">
            <input class="input" placeholder="如：海韵102" v-model="classPlace"></input>
          </div>
        </div>
        <div class="row">
          <div class="col1">班级学生名单：</div>
          <div style="color:red;font-size: 120%;display: flex;align-items: center;height: 100%;width:70%;padding-left: 5%">请使用PC端上传学生名单</div>
        </div>
      </div>
      <div class="foot">
        <button class="button" @click="createClass">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "createClass",
      data() {
        return {
          id:localStorage.getItem("token"),
          courseNumber:this.$route.params.courseNumber,
          className:'',
          classTime:'',
          classPlace:''
        }
      },
      methods: {
        closeMenu: function () {
          const menu = document.getElementById("show");
          if (document.getElementById("show").style.display === "block") {
            if (!menu.contains(event.target)) document.getElementById("show").style.display = "none";
          }
        },

        hei: function () {
          let Height = window.innerHeight;
          document.getElementById("root").style.height = Height + "px";
        },
        createClass:function(){
          let _this = this;
          let total=_this.$data.className;
          let grade=total.split('-')[0];
          let serial=total.split('-')[1];
          this.$axios({
            method: 'post',
            url: '/course/'+this.$data.courseNumber+'/class',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
            data:{
              grade:grade,
              serial:serial,
              time:_this.$data.classTime,
              classroom:_this.$data.classPlace
            }
          }).then(function (response) {
            _this.$message({
              messgae:'新建成功!',
              type:'success'
            });
            _this.enter();
          }).catch(function (error) {
            console.log(error.data);
          })
        },
        enter:function(){
          this.$router.push({
            name:'teacherMobileClassInfo',
            params:{
              id:this.$data.id,
              name:this.$route.params.name,
              courseNumber:this.$data.courseNumber
            }
          })
        },
        back:function(){
          this.$router.go(-1);
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
    height: 92%;
    width: 100%;
  }
  .foot{
    height: 9%;
    width:100%;
    position: absolute;
    bottom: 0;
  }
  .button{
    display: inline-block;
    background-color: #96c864;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 150%;
    /*padding: 20px;*/
    height: 100%;
    width: 100%;
  }
  .contain{
    background: #fff;
    width: 100%;
    height: 50%;
  }
  .row{
    height: 25%;
    width:95%;
    margin-left: 5%;
  }
  .col1{
    color: black;
    width: 30%;
    font-size: 140%;
    height: 100%;
    float: left;
    display: flex;
    align-items: center;
  }
  .col2{
    float: left;
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .input{
    width: 80%;
    height: 40%;
    border: 1px solid green;
    border-radius: 3px;
    font-size: 130%;
    padding: 0 5% 0 5%;
  }
  .input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { /* WebKit*/
    color:#CCCCCC;
    font-size:100%;
  }
</style>
