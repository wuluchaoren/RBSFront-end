<template>
  <div class="root" @click="closeMenu" id="root">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">学生成绩</span>
      <OCMenu></OCMenu>
    </div>
    <div class="main">
      <down-menu></down-menu>
      <div style="height: auto;width: 100%;border-left:2px solid #96c864;border-right:2px solid #96c864;">
      <el-table class="table" :data="tableData" :show-header=false max-height="1000%">
        <el-table-column align="center">
          <template slot-scope="scope">
            <p style="color: green;font-size: 120%">📌  {{scope.row.round}}</p>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="expand">
              <el-table class="table" :data="scope.row.group" :show-header=false>
                <el-table-column prop="number"></el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <p>{{scope.row.totalScore}}分</p>
                  </template>
                </el-table-column>
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <div class="expand">
                      <div class="expand-div" v-for="item in scope.row.seminar">
                        <div style="height: 30%;width:100%;font-size:120%;text-align: center;color:black">{{item.seminarName}}</div>
                        <div style="height: 40%;width: 100%;text-align: center">
                            <div style="width: 100%;color: #000;">💻展示：<input style="color:green;width: 15%;height: 40%;border:1px solid #aaaaaa;padding-left: 1%" v-model="item.showScore"></input></div>
                            <div style="width: 100%;color: #000;">🙋‍♂️提问：<input style="color:green;width: 15%;height: 40%;border:1px solid #aaaaaa;padding-left: 1%" v-model="item.askScore"></input></div>
                          <div style="width: 100%;color: #000;">📜书面报告：<input style="color:green;width: 15%;height: 40%;border:1px solid #aaaaaa;padding-left: 1%" v-model="item.reportScore"></input></div>
                        </div>
                        <div style="width: 100%;height: 30%;text-align: center"><button class="button" @click="alterScore3(item,scope.row)">修改成绩</button></div>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div></div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <!--<div class="foot">-->
        <!--<button class="foot-button" disabled>导出成绩</button>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
    export default {
        name: "studentScore",
      data() {
        return {
          id:localStorage.getItem("token"),
          courseNumber:this.$route.params.courseNumber,
          courseName:this.$route.params.name,

          tableData: [{
            round: '第一轮',
            group: [{
              number: '2-3',
              id:'',
              totalScore: '5.0',
              classId:'',
              seminar: [{
                seminarId:'',
                seminarName: '用例分析',
                reportScore: '5.0',
                askScore: '5.0',
                showScore: '5.0',
              }]
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
        hei:function() {
          let Height = window.innerHeight;
          document.getElementById("root").style.height = Height + "px";
        },
        back:function(){
          this.$router.go(-1);
        },
        getAll:function(){
          let _this=this;
          this.$axios({
            url:'/allscore/allteam?courseId='+_this.$data.courseNumber,
            method:'get',
            headers: {
              'Authorization': 'Bearer ' + _this.$data.id
              // 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDA3MTAwMDEyIiwiZXhwIjoxNTQ2NDE0MzQ5fQ.MZNaCH5fj0uOzk3YOVe_Xk85f6v-KMpgKwWAJAWLJMp9Qlh3Gvea-kIJkFIl4BUeGtKrn-Od3VR5qhKSAzhPNA'
            },
          }).then(function(response){
            _this.$data.tableData=response.data;
            for(var i=0;i<response.data.length;i++){
              _this.$data.tableData[i].round='第'+response.data[i].roundInfoVO.roundSerial+'轮';
              _this.$data.tableData[i].group=response.data[i].bigTeamVOS;
              for(var j=0;j<response.data[i].bigTeamVOS.length;j++){
                _this.$data.tableData[i].group[j].number=response.data[i].bigTeamVOS[j].teamBaseInfoVO.teamSerials;
                _this.$data.tableData[i].group[j].id=response.data[i].bigTeamVOS[j].teamBaseInfoVO.teamId;
                _this.$data.tableData[i].group[j].totalScore=response.data[i].bigTeamVOS[j].bigRoundScoreVO.roundTotalScore;
                _this.$data.tableData[i].group[j].seminar=response.data[i].bigTeamVOS[j].bigSeminarVOS;
                _this.$data.tableData[i].group[j].classId=response.data[i].bigTeamVOS[j].bigSeminarVOS[0].classId;
                for(var k=0;k<response.data[i].bigTeamVOS[j].bigSeminarVOS.length;k++){
                  _this.$data.tableData[i].group[j].seminar[k].seminarName=response.data[i].bigTeamVOS[j].bigSeminarVOS[k].seminarName;
                  _this.$data.tableData[i].group[j].seminar[k].seminarId=response.data[i].bigTeamVOS[j].bigSeminarVOS[k].seminarId;
                  _this.$data.tableData[i].group[j].seminar[k].reportScore=response.data[i].bigTeamVOS[j].bigSeminarVOS[k].seminarReportScore;
                  _this.$data.tableData[i].group[j].seminar[k].askScore=response.data[i].bigTeamVOS[j].bigSeminarVOS[k].seminarQuestionScore;
                  _this.$data.tableData[i].group[j].seminar[k].showScore=response.data[i].bigTeamVOS[j].bigSeminarVOS[k].seminarPresentationScore;
                }
              }
            }
          }).catch(function(error){
            console.log(error)
          })
        },
        alterScore3:function(item,row){
          let _this=this;
          this.$axios({
            url:'/seminarscore/team/'+row.id,
            method:'put',
            headers: {
              'Authorization': 'Bearer ' + _this.$data.id
              // 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDA3MTAwMDEyIiwiZXhwIjoxNTQ2NDE0MzQ5fQ.MZNaCH5fj0uOzk3YOVe_Xk85f6v-KMpgKwWAJAWLJMp9Qlh3Gvea-kIJkFIl4BUeGtKrn-Od3VR5qhKSAzhPNA'
            },
            data:{
              classId:row.classId,
              seminarId:item.seminarId,
              seminarPresentationScore:item.showScore,
              seminarQuestionScore:item.askScore,
              seminarReportScore:item.reportScore,
            }
          }).then(function(response){
            if(response.data===true){
              _this.$message({
                message:'修改成功!',
                type:'success'
              })
            }
          }).catch(function(error){
            console.log(error);
            _this.$message({
              message:'出了一点意外哦!',
              type:'error'
            })
          })
        }


      },
      mounted() {
          this.hei();
          this.getAll();
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
    font-size: 160%;
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
  .expand{
    height: 100%;
    width: 100%;
  }
  .table{
    width: 96%;
    margin-left: 2%;
  }
  .expand-div{
    background: #fcfff2;
    width: 100%;
    height: 100%;
    border-top: 1px solid #aaaaaa;
    border-bottom: 1px solid #aaaaaa;
  }
  .button{
    width: 40%;
    background: #fff;
    border: 1px green solid;
    color: green;
    border-radius: 2px;
    margin-bottom: 3%;
  }
  .foot{
    height: 8%;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index:9999;
  }
  .foot-button{
    width: 100%;
    height: 100%;
    background: #96c864;
    border: transparent;
    color:#fff;
    border-radius: 5px;
    font-size:150%;
  }
</style>
