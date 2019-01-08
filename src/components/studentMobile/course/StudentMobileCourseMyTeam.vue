<template>
  <div class="root">
    <div class="header">
      <student-mobile-header :title="title"></student-mobile-header>
    </div>
    <div class="main">
      <div v-if="team">
        <div class="team-cell" style="background-color: #f2f2f2;height: 8vmax;justify-content: center">
          <span style="text-align: center;font-size: 4vmax;color: green">
            {{team.teamNumber}}
            {{team.teamName}}
          </span>
          <span style="position: absolute;right: 5vmax;font-size: 3vmax;">
            <span v-if="team.teamState=='valid'" style="color: green">valid</span>
            <span v-if="team.teamState=='invalid'" style="color: red">invalid</span>
            <span v-if="team.teamState=='apply'" style="color: orange">apply</span>
          </span>
        </div>
        <div v-if="team.teamLeader" class="team-cell">
          <span class="team-cell-front" style="font-size: 3.5vmax">组长</span>
          <span class="team-cell-center">{{team.teamLeader.account}}</span>
          <span class="team-cell-end">{{team.teamLeader.userName}}</span>
        </div>

        <div class="memberScroll" :class="{memberScrollLarge:!isLeader}">
          <div class="team-cell" v-for="teamMember in team.teamMembers">
            <span class="team-cell-front">组员</span>
            <span class="team-cell-center">{{teamMember.account}}</span>
            <div class="team-cell-end" v-if="isLeader" @click="deleteMember(teamMember)">{{teamMember.userName}}</div>
            <div class="team-cell-end" v-else>{{teamMember.userName}}</div>
          </div>
        </div>

        <div v-if="isLeader">
          <div class="team-cell" style="background-color: #f2f2f2;height: 8vmax;justify-content: center;">
            <span style="text-align: center;font-size: 4vmax;color: green">
              添加成员
            </span>
          </div>

          <div class="team-cell">
                <span style="width: 20%;text-align: center;color: green;font-size: 2.4vmax;vertical-align: middle;margin-left: 5%">
                  搜索成员:
                </span>
            <input type="text" class="select-control" v-model="selected" placeholder="输入学号或姓名">
          </div>

          <div class="scroll">
            <div class="table">
              <div v-if="!hasElement" class="nt-cell" style="justify-content: center">
                <span style="font-size: 3vmax;color: darkgray">搜索不到符合要求的学生</span>
              </div>
              <div v-for="NTStudent in NTStudentListBySearch">
                <div class="nt-cell">
                  <span class="nt-cell-front" v-if="!NTStudent.isSelect"><img @click="handleSelectionChange(NTStudent)"
                                                                              class="icon" src="../../../assets/uncheck.png"/>
                  </span>
                  <span class="nt-cell-front" v-else><img @click="handleSelectionChange(NTStudent)" class="icon" src="../../../assets/check.png"/></span>
                  <span class="nt-cell-center">{{NTStudent.account}}</span>
                  <span class="nt-cell-end">{{NTStudent.userName}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Modal
        v-model="applyModal">
        <div slot="header">
          <span style="font-size: 4vmax" >
          申请理由
        </span>
        </div>

        <div>
          <textarea class="form-control" v-model="applyReason" style="resize: none;" placeholder=""></textarea>
        </div>
        <Button class="button_three" slot="footer" type="success" @click="sendApply">SURE
        </Button>
      </Modal>


    </div>

    <div v-if="isLeader" class="footer">
      <div v-if="team.teamState=='invalid'||team.teamState=='apply'">
        <Button class="button-three" type="error"  ghost @click="applyModal = true">提交审核</Button>
      </div>
      <div v-if="team.teamState!='apply'">
        <Button  class="button-three" type="error" @click="dissolveTeam">解散小组</Button>
      </div>
      <div v-if="team.teamState!='apply'">
        <Button  class="button-three" type="success" @click="invite">添加</Button>
      </div>
    </div>
    <div v-else class="footer">
      <button v-if="team.teamState!='apply'" class="button-exit" type="error" @click="leaveTeam">退出小组</button>
    </div>


  </div>
</template>

<script>
    import StudentMobileHeader from "../common/StudentMobileHeader";
    import ThreePartCell from "../common/threePartCell";
    import ThreePartCellWithCheckBox from "../common/threePartCellWithCheckBox";

    String.prototype.startWith = function(str){
      if(str == null || str== "" || this.length== 0 || str.length > this.length){
        return false;
      }
      if(this.substr(0,str.length) == str){
        return true;
      }else{
        return false;
      }
      return true;
    };

    export default {
      name: "StudentMobileCourseMyTeam",
      components: {ThreePartCellWithCheckBox, ThreePartCell, StudentMobileHeader},
      data() {
        return {
          spanLeft:'font-size:2.1vmax;margin-left:',
          spanGreen:'font-size:2.1vmax;color:green;',
          spanBlack:'font-size:2.1vmax;color:black;',
          isLeader:false ,
          applyModal:false,
          applyReason:'',
          title: this.$route.query.courseName + this.$route.query.className,
          selected:'',
          hasElement:'',
          team: '',
          NTStudents:[],
          inviteStudentsId:[],
          getMyTeamUrl:`course/${this.$route.query.courseId}/team/mine`,
          getNTStudentsUrl:`course/${this.$route.query.courseId}/team/free`,
          inviteStudentsUrl:'',
          deleteMemberUrl:'',
          dissolveTeamUrl:'',
          applyUrl:'',
          leaveTeamUrl:''
        }
      },
      created(){
        this.getMyTeam(this.getMyTeamUrl,{})
        this.getNTStudents(this.getNTStudentsUrl,{})
      },
      computed:{
        NTStudentListBySearch:function () {

          if (this.select==false){
            return this.NTStudents
          }
          else {
            let selected = this.selected

            let list = []

            this.NTStudents.forEach(NTStudent=>{
              if (NTStudent.userName.startsWith(selected)||NTStudent.account.startWith(selected)){
                list.push(NTStudent)
              }
            })

            if (list==false){
              this.hasElement = false
            }
            else {
              this.hasElement = true
            }

            return list
          }
        }
      },
      methods:{
        getMyTeam:function(url,params){

          this.$http.get(url,{params})
            .then(res=>{

              let datas = res.data

              let teamLeader = {
                studentId:datas.leader.id,
                account:datas.leader.account,
                userName:datas.leader.name
              }

              this.isLeader = datas.isLeader


              let teamMembers = []

              datas.members.forEach(member=>{
                let teamMember = {
                  studentId:member.id,
                  account:member.account,
                  userName:member.name
                }
                teamMembers.push(teamMember)
              })

              let teamState = null

              switch (datas.teamInfo.teamStatus){
                case 0:
                  teamState='invalid';break
                case 1:
                  teamState='valid';break
                case 2:
                  teamState='apply';break
              }

              let team = {
                teamNumber:datas.teamInfo.teamSerials,
                teamName:datas.teamInfo.teamName,
                teamId:datas.teamInfo.id,
                teamState:'invalid',
                teamLeader:teamLeader,
                teamMembers:teamMembers,
                teamState:teamState
              }

              console.log(team)

              this.inviteStudentsUrl = `team/${team.teamId}/members`
              this.deleteMemberUrl =`team/${team.teamId}/member`
              this.dissolveTeamUrl=`team/${team.teamId}/allmember`
              this.applyUrl = `team/${team.teamId}/request`
              this.leaveTeamUrl = `team/${team.teamId}/myself`
              this.team = team

            })
            .catch((err)=>{
              console.log(err)
            })

        },
        getNTStudents(url,params){
          this.$http.get(url,{params})
            .then(res=>{
              let datas = res.data

              let NTStudents = []

              datas.forEach(data=>{
                let s ={
                  studentId:data.id,
                  account:data.account,
                  userName:data.name,
                  sharedCourse:'',
                  isSelect:false
                }
                NTStudents.push(s)
              })

              this.NTStudents=NTStudents
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        deleteMember(member){
            var params = {studentId: member.studentId}
            this.$http.delete(this.deleteMemberUrl, {data: params})
              .then(res => {
                this.$Message.success('删除成功！')
                this.getMyTeam(this.getMyTeamUrl, {})
                this.getNTStudents(this.getNTStudentsUrl, {})
              })
              .catch(err => {
                console.log(err)
                this.$Message.error(err.message)
              })
        },
        leaveTeam(){
          this.$http.delete(this.leaveTeamUrl)
            .then(res=>{
              this.$Message.success('退出成功！')
              this.$router.go(-1)
            })
            .catch(err=>{
              console.log(err)
              this.$Message.error(err.message)
            })
        },
        dissolveTeam(){
          this.$http.delete(this.dissolveTeamUrl)
            .then(res=>{
              this.$Message.success('解散成功！')
              this.$router.go(-1)
            })
            .catch(err=>{
              console.log(err)
              this.$Message.error(err.message)
            })
        },
        invite(){
            if (this.inviteStudentsId==false){
              this.$Message.error('未选择！')
            }
            else {
              this.$http.put(this.inviteStudentsUrl,this.inviteStudentsId)
                .then(res=>{
                  this.$Message.success('添加成功！')
                  this.getMyTeam(this.getMyTeamUrl,{})
                  this.getNTStudents(this.getNTStudentsUrl,{})
                  this.inviteStudentsId = []
                })
                .catch(err=>{
                  console.log(err)
                  this.$Message.error(err.message)
                })
            }
        },
        sendApply(){
          if (this.applyReason==false){
            this.$Message.error('申请理由不能为空')
          }
          else {
            this.$http.post(this.applyUrl,{reason:this.applyReason})
              .then(res=>{
                this.$Message.success('申请成功！')
                this.applyModal=false
                this.getMyTeam(this.getMyTeamUrl,{})
              })
              .catch(err=>{
                this.$Message.error('不能发送重复的请求，请等待老师处理！')
                console.log(err)
              })
          }
        },
        handleSelectionChange(NTStudent){
          NTStudent.isSelect = ! NTStudent.isSelect

          let inviteStudentsId =[]

          this.NTStudents.forEach(student=>{
            if (student.isSelect){
              inviteStudentsId.push(student.studentId)
            }
          })

          this.inviteStudentsId = inviteStudentsId

          console.log(inviteStudentsId)
        },
        hei: function () {
          let Height = window.innerHeight;
          document.getElementById("root").style.height = Height + "px";
        }
      },
      mounted(){
        this.hei();
      }
    }
</script>

<style scoped>
  .header{
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
    height: 80%;
    width: 100%;
  }
  .footer{
    height: 7%;
    text-align: center;
    width:100%;
    display: flex;
    justify-content: space-around;
  }

  .team-cell{
    height: 6vmax;
    display: flex;
    align-items: center;
    width:94%;
    font-size:2.4vmax;
    border-bottom: 1px #f2f6fc solid;
    background-color: white;
    margin-right: 3%;
    margin-left: 3%;
  }
  .team-cell-center{
    width: 50%;
    word-wrap: break-word;
    text-align: center;
  }
  .team-cell-front{
    margin-left: 5%;
    width: 20%;
    text-align: center;
    color: green;
  }
  .team-cell-end{
    width: 25%;
    text-align: center;
  }

  .nt-cell{
    height: 6vmax;
    display: flex;
    align-items: center;
    width:94%;
    font-size:2.4vmax;
    border-bottom: 1px #f2f6fc solid;
    background-color: white;
    margin-right: 3%;
    margin-left: 3%;
  }
  .nt-cell-center{
    width: 50%;
    word-wrap: break-word;
    text-align: center;
  }
  .nt-cell-front{
    margin-left: 0%;
    width: 25%;
    text-align: center;
    justify-content: center;
    color: green;
  }
  .nt-cell-end{
    width: 30%;
    text-align: center;
  }
  .icon{
    margin-top: 1vmax;
    left: 3.5vmax;
    width: 3.5vmax;
    height: 3.5vmax;
  }
  .button-three{
    display: inline-block;
    text-align: center;
    font-size: 2.9vmax;
    /*padding: 20px;*/
    height: 5.5vmax;
    width: 16vmax;
  }
  .button-exit{
    background: red;
    color: white;
    border: red 1px solid;
    display: inline-block;
    text-align: center;
    font-size: 2.9vmax;
    width: 29%;

    /*padding: 20px;*/
  }
  .table{
    background: #fff;
    font-size:2.4vmax;
    color:#000;
    width:94%;
    margin-left:3%;
  }
  .memberScroll{
    max-height: 20vmax;
    overflow-y:scroll
  }
  .memberScrollLarge{
    max-height: 54vmax;
    overflow-y:scroll
  }
  .scroll{
    /*max-height: 22%;*/
    max-height: 25vmax;
    overflow-y:scroll
  }
  .divider{
    color: green;
    font-size: 3vmax;
  }
  .form-control {
    width: 100%;
    padding: 1%;
    font-size: 3vmax;
    line-height: 1.42857;
    color: #555;
    vertical-align: middle;
    background-color: #FFF;
    background-image: none;
    border: 1px solid #CCC;
    border-radius: 4px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075) inset;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
  }
  textarea.form-control {
    height: auto;
  }
  .select-control{
    margin-left: 5%;
    width: 60%;
    padding: 1%;
    font-size: 2vmax;
    line-height: 1.42857;
    color: #555;
    vertical-align: middle;
    background-color: #FFF;
    background-image: none;
    border: 1px solid #CCC;
    border-radius: 4px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075) inset;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
  }
  input.form-control {
    height: auto;
  }
</style>
