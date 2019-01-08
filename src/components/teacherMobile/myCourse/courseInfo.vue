<template>
  <div class="root" @click="closeMenu">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">{{this.$route.params.name}}</span>
      <OCMenu></OCMenu>
    </div>
    <div class="main">
      <down-menu></down-menu>
      <div class="contain">
        <div class="header">课程要求</div>
        <div class="requirement">
          <div class="scoreRule">
            <div style="width: 35%;height: 100%;font-size: 2.2vmax;margin-left: 5%;float:left">成绩计算规则：</div>
            <div style="width: 60%;height: 100%;float:left;text-align:center;font-size: 2vmax;">
              <div style="height: 33%;display:flex;align-items:center;justify-content:center;">课堂展示{{  showScore}}</div>
              <div style="height: 34%;display:flex;align-items:center;justify-content:center;">课堂提问{{  askScore}}</div>
              <div style="height: 33%;display:flex;align-items:center;justify-content:center;">书面报告{{  reportScore}}</div>
            </div>
          </div>
          <div class="row">
            <div style="display:flex;align-items:center;width: 35%;height: 100%;font-size: 2.2vmax;margin-left: 5%;float:left">小组人数：</div>
            <div style="display:flex;align-items:center;justify-content:center;width: 60%;height: 100%;float:left;font-size: 2vmax;">{{peopleNum}}</div>
          </div>
          <div class="row">
            <div style="display:flex;align-items:center;width: 35%;height: 100%;font-size: 2.2vmax;margin-left: 5%;float:left">组队开始时间：</div>
            <div style="display:flex;align-items:center;justify-content:center;width: 60%;height: 100%;float:left;font-size: 2vmax;">{{start}}</div>
          </div>
          <div class="row">
            <div style="display:flex;align-items:center;width: 35%;height: 100%;font-size: 2.2vmax;margin-left: 5%;float:left">组队截止时间：</div>
            <div style="display:flex;align-items:center;justify-content:center;width: 60%;height: 100%;float:left;font-size: 2vmax;">{{end}}</div>
          </div>
          <div class="row1">
            <div style="display:flex;align-items:center;width: 35%;height: 100%;font-size: 2.2vmax;margin-left: 5%;float:left">组内选修课人数：<br/>{{this.$data.type===false?'（满足其一）':'（均满足）'}}</div>
            <div v-if="courseMember[0].name===''" style="width: 60%;height: 100%;float:left;font-size: 2vmax;display: flex;align-items: center;justify-content: center;">无</div>
            <div v-else style="width: 60%;height: 50%;float:left;font-size: 2vmax;" v-for="item in courseMember">
              <div style="height: 50%;width: 100%;">
                <div style="width: 100%;height: 100%;float: left;text-align: center">{{item.name}}:  {{item.min}}~{{item.max}}人</div>
              </div>
            </div>
          </div>
          <div class="conflict">
            <div style="display:flex;width: 35%;height: 30%;font-size: 2.2vmax;margin-left: 5%;align-items: center">冲突课程：</div>
            <div style="width: 100%;height: 70%">
              <div style="font-size: 2vmax;padding-bottom: 1%;height: 30%;float:left;margin-left: 10%;width: 10%;border: 1px solid #dddddd;" v-for="c in conflict">
                <div style="width: 40%;height: 50%;border-bottom: 1px solid #f2f2f2" v-for="item in c">
                  {{item.name}}
              </div>
              </div>
            </div>
          </div>
          <div id="delete" class="mainCourse">
            <Button type="error" class="deleteButton" ghost @click="deleteCourse(number,name)">删除该课程</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "courseInfo",
      data() {
        return {
          courseNumber:this.$route.params.courseNumber,
          id:localStorage.getItem("token"),
          name:this.$route.params.name,
          peopleNum:'',
          showScore:'',
          askScore:'',
          reportScore:'',
          start:'',
          end:'',
          sex:'男：2-4  女：2-4',
          constellation:'无',
          conflict:'',
          courseMember:[{
            name:'',
            min:'',
            max:''
          }],
          //是否是主课程 1表示非从课程 0表示从课程
          isMainCourse:'',
          type:'',
        }
      },
      methods: {
        closeMenu: function () {
          const menu = document.getElementById("show");
          if (document.getElementById("show").style.display === "block") {
            if (!menu.contains(event.target)) document.getElementById("show").style.display = "none";
          }
        },
        back:function(){
          this.$router.go(-1);
        },
        deleteCourse:function(number,name){
          let _this=this;
          if(_this.$data.isMainCourse!=='1'){
            _this.$message({
              message:'该课程是从课程，您不能删除',
              type:'error',
            })
          }
          else {
            this.$axios({
              url:'/course/'+_this.$data.courseNumber,
              method:'delete',
              headers:{
                'Authorization': 'Bearer ' + this.$data.id
              }
            }).then(function(response){
              if(response.data===true){
                _this.$message({
                  message:'删除成功!',
                  type:'success'
                })
              }
              else{
                _this.$message({
                  message:'出了一点问题哦!',
                  type:'error'
                })
              }
            }).catch(function(error){
              console.log(error);
            })
          }
        },
        getCourseInfo:function(){
          let _this = this;
          this.$axios({
            method: 'get',
            url: '/course/'+this.$data.courseNumber,
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
          }).then(function (response) {
            _this.$data.askScore=' '+response.data.questionPercentage+'%';
            _this.$data.showScore=' '+response.data.presentationPercentage+'%';
            _this.$data.reportScore=' '+response.data.reportPercentage+'%';
            _this.$data.start=response.data.teamStartTime;
            _this.$data.end=response.data.teamEndTime;
            _this.$data.peopleNum=response.data.memberLimitStrategy.minMember+"~"+response.data.memberLimitStrategy.maxMember;
            _this.$data.type=response.data.courseMemberLimitStrategyStyle;
            _this.$data.courseMember=response.data.courseMemberLimitStrategyVOS;
            for(var i=0;i<response.data.courseMemberLimitStrategyVOS.length;i++){
              _this.$data.courseMember[i].name= response.data.courseMemberLimitStrategyVOS[i].courseName;
              _this.$data.courseMember[i].min=response.data.courseMemberLimitStrategyVOS[i].minMember;
              _this.$data.courseMember[i].max=response.data.courseMemberLimitStrategyVOS[i].maxMember;
            }

            _this.$data.conflict=response.data.conflictCourses;

            if(response.data.shareSeminar===false&&response.data.shareTeam===false){
              _this.$data.isMainCourse='1';
            }
          }).catch(function (error) {
            console.log(error);
          })
        },
      },
      created() {
        this.getCourseInfo();
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
  .contain{
    height: 100%;
    width: 96%;
    margin-left: 2%;
    background: #fff;
    position: relative;
  }
  .header{
    height: 8%;
    border-bottom: 1px solid #bcbec2;
    width: 98%;
    margin-left: 1%;
    display:flex;
    align-items: center;
    justify-content: center;
    color:black;
    font-size:2.5vmax;
    margin-bottom: 2%;
  }
  .requirement{
    height: 91%;
    width: 98%;
    margin-left: 1%;
    color:black;
    font-size:1.9vmax;
  }
  .scoreRule{
    height: 15%;
    width:100%;
  }
  .row{
    height: 10%;
    width: 100%;
  }
  .row1{
    height: 20%;
    width: 100%;
  }
  .conflict{
    border-top: 1px solid #aaaaaa;
    height: 35%;
    width: 100%;
  }
  .mainCourse{
    height: 8%;
    width:98%;
    position: fixed;
    bottom:0;
    display: block;
  }
  .deleteButton{
    margin-right: 3%;
    float:right;
    font-size:2vmax;
    width: 40%;
  }
</style>
