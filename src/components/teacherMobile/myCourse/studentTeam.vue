<template>
  <div class="root" @click="closeMenu">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">学生组队</span>
      <OCMenu></OCMenu>
    </div>
    <div class="main">
      <down-menu></down-menu>
      <el-table class="table" :data="tableData" :show-header=false>
        <el-table-column prop="teamInfo.teamSerials" align="center"></el-table-column>
        <el-table-column prop="teamInfo.teamName" align="center"></el-table-column>
        <el-table-column prop="teamInfo.teamState" style="color:red" align="center"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="expand">
              <div class="expand-div">
                <div class="col1">👨‍💼组长</div>
                <div class="col2">{{scope.row.leader.account}}</div>
                <div class="col3">{{scope.row.leader.name}}</div>
              </div>
              <div class="expand-div" v-for="item in scope.row.members">
                <div class="col1">👷‍♂️组员</div>
                <div class="col2">{{item.account}}</div>
                <div class="col3">{{item.name}}</div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    export default {
        name: "studentTeam",
      data(){
          return{
            courseNumber:this.$route.params.courseNumber,
            id:localStorage.getItem("token"),
            teamId:[{
              id:''
            }],
            tableData:[{
              teamInfo:{
                id:undefined,
                teamSerials:undefined,
                teamName:undefined,
                teamState:undefined,
              },
              leader:{
                name:undefined,
                account:undefined,
              },
              members:[{
                role:undefined,
                name:undefined,
                account:undefined
              }]
            }]
          }
      },
      methods:{
        closeMenu: function () {
          const menu = document.getElementById("show");
          if (document.getElementById("show").style.display === "block") {
            if (!menu.contains(event.target)) document.getElementById("show").style.display = "none";
          }
        },
        getAllTeam:function(){
          let _this = this;
          this.$axios({
            method: 'get',
            url: '/course/'+this.$data.courseNumber+'/team',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
          }).then(function (response) {
            _this.$data.teamId=response.data;
            _this.$data.tableData.splice(0,_this.$data.tableData.length);
            for(let i=0;i<response.data.length;i++){
              _this.$data.teamId[i].id=response.data[i].id;
              _this.getTeamById(_this.$data.teamId[i].id,i);
            }
            console.log(_this.$data.teamId);
          }).catch(function (error) {
            console.log(error.data);
          })
        },
        getTeamById:function(id,i){
          let _this = this;
          this.$axios({
            method: 'get',
            url: '/team/'+id,
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
          }).then(function (response) {
            _this.$data.tableData.push(response.data);
          }).catch(function (error) {
            console.log(error.data);
          })
        },
        back:function(){
          this.$router.go(-1);
        }
      },
      created() {
        this.getAllTeam();
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
  }
  .main{
    /*margin-top: 8%;*/
    height: auto;
    width: 100%;
    background: #f2f2f2;
  }
  .table{
    width: 96%;
    margin-left: 2%;
    font-size: 150%;
    color: black;
    max-height:200%;
  }
  .expand{
    height: 100%;
    width: 100%;
  }
  .expand-div{
    height: 20%;
    width: 100%;
    display: flex;
    align-items: center;
    border-top: 1px #aaaaaa solid;
  }
  .col1{
    width: 25%;
    height: 100%;
    color: green;
    font-size: 100%;
    text-align: center;
  }
  .col2{
    width: 50%;
    height: 100%;
    font-size: 90%;
    text-align: center;
  }
  .col3{
    width: 25%;
    height: 100%;
    font-size: 90%;
    text-align: center;
  }
</style>
