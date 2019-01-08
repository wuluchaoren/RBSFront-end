<template>
  <div class="root">
    <div class="header">
      <student-mobile-header :title="title"></student-mobile-header>
    </div>
    <div class="main">

      <div class="scroll">

        <div  v-for="team in teams" :key="team.teamId">
          <div class="title" @click="getTeamInfo(getTeamInfoUrl,team,{})" >

            <img class="icon" src="../../../assets/book.png" />

            <span class="front" :class="{myTeam:team.teamId == myTeam.teamId}">
              {{team.teamNumber}}
            </span>

            <span class="center" :class="{myTeam:team.teamId == myTeam.teamId}">
               {{team.teamName}}
            </span>

            <img class="arrow" v-if="!team.vis" src="../../../assets/down-arrow.png" />
            <img class="arrow" v-else src="../../../assets/up-arrow.png">
          </div>

          <div class="content" v-if="team.vis">

            <div class="team-cell" v-if="team.teamLeader">
              <span class="team-cell-front">组长</span>
              <span class="team-cell-center">{{team.teamLeader.account}}</span>
              <span class="team-cell-end">{{team.teamLeader.userName}}</span>
            </div>

            <div class="team-cell" v-for="teamMember in team.teamMembers">
              <span class="team-cell-front">组员</span>
              <span class="team-cell-center">{{teamMember.account}}</span>
              <span class="team-cell-end">{{teamMember.userName}}</span>
            </div>
          </div>
        </div>

        <div>
          <div class="title" @click="showNT=!showNT" >

            <img class="icon" src="../../../assets/book.png" />


            <span class="center" style="width: 85%;text-align: center">
               未组队学生
            </span>

            <img class="arrow" v-if="!showNT" src="../../../assets/down-arrow.png" />
            <img class="arrow" v-else src="../../../assets/up-arrow.png">
          </div>

          <div class="content" :class="{hidden:true,show:showNT}">
            <div class="cell" v-for="NTStudent in NTStudents">
              <span class="cell-front">{{NTStudent.account}}</span>
              <span class="cell-center">{{NTStudent.userName}}</span>
            </div>
          </div>
        </div>
      </div>

      <!--&lt;!&ndash;todo 测试用&ndash;&gt;-->


      <!--<div v-if="isAfterDDL&&isMainCourse" class="footer">-->
        <!--<Button class="button" v-if="!myTeam" type="success" long @click="enterTeamCreating" style="background-color:#96c864">创建小组</Button>-->
        <!--<Button class="button" v-else type="success" long @click="enterMyTeam" style="background-color:#96c864">我的小组({{myTeam.teamNumber}})</Button>-->
      <!--</div>-->
      <!--<div v-else-if="!isAfterDDL" class="footer">-->
        <!--<Button class="button-disable" v-if="!myTeam" type="success" long  disabled>创建小组（组队期限已过）</Button>-->
        <!--<Button class="button-disable" v-else type="success" long disabled>我的小组({{myTeam.teamNumber}})（组队期限已过）</Button>-->
      <!--</div>-->
  </div>
    <div v-if="!isMainCourse" class="footer">
      <Button class="button-disable" v-if="!myTeam" type="success" long  disabled>未组队(非主课程)</Button>
      <Button class="button-disable" v-else type="success" long disabled>我的小组({{myTeam.teamNumber}})（非主课程）</Button>
    </div>
    <div v-else class="footer">
      <Button class="button" v-if="!myTeam" type="success" long @click="enterTeamCreating" style="background-color:#96c864">创建小组</Button>
      <Button class="button" v-else type="success" long @click="enterMyTeam" style="background-color:#96c864">我的小组({{myTeam.teamNumber}})</Button>
    </div>
  </div>
</template>

<script>
    import StudentMobileHeader from "../common/StudentMobileHeader";
    import ThreePartCell from "../common/threePartCell";

    Date.prototype.Format = function(fmt)
    { //author: meizz
      var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
      };
      if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
      for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      return fmt;
    }

    export default {
        name: "StudentMobileCourseTeam",
      components: {ThreePartCell, StudentMobileHeader},
      data(){
          return{
            title:this.$route.query.courseName+this.$route.query.className,
            teams:[],
            NTStudents:[{
              account:'',
              userName:'',
              sharedCourse:''
            }],
            myTeam:'',
            isAfterDDL:false,
            getCourseTeamDDLUrl:`/course/${this.$route.query.courseId}`,
            getMyTeamUrl:`course/${this.$route.query.courseId}/team/mine`,
            getAllTeamInCourseUrl:`course/${this.$route.query.courseId}/team`,
            getTeamInfoUrl:'team/',
            getNTStudentsUrl:`course/${this.$route.query.courseId}/team/free`,
            showNT:false,
            isMainCourse:false,
          }
      },
      created(){
        this.getCourseTeamDDL(this.getCourseTeamDDLUrl,{})
        this.getMyTeam(this.getMyTeamUrl,{})
        this.getAllTeamInCourse(this.getAllTeamInCourseUrl,{})
        this.getNTStudents(this.getNTStudentsUrl,{})
      },
      methods: {
        daysBetween: function (DateOne, DateTwo) {
          var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
          var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
          var OneYear = DateOne.substring(0, DateOne.indexOf('-'));

          var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
          var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
          var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));

          var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
          return Math.abs(cha);
        },
        getCourseTeamDDL: function (url, params) {

          let nowTime = new Date().Format("yyyy/MM/dd hh:mm:ss")

          this.$http.get(url, params)
            .then(res => {
              let teamEndTime = res.data.teamEndTime

              let teamMainCourseId = res.data.teamMainCourseId

              if (teamMainCourseId === 0) {
                this.isMainCourse = true
              }
              else {
                this.isMainCourse = false
              }

              if ((Date.parse(teamEndTime) - Date.parse(nowTime)) < 0) {
                this.isAfterDDL = false
              }
              else {
                this.isAfterDDL = true
              }

            })
        },
        getMyTeam: function (url, params) {
          this.$http.get(url, {params})
            .then((res) => {

              let datas = res.data

              let myTeam = {
                teamId: datas.teamInfo.id,
                teamName: datas.teamInfo.teamName,
                teamNumber: datas.teamInfo.teamSerials,
              }

              this.myTeam = myTeam

            })
            .catch(err => {
              if (err.data = 'None Data') {
                this.myTeam = ''
              }
            })
        },
        getAllTeamInCourse: async function (url, params) {
          this.$http.get(url, {params})
            .then((res) => {

              let datas = res.data

              let teams = []

              datas.forEach(async team => {

                let teamId = await team.id

                // let teamInfo=await this.getTeamInfo(this.getTeamInfoUrl+teamId,{})

                let t = {
                  teamNumber: team.teamSerials,
                  teamName: team.teamName,
                  teamId: teamId,
                  // teamState: teamInfo.teamState,
                  // teamLeader: teamInfo.teamLeader,
                  // teamMembers:teamInfo.teamMembers,
                  vis: false
                }

                teams.push(t)

              })


              this.teams = teams
            })
            .catch((err) => {
              console.log(err)
            })
        },
        getTeamInfo: async function (url, team, params) {
          if (!team.teamId) {
            return
          }
          else if (team.vis) {
            team.vis = false
          }
          else if (team.teamMembers || team.teamLeader) {
            team.vis = true
          }
          else {
            // let info = null
            await this.$http.get(url + team.teamId, {params})
              .then(res => {

                let datas = res.data

                let teamLeader = {
                  account: datas.leader.account,
                  userName: datas.leader.name
                }

                let teamMembers = []

                datas.members.forEach(member => {
                  let teamMember = {
                    account: member.account,
                    userName: member.name
                  }
                  teamMembers.push(teamMember)
                })

                let teamState = null

                switch (datas.teamInfo.teamStatus) {
                  case 0:
                    teamState = 'invalid';
                    break
                  case 1:
                    teamState = 'valid';
                    break
                }

                // this.teams.forEach(team=>{
                //   if (team.teamId==id){
                //     team.teamState= teamState
                //     team.teamLeader = teamLeader
                //     team.teamMembers = teamMembers
                //   }
                // })

                team.teamState = teamState
                team.teamLeader = teamLeader
                team.teamMembers = teamMembers

              })
              .catch((err) => {
                console.log(err)
              })

            team.vis = true
          }


          // return info

        },
        getNTStudents(url, params) {
          this.$http.get(url, {params})
            .then(res => {
              let datas = res.data

              let NTStudents = []

              datas.forEach(data => {
                let s = {
                  account: data.account,
                  userName: data.name,
                  sharedCourse: ''
                }
                NTStudents.push(s)
              })

              this.NTStudents = NTStudents

              this.showNT = false
            })
            .catch((err) => {
              console.log(err)
            })
        },
        enterTeamCreating: function () {
          this.$router.push({
            name: 'StudentMobileCourseTeamCreating',
            query: {
              courseId: this.$route.query.courseId,
              courseName: this.$route.query.courseName,
              classId: this.$route.query.classId,
              className: this.$route.query.className
            }
          })
        },
        enterMyTeam: function () {
          this.$router.push({
            name: 'StudentMobileCourseMyTeam',
            query: {
              courseId: this.$route.query.courseId,
              courseName: this.$route.query.courseName,
              classId: this.$route.query.classId,
              className: this.$route.query.className
            }
          })
        },
      },
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
    height: 84%;
    width: 100%;
  }
  .footer{
    text-align: center;
    width:100%;
    height: 7%;
    bottom: 0px
  }
  .title{
    height: 6vmax;
    display: flex;
    align-items: center;
    width:96%;
    font-size:3vmax;
    border-bottom: 1px #f2f6fc solid;
    background-color: white;
    margin-right: 2%;
    margin-left: 2%;
  }
  .center{
    width: 50%;
    word-wrap: break-word;
  }
  .front{
    margin-left: 5%;
    width: 30%;
  }
  .cell{
    height: 6vmax;
    display: flex;
    align-items: center;
    width:88%;
    font-size:2.4vmax;
    border-bottom: 1px #f2f6fc solid;
    background-color: white;
    margin-right: 6%;
    margin-left: 6%;
  }
  .cell-center{
    width: 50%;
    word-wrap: break-word;
    text-align: center;
  }
  .cell-front{
    margin-left: 5%;
    width: 50%;
    text-align: center;
  }
  .team-cell{
    height: 6vmax;
    display: flex;
    align-items: center;
    width:88%;
    font-size:2.4vmax;
    border-bottom: 1px #f2f6fc solid;
    background-color: white;
    margin-right: 6%;
    margin-left: 6%;
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
    width: 30%;
    text-align: center;
  }
  .button{
    display: inline-block;
    background-color: #96C864;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 3.1vmax;
    /*padding: 20px;*/
    width: 100%;
    margin-top: 2%;
  }
  .button-disable{
    display: inline-block;
    text-align: center;
    font-size: 3.1vmax;
    /*padding: 20px;*/
    width: 100%;
    margin-top: 2%;
  }
  .scroll{
    max-height: 72vmax;
    overflow-y:scroll
  }
  .icon{
    margin-left: 2%;
    left: 3vmax;
    width: 3vmax;
    height: 3vmax;
  }

  .arrow{
    right: 3vmax;
    width: 1.5vmax;
    height: 1.5vmax;
  }
  .hidden{
    display: none;
  }
  .show{
    display: block;
  }
</style>
