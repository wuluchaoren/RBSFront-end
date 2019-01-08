<template>
  <div class="root" @click="closeMenu">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">共享设置</span>
      <OCMenu></OCMenu>
    </div>
    <div class="main">
      <down-menu></down-menu>
      <el-table class="table" :data="tableData" :show-header=false height="91%" max-height="200%">
        <el-table-column>
          <template slot-scope="scope">
            <div>📗 {{scope.row.name}}（{{scope.row.teacherName}}）</div>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="expand">
              <div class="expand-div">
                <div class="col1">共享类型</div>
                <div class="col2">{{scope.row.shareType}}</div>
              </div>
              <div class="expand-div">
                <div class="col1">共享情况</div>
                <div class="col2">{{scope.row.shareSituation}}</div>
              </div>
              <div class="expand-div">
                <Button style="width: 40%;margin-left: 60%;font-size:80%" ghost type="error" @click="confirmCancel(scope.index,scope.row)">取消共享</Button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="foot">
        <button class="button" @click="enterCreateShare">新增共享</button>
      </div>

      <el-dialog :visible.sync="dialogVisible" :show-close="false" top="40%" width="60%" center>
        <div slot="title" style="color:red">
          <Icon type="md-information-circle" size="35"/>
        </div>
        <div style="text-align: center;font-size: 2vmax;color: #000;">
          <p>确认取消与</p>
          <p>{{this.$data.currentCancelName}}的共享吗？</p>
        </div>
        <div slot="footer" style="color: green">
          <button class="textButton" @click="confirmCancelShare">确认</button>
          <button class="textButton" @click="dialogVisible=false">取消</button>
        </div>
      </el-dialog>

    </div>
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

            tableData:[{
              id:'',
              name:'',
              teacherName:'',
              shareType:'',
              shareSituation:'',
            }],
            dialogVisible: false,
            currentCancelName:'',
            currentCancelId:'',
          }
      },
      methods:{
        closeMenu: function () {
          const menu = document.getElementById("show");
          if (document.getElementById("show").style.display === "block") {
            if (!menu.contains(event.target)) document.getElementById("show").style.display = "none";
          }
        },
        confirmCancel:function(index,row) {
          this.$data.dialogVisible=true;
          this.$data.currentCancelName=row.name+'（'+row.teacherName+'）';
          this.$data.currentCancelId=row.id;
          this.$data.currentCancelType=row.shareType;
          console.log(this.$data.currentCancelName+this.$data.currentCancelId+this.$data.currentCancelType)
        },
        confirmCancelShare:function(){
          if(this.$data.currentCancelType==='共享分组'){
            this.cancelTeam()
          }
          else{
            this.cancelSeminar()
          }
          this.$data.tableData.splice(0,this.$data.tableData.length);
          this.getAllShare();
        },
        cancelTeam:function(){
          let _this=this;
          this.$axios({
            url:'/course/teamshare/'+_this.$data.currentCancelId,
            method:'delete',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
          }).then(function(response){
            if(response.data===true){
              _this.$message({
                message:'删除成功!',
                type:'success'
              })
            }
            else {
              _this.$message({
                message:'出了一点意外',
                type:'error'
              })
            }
          }).catch(function(error){
            console.log(error);
          })
        },
        cancelSeminar:function(){
          let _this=this;
          this.$axios({
            url:'/seminarshare/'+_this.$data.currentCancelId,
            method:'delete',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
          }).then(function(response){
            if(response.data===true){
              _this.$message({
                message:'删除成功!',
                type:'success'
              })
            }
            else {
              _this.$message({
                message:'出了一点意外',
                type:'error'
              })
            }
          }).catch(function(error){
            console.log(error);
          })
        },
        enterCreateShare:function(){
          this.$router.push({
            name:'teacherMobileCreateShare',
            params:{
              name:this.$data.courseName,
              courseNumber:this.$data.courseNumber
            }
          })
        },
        getAllShare:function(){
          let _this = this;
          this.$axios({
            method: 'get',
            url: '/course/'+this.$data.courseNumber+'/share',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
          }).then(function (response) {
            _this.$data.tableData.splice(0,_this.$data.tableData.length);
            for(var i=0;i<response.data.length;i++){
              _this.$data.tableData.push({
                id:response.data[i].shareId,
                shareType:response.data[i].shareType,
                shareSituation: response.data[i].info,
                name:response.data[i].info==='从课程'?response.data[i].mainCourseName:response.data[i].subCourseName,
                teacherName:response.data[i].info==='从课程'?response.data[i].mainTeacherName:response.data[i].subTeacherName,
              })
            }
          }).catch(function (error) {
            console.log(error);
          })
        },
        back:function(){
          this.$router.go(-1);
        }
      },
      created() {
          this.getAllShare()
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
  .table{
    width: 96%;
    margin-left: 2%;
    font-size: 130%;
    color: black;
  }
  .expand{
    height: 150px;
  }
  .expand-div{
    height: 33%;
    width: 100%;
    display: flex;
    align-items: center;
    border-top: 1px #aaaaaa solid;
  }
  .col1{
    float: left;
    width: 25%;
    color: green;
    margin-left: 5%;
    font-size: 90%;
  }
  .col2{
    float: left;
    width: 70%;
    text-align: center;
  }
  .foot{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 9%;
    z-index:9999;
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
  .textButton{
    border: 0px;
    background: #fff;
    font-size:2vmax;
    color:#259B24;
    width: 30%;
  }
</style>
