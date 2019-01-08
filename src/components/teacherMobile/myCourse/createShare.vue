/*
共享设置下的新增共享页面
*/
<template>
  <div class="root" @click="closeMenu">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">新增共享</span>
      <span style="visibility: hidden"><Icon type="ios-arrow-back" size="large"/></span>
    </div>
    <div class="main">
      <down-menu></down-menu>
      <div class="row">
        <div class="col1">共享类型：</div>
        <div class="col2">
          <el-select v-model="selectType" class="select">
            <el-option v-for="item in type" :key="item.label" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </div>
      </div>
      <div class="row">
        <div class="col1">共享对象：</div>
        <div class="col2">
          <el-select v-model="selectMember" class="select">
            <el-option v-for="item in member" :key="item.label" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </div>
      </div>
      <div class="foot"><button class="button" @click="confirmShare">确认共享</button></div>
    </div>

    <el-dialog :visible.sync="dialogVisible" :show-close="false" top="40%" width="60%" center>
      <div slot="title" style="color:green">
        <Icon type="md-information-circle" size="35"/>
      </div>
      <div style="text-align: center;font-size: 2vmax;color: #000;">
        <p>确认发送共享请求？</p>
      </div>
      <div slot="footer" style="color: green">
        <button class="textButton" @click="confirmSendShare">确认</button>
        <button class="textButton" @click="dialogVisible=false">取消</button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "shareSettings",
    data(){
      return {
        id:localStorage.getItem("token"),
        courseNumber:this.$route.params.courseNumber,
        courseName:this.$route.params.name,
        type:[{
          label:'共享分组',
          value:'0'
        },
          {
            label:'共享讨论课',
            value:'1'
          }],

        selectType:'',//0表示共享分组 1表示共享讨论课

        member:[{
          id:'',
          name: '',
        }],

        selectMember:'',
        dialogVisible:false,
      }
    },
    methods:{
      closeMenu: function () {
        const menu = document.getElementById("show");
        if (document.getElementById("show").style.display === "block") {
          if (!menu.contains(event.target)) document.getElementById("show").style.display = "none";
        }
      },
      enter:function(){
        this.$router.push({
          name:'teacherMobileShareSettings',
          params:{
            name:this.$data.courseName,
            courseNumber:this.$data.courseNumber
          }
        })
      },
      confirmShare:function(){
        this.$data.dialogVisible=true;
      },

      confirmSendShare:function(){
        let _this=this;
        console.log(this.$data.selectType);
        console.log(this.$data.selectMember);
        if(_this.$data.selectType==='0'){
          this.$axios({
            method: 'post',
            url: '/course/'+_this.$data.courseNumber+'/teamshare',
            headers: {
              'Authorization': 'Bearer ' + _this.$data.id
            },
            data:{
              subCourseId:parseInt(_this.$data.selectMember)
            }
          }).then(function (response) {
            if(response.data===true){
              _this.$message({
                type:'success',
                message:'发起成功!'
              });
              _this.$data.dialogVisible=false;
            }
          }).catch(function(error){
            console.log(error.code);
            if(error.code===400){
              _this.$message({
                type:'error',
                message:error.message
              })
            }else{
              _this.$message({
                type:'error',
                message:'出了一点意外哦'
              })
            }
          })
        }
        else if(_this.$data.selectType==='1'){
          this.$axios({
            method: 'post',
            url: '/course/'+_this.$data.courseNumber+'/seminarshare',
            headers: {
              'Authorization': 'Bearer ' + _this.$data.id
            },
            data:{
              subCourseId:parseInt(_this.$data.selectMember)
            }
          }).then(function (response) {
            if(response.data===true){
              _this.$message({
                type:'success',
                message:'发起成功!'
              });
              _this.$data.dialogVisible=false;
            }
          }).catch(function(error){
            console.log(error);
            _this.$message({
              type:'error',
              message:'出了一点意外哦'
            })
          })
        }
      },
      back:function(){
        this.$router.go(-1);
      },
      getAllCourse:function(){
        let _this=this;
        this.$axios({
          methods: 'get',
          url: '/course/all',
          headers: {
            'Authorization': 'Bearer ' + _this.$data.id
          },
        }).then(function (response) {
          _this.$data.member.splice(0,_this.$data.member.length);
          for(var i=0;i<response.data.length;i++){
            _this.$data.member.push({
              id:response.data[i].id,
              name:response.data[i].name+'（'+response.data[i].teacherId+'）',
            })
          }
        }).catch(function(error){
          console.log(error);
        })
      }
    },
    created() {
      this.getAllCourse();
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
    background: #fff;
  }
  .main{
    /*margin-top: 8%;*/
    height: 92%;
    width: 100%;
  }
  .foot{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 10%;
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
  .row{
    height: 15%;
    width: 100%;
    border-bottom: #aaaaaa 1px solid;
  }
  .col1{
    margin-left: 5%;
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size:150%;
    color:black;
    float:left;
  }
  .col2{
    width: 65%;
    height: 100%;
    float: left;
    font-size: 140%;
    color:black;
    display: flex;
    align-items: center;
  }
  .select{
    width: 90%;
    border: 1px solid #259B24;
    border-radius: 5px;
    color:#259B24;
  }
  .textButton{
    border: 0px;
    background: #fff;
    font-size:2vmax;
    color:#259B24;
    width: 30%;
  }
</style>

