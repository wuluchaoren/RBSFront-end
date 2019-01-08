<template>
  <div class="root">
    <div class="header">
      <student-mobile-header :title="title"></student-mobile-header>
    </div>
    <div class="main">
      <div>
        <div class="team-cell">
          <span class="team-cell-front">
            组名:
          </span>
          <input type="text" class="input-control" v-model="team.name" placeholder="">
        </div>

        <div class="team-cell" style="background-color: #F8F8F8">
          <span class="team-cell-front">
            组长:
          </span>
          <span class="team-cell-center" style="color: black">{{this.user.userName}}</span>
        </div>

        <div class="team-cell">
          <span class="team-cell-front">
                班级:
          </span>
          <span class="label" style="color: black;margin-left: 20%">{{this.$route.query.className}}</span>
          <!--<Select v-model="team.cClassId" style="width:200px;">-->
            <!--<Option v-for="cl in classes" :value="cl.classId" :key="cl.classId">{{ cl.className }}</Option>-->
          <!--</Select>-->
        </div>

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
    <div class="footer">
      <Button class="button" type="success" long @click="createTeam">创建</Button>
    </div>
  </div>
</template>

<script>
    import StudentMobileHeader from "../common/StudentMobileHeader";
    import ThreePartCellWithCheckBox from "../common/threePartCellWithCheckBox";
    export default {
        name: "StudentMobileCourseTeamCreating",
      components: {ThreePartCellWithCheckBox, StudentMobileHeader},
      data(){
          return {
            title: this.$route.query.courseName,
            spanBlack:'font-size:2.1vmax',
            spanGreen:'font-size:2.1vmax;color:green;',
            selected:'',
            hasElement:true,
            user:{
              userId:'',
              userName:''
            },
            team:{
              name:'',
              courseId:parseInt(this.$route.query.courseId),
              cClassId:parseInt(this.$route.query.classId)
            },
            classes:[],
            inviteStudentsId:[],
            NTStudents:[],
            getClassListUrl:`course/${this.$route.query.courseId}/class`,
            getUserIdUrl:'user/information',
            getNTStudentsUrl:`course/${this.$route.query.courseId}/team/free`,
            createTeamUrl:'team'
          }
        },
      created(){
        // this.getClassList(this.getClassListUrl,{})
        this.getUserId(this.getUserIdUrl,{})
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
                if (NTStudent.studentId!=this.user.userId){
                  list.push(NTStudent)
                }
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
        getClassList:function(url,params){
          this.$http.get(url,{params})
            .then(res=>{

              let classes = []

              let datas = res.data

              datas.forEach(d=>{
                let c = {
                  classId:d.id,
                  className:d.name
                }

                classes.push(c)
              })

              this.classes = classes

            })
        },
        getUserId:function(url,params){
          this.$http.get(url,{params})
            .then((res)=>{
              let datas = res.data

              let user ={
                userId:datas.id,
                userName:datas.name
              }
              this.user=user

            })
            .catch(err=>console.log(err))
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
          createTeam(){
            if (!this.team.name){
              this.$Message.error('小组名不能为空')
              return
            }

            if (!this.team.cClassId){
              this.$Message.error('请选择班级')
            }

            if (this.inviteStudentsId){


              let students = []

              this.inviteStudentsId.forEach(id=>{
                let student = {
                  id:id
                }
                students.push(student)
              })

              let team=this.team
              team.leaderId = this.user.userId
              team.students= students

              console.log(team)

              this.$http.post(this.createTeamUrl,team)
                .then(res=>{
                  this.$Message.success('创建成功!')
                  this.$router.go(-1)
                })
                .catch(err=>{
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
    height: 83%;
    width: 100%;
  }
  .footer{
    position: absolute;
    text-align: center;
    width:100%;
    height: 7%;
    bottom: 0px
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
  .scroll{
    max-height: 54vmax;
    overflow-y:scroll
  }
  .input-control{
    margin-left: 0%;
    width: 58%;
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
  .select-control{
    margin-left: 3%;
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
  .button{
    display: inline-block;
    background-color: #96C864;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 3.1vmax;
    /*padding: 20px;*/
    width: 100%;
  }
</style>
