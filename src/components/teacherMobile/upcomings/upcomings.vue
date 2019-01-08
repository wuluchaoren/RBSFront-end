/*
待办页面 右上角进入
*/

<template>
<div class="root">
  <div class="head">
    <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
    <span style="width:85%">待办及通知</span>
    <OCMenu></OCMenu>
  </div>
  <div class="main">
    <down-menu></down-menu>
    <div class="contain">
      <el-table class="table1" :data="tableData" :show-header=false>
        <el-table-column>
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.text }}</span>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="expand">
              <div style="text-align: center">{{scope.row.reason}}</div>
              <div class="expand-div" @click="agree(scope.$index,scope.row)">
                <img style="height: 60%;margin-top:10%" src="../../../assets/checkmark.png"/>
              </div>
              <div class="expand-div" @click="disagree(scope.$index,scope.row)">
                <img style="height: 60%;margin-top:10%" src="../../../assets/cancel.png"/>
              </div>
              <div class="expand-div">
                <img style="height: 60%;margin-top:10%" src="../../../assets/menu.png"/>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="width: 96%;margin-left: 2%;border-top:solid 2px #96c864;height: 1px;position: fixed;bottom:1%"></div>
    </div>
  </div>
</div>
</template>

<script>
    export default {
        name: "upcomings",
      data(){
          return{
            id:localStorage.getItem("token"),
            tableData:[{
              //0表示共享分组邀请 1表示共享讨论课邀请 1表示不合法组队申请
              id:'',
              type:'',
              text:'',
              sender:'',
              state:'',
              reason:'',
            }],
          }
      },
      methods: {
        getAllTeamRequest:function(){
          let _this=this;
          this.$axios({
            url:'/request/team',
            method:'get',
            headers:{
              'Authorization': 'Bearer ' + _this.$data.id
              // 'Authorization':'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDA3MTAwMDEyIiwiZXhwIjoxNTQ2NDE0MzQ5fQ.MZNaCH5fj0uOzk3YOVe_Xk85f6v-KMpgKwWAJAWLJMp9Qlh3Gvea-kIJkFIl4BUeGtKrn-Od3VR5qhKSAzhPNA'
            }
          }).then(function(response){
            _this.$data.tableData.splice(0,_this.$data.tableData.length);
            for(var i=0;i<response.data.length;i++){
              _this.$data.tableData.push({
                id:response.data[i].id,
                type:'2',
                text:response.data[i].courseInfoVO.name+' '+response.data[i].teamBaseInfoVO.teamSerials+"组不合法组队请求",
                sender:'',
                state:'',
                reason:response.data[i].reason
              })
            }
            _this.getAllShare();
          })
        },
        getAllShare:function(){
          let _this=this;
          this.$axios({
            url:'/request',
            method:'get',
            headers:{
              'Authorization': 'Bearer ' + _this.$data.id
              // 'Authorization':'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDA3MTAwMDEyIiwiZXhwIjoxNTQ2NDE0MzQ5fQ.MZNaCH5fj0uOzk3YOVe_Xk85f6v-KMpgKwWAJAWLJMp9Qlh3Gvea-kIJkFIl4BUeGtKrn-Od3VR5qhKSAzhPNA'
            }
          }).then(function(response){
            for(var i=0;i<response.data.length;i++){
              _this.$data.tableData.push({
                id:response.data[i].requestId,
                type:response.data[i].shareType==='共享讨论课'?'1':'0',
                text:response.data[i].mainCourseName+'（'+response.data[i].mainTeacherName+'）'+(response.data[i].shareType==='共享讨论课'?'讨论课共享':'分组共享'),
                sender:'',
                state:'',
                reason:''
              })
            }
          })
        },
        agree:function(index,row){
          switch(row.type){
            case '0':{
              this.agreeTeamShare(index,row);
              this.$data.tableData.splice(0,this.$data.tableData.length);
              this.getAllTeamRequest();
              break;
            }
            case '1':{
              this.agreeSeminarShare(index,row);
              this.$data.tableData.splice(0,this.$data.tableData.length);
              this.getAllTeamRequest();
              break;
            }
            case '2':{
              this.agreeTeamRequest(index,row);
              this.$data.tableData.splice(0,this.$data.tableData.length);
              this.getAllTeamRequest();
              break;
            }
          }
        },
        disagree:function(index,row){
          switch(row.type) {
            case '0': {
              this.disagreeTeamShare(index, row);
              this.$data.tableData.splice(0,this.$data.tableData.length);
              this.getAllTeamRequest();
              break;
            }
            case '1': {
              this.disagreeSeminarShare(index, row);
              this.$data.tableData.splice(0,this.$data.tableData.length);
              this.getAllTeamRequest();
              break;
            }
            case '2': {
              this.disagreeTeamRequest(index, row);
              this.$data.tableData.splice(0,this.$data.tableData.length);
              this.getAllTeamRequest();
              break;
            }
          }
        },
        agreeTeamRequest:function(index,row){
          let _this=this;
          this.$axios({
            url: '/request/team?requestId='+row.id+'&status=1',
            method: 'put',
            headers: {
              'Authorization': 'Bearer ' + _this.$data.id
              // 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDA3MTAwMDEyIiwiZXhwIjoxNTQ2NDE0MzQ5fQ.MZNaCH5fj0uOzk3YOVe_Xk85f6v-KMpgKwWAJAWLJMp9Qlh3Gvea-kIJkFIl4BUeGtKrn-Od3VR5qhKSAzhPNA'
            },
            // data:{
            //   requestId:row.id,
            //   status:1
            // }
          }).then(function(response){
            if(response.data===true){
              _this.$message({
                message:'处理成功!',
                type:'success'
              })
            }
            else {
              _this.$message({
                message:'出了点意外哦',
                type:'error'
              })
            }
          }).catch(function(error){
            console.log(error)
          })
        },
        disagreeTeamRequest:function(index,row){
          let _this=this;
          this.$axios({
            url: '/request/team?requestId='+row.id+'&status=0',
            method: 'put',
            headers: {
              'Authorization': 'Bearer ' + _this.$data.id
              // 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDA3MTAwMDEyIiwiZXhwIjoxNTQ2NDE0MzQ5fQ.MZNaCH5fj0uOzk3YOVe_Xk85f6v-KMpgKwWAJAWLJMp9Qlh3Gvea-kIJkFIl4BUeGtKrn-Od3VR5qhKSAzhPNA'
            },
            // data:{
            //   requestId:row.id,
            //   status:0
            // }
          }).then(function(response){
            if(response.data===true){
              _this.$message({
                message:'处理成功!',
                type:'success'
              })
            }
            else {
              _this.$message({
                message:'出了点意外哦',
                type:'error'
              })
            }
          }).catch(function(error){
            console.log(error)
          })
        },
        agreeTeamShare:function(index,row){
          let _this=this;
          this.$axios({
            url:'/request/teamshare/'+row.id,
            method:'put',
            headers: {
              'Authorization': 'Bearer ' + _this.$data.id
              // 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDA3MTAwMDEyIiwiZXhwIjoxNTQ2NDE0MzQ5fQ.MZNaCH5fj0uOzk3YOVe_Xk85f6v-KMpgKwWAJAWLJMp9Qlh3Gvea-kIJkFIl4BUeGtKrn-Od3VR5qhKSAzhPNA'
            },
            data:{
              handleType:'accept'
            }
          }).then(function(response){
            _this.$message({
              message:'接受邀请!',
              type:'success'
            })
          }).catch(function(error){
            console.log(error)
          })
        },
        disagreeTeamShare:function(index,row){
          let _this=this;
          this.$axios({
            url:'/request/teamshare/'+row.id,
            method:'put',
            headers: {
              'Authorization': 'Bearer ' + _this.$data.id
              // 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDA3MTAwMDEyIiwiZXhwIjoxNTQ2NDE0MzQ5fQ.MZNaCH5fj0uOzk3YOVe_Xk85f6v-KMpgKwWAJAWLJMp9Qlh3Gvea-kIJkFIl4BUeGtKrn-Od3VR5qhKSAzhPNA'
            },
            data:{
              handleType:'reject'
            }
          }).then(function(response){
            _this.$message({
              message:'拒绝邀请!',
              type:'success'
            })
          }).catch(function(error){
            console.log(error)
          })
        },
        agreeSeminarShare:function(index,row){
          let _this=this;
          this.$axios({
            url:'/request/seminarshare/'+row.id,
            method:'put',
            headers: {
              'Authorization': 'Bearer ' + _this.$data.id
              // 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDA3MTAwMDEyIiwiZXhwIjoxNTQ2NDE0MzQ5fQ.MZNaCH5fj0uOzk3YOVe_Xk85f6v-KMpgKwWAJAWLJMp9Qlh3Gvea-kIJkFIl4BUeGtKrn-Od3VR5qhKSAzhPNA'
            },
            data:{
              handleType:'accept'
            }
          }).then(function(response){
            _this.$message({
              message:'接受邀请!',
              type:'success'
            })
          }).catch(function(error){
            console.log(error)
          })
        },
        disagreeSeminarShare:function(index,row){
          let _this=this;
          this.$axios({
            url:'/request/seminarshare/'+row.id,
            method:'put',
            headers: {
              'Authorization': 'Bearer ' + _this.$data.id
              // 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDA3MTAwMDEyIiwiZXhwIjoxNTQ2NDE0MzQ5fQ.MZNaCH5fj0uOzk3YOVe_Xk85f6v-KMpgKwWAJAWLJMp9Qlh3Gvea-kIJkFIl4BUeGtKrn-Od3VR5qhKSAzhPNA'
            },
            data:{
              handleType:'reject'
            }
          }).then(function(response){
            _this.$message({
              message:'拒绝邀请!',
              type:'success'
            })
          }).catch(function(error){
            console.log(error)
          })
        },
        back:function(){
          this.$router.go(-1);
        }
      },
      created() {
          this.getAllTeamRequest();
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
  }
  .contain{
    height: 95%;
    width:100%;
  }

  .table1{
    margin-left:5%;
    width:90%;
    max-height:95%;
    font-size:1.9vmax;
    letter-spacing: 1px;
    color:#000;
  }
  .table2{
    margin-left:5%;
    width:90%;
    max-height:80%;
    font-size:1.9vmax;
    letter-spacing: 1px;
    color:#000;
  }
  .expand{
    height: 50px;
    width:100%;
  }
  .expand-div{
    width:30%;
    margin-left: 3%;
    height: 100%;
    float:left;
    text-align: center;
  }
</style>
