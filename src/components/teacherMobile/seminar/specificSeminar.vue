<template>
  <div class="root" @click="closeMenu">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">{{this.$route.params.name}}</span>
      <OCMenu></OCMenu>
    </div>
    <div class="main">
      <downMenu></downMenu>
      <div style="height: 100%;">
      <el-table class="table" :data="tableData.rounds" :show-header=false height="90%" max-height="1000%">
        <el-table-column>
          <template slot-scope="scope">
            <p style="color: green;font-size: 120%">{{scope.row.roundSerial}}</p>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="expand">
              <div style="height: 10%;width: 100%;font-size: 120%;color: #000;" @click="enterRoundSettings(id,coursename,courseNumber,scope.row.roundSerial,scope.row.roundId)">
                <i class="el-icon-setting" style="margin-right: 3%"></i>轮次设置
                <p style="float: right;margin-right: 5%">👉</p>
              </div>

              <el-table :data="scope.row.seminarInfoVOS" :show-header=false style="font-size:110%;color:#000">
                <el-table-column prop="seminarName"></el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <i class="el-icon-edit" style="color:#96c864;font-size:120%" @click="editSeminar(scope.row.seminarName,scope.row.seminarId)"></i>
                  </template>
                </el-table-column>
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <div class="expand">
                      <div class="expand-div" v-for="item in tableData.cClasses">
                        <div style="height: 50%;width:100%;font-size:130%;color:black;text-align: center;border-bottom: #f2f2f2 1px solid;padding-top: 10px"
                             @click="enterSpecificSeminarHome(id,coursename,courseNumber,scope.row.seminarName,scope.row.seminarId,item.name,item.id)">📚{{item.name}}</div>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>
      </el-table>
        <div class="foot"><button class="footer" @click="enterCreateSeminar">新建讨论课</button></div>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "specificSeminar",
      data(){
          return{
            id:localStorage.getItem("token"),
            coursename:this.$route.params.name,
            courseNumber:this.$route.params.courseNumber,

            tableData:{
              cClasses:[{
                id:'',
                name:'',
              }],
              rounds:[{
                roundId:'',
                roundSerial:'',
                seminarInfoVOS:[{
                  seminarName:'',
                  seminarId:'',
                  visible:'',
                }]
              }]
            },

          }
      },
      methods:{
        closeMenu:function(){
          const menu=document.getElementById("show");
          if(document.getElementById("show").style.display==="block"){
            if(!menu.contains(event.target)) document.getElementById("show").style.display="none";
          }
        },
        editSeminar:function(seminar,seminarId){
          this.$router.push({
            name:'teacherMobileAlterSeminar',
            params:{
              id:this.$data.id,
              name:this.$data.coursename,
              courseNumber:this.$data.courseNumber,
              seminar:seminar,
              seminarNumber:seminarId,
            }
          })
        },
        back:function(){
          this.$router.go(-1);
        },
        enterSpecificSeminarHome:function(id,name,courseNumber,seminar,seminarNumber,cclass,classNumber){
          this.$router.push({
            name:'teacherMobileSpecificSeminarHome',
            params:{
              id:id,
              name:name,
              courseNumber:courseNumber,
              seminar:seminar,
              seminarNumber:seminarNumber,
              class:cclass,
              classNumber:classNumber,
            }
          })
        },
        enterRoundSettings:function(id,name,courseNumber,roundName,roundId) {
          this.$router.push({
            name: 'teacherMobileSeminarRoundSettings',
            params: {
              id: id,
              name: name,
              courseNumber:courseNumber,
              round: roundName,
              roundId:roundId
            }
          })
        },
        getAllSeminar:function(){
          let _this=this;
          this.$axios({
            url:'/course/'+_this.$data.courseNumber+'/seminars',
            method:'get',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
          }).then(function(response){
            _this.$data.tableData=response.data;
            for(var i=0;i<_this.$data.tableData.rounds.length;i++){
              switch(_this.$data.tableData.rounds[i].roundSerial){
                case 1:{
                  _this.$data.tableData.rounds[i].roundSerial='第一轮';
                  break;
                }
                case 2:{
                  _this.$data.tableData.rounds[i].roundSerial='第二轮';
                  break;
                }
                case 3:{
                  _this.$data.tableData.rounds[i].roundSerial='第三轮';
                  break;
                }
                case 4:{
                  _this.$data.tableData.rounds[i].roundSerial='第四轮';
                  break;
                }
                case 5:{
                  _this.$data.tableData.rounds[i].roundSerial='第五轮';
                  break;
                }
                case 6:{
                  _this.$data.tableData.rounds[i].roundSerial='第六轮';
                  break;
                }
                case 7:{
                  _this.$data.tableData.rounds[i].roundSerial='第七轮';
                  break;
                }
                case 8:{
                  _this.$data.tableData.rounds[i].roundSerial='第八轮';
                  break;
                }
                case 9:{
                  _this.$data.tableData.rounds[i].roundSerial='第九轮';
                  break;
                }
                case 10:{
                  _this.$data.tableData.rounds[i].roundSerial='第十轮';
                  break;
                }
                case 11:{
                  _this.$data.tableData.rounds[i].roundSerial='第十一轮';
                  break;
                }
                case 12:{
                  _this.$data.tableData.rounds[i].roundSerial='第十二轮';
                  break;
                }
                case 13:{
                  _this.$data.tableData.rounds[i].roundSerial='第十三轮';
                  break;
                }
                case 14:{
                  _this.$data.tableData.rounds[i].roundSerial='第十四轮';
                  break;
                }
                case 15:{
                  _this.$data.tableData.rounds[i].roundSerial='第十五轮';
                  break;
                }
              }
            }
          })
        },
        enterCreateSeminar:function(){
          this.$router.push({
            name:'teacherMobileCreateSeminar',
            params:{
              id:this.$data.id,
              name:this.$data.coursename,
              courseNumber:this.$data.courseNumber
            }
          })
        }
      },
      created() {
          this.getAllSeminar();
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
    background: #fff;
  }
  .table{
    width: 96%;
    margin-left: 2%;
  }
  .foot{
    width:100%;
    height: 8%;
    position: fixed;
    bottom: 0;
    z-index: 9999;
  }
  .footer{
    width: 100%;
    background: #96c864;
    border: transparent;
    color:#fff;
    height: 100%;
    font-size:150%
  }
</style>
