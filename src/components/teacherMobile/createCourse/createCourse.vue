<template>
  <div class="root" @click="closeMenu" id="root">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">新建课程</span>
      <span style="visibility: hidden;"><Icon type="ios-arrow-back" size="large"/></span>
    </div>
    <div class="main">
      <down-menu></down-menu>
      <div class="base">
        <div class="name"><input class="input1" placeholder="课程名称" v-model="courseName" type="text"></input></div>
        <div class="intro"><textarea class="input2" placeholder="课程要求" v-model="courseIntro"></textarea></div>
      </div>
      <div class="rule">
        <div class="text">成绩计算规则：</div>
        <div class="contain">
          <div class="row">
            <div style="float:left;color:#000;font-size:150%;width: 30%;margin-left: 20%">课堂展示</div>
            <div style="float:left;width: 50%;height: 100%;display: flex;align-items: center;"><input class="input-rule" placeholder="x%" v-model="showScore"></input></div>
          </div>
          <div class="row">
            <div style="float:left;color:#000;font-size:150%;width: 30%;margin-left: 20%">课堂提问</div>
            <div style="float:left;width: 50%;height: 100%;display: flex;align-items: center;"><input class="input-rule" placeholder="x%" v-model="askScore"></input></div>
          </div>
          <div class="row">
            <div style="float:left;color:#000;font-size:150%;width: 30%;margin-left: 20%">书面报告</div>
            <div style="float:left;width: 50%;height: 100%;display: flex;align-items: center;"><input class="input-rule" placeholder="x%" v-model="reportScore"></input></div>
          </div>
        </div>
      </div>
      <div class="groupRule">
        <div class="row1">
          <div style="font-size:130%;color:#000;height: 100%;width: 40%;display: flex;align-items: center;margin-left: 2%;">小组人数：</div>
          <div style="width: 56%;height: 100%;display: flex;align-items: center">
            <div style="width: 25%;height:100%;font-size:150%;color:#259B24;display: flex;align-items: center;justify-content: center">最少</div>
            <div style="width: 50%;height:100%;display: flex;align-items: center"><Slider v-model="value1" range style="width: 90%;margin-left: 5%" :step="1" :max="10"></Slider></div>
            <div style="width: 25%;height:100%;font-size:150%;color:#259B24;display: flex;align-items: center;justify-content: center">最多</div>
          </div>
        </div>
        <div class="row1">
          <div style="font-size:130%;color:#000;height: 100%;width: 40%;display: flex;align-items: center;margin-left: 2%;">组队开始时间：</div>
          <div style="width: 56%;height: 100%;display: flex;align-items: center;"><DatePicker type="datetime" placeholder="选择组队开始时间" style="width: 90%;border: 1px solid #259B24;border-radius: 5px" v-model="startTime"></DatePicker></div>
        </div>
        <div class="row1">
          <div style="font-size:130%;color:#000;height: 100%;width: 40%;display: flex;align-items: center;margin-left: 2%;">组队截止时间：</div>
          <div style="width: 56%;height: 100%;display: flex;align-items: center"><DatePicker type="datetime" placeholder="选择组队截止时间" style="width: 90%;border: 1px solid #259B24;border-radius: 5px" v-model="endTime"></DatePicker></div>
        </div>
        <div style="height: 40%;width: 100%;display: flex;align-items: center;">
          <div style="font-size:130%;color:#000;height: 100%;width: 40%;display: flex;align-items: center;margin-left: 2%;">选修人数要求：</div>
          <div style="width: 56%;height: 100%;color:grey;display: flex;align-items: center;font-size:200%" id="sex">
            <span style="width:80%;height: 100%;display: none" id="mySex">
              <div style="height: 35%;width: 100%;font-size:60%">
                <div style="float:left;width: 20%;height:100%;font-size:70%;display: flex;align-items: center;">.NET：</div>
                <div style="width: 10%;height:100%;font-size:80%;color:#259B24;display: flex;align-items: center;justify-content: center;float: left">low</div>
                <div style="width: 50%;height:100%;display: flex;align-items: center;float: left;margin-left: 2%"><Slider v-model="value2" range style="width: 90%;margin-left: 5%" :step="1" :max="6"></Slider></div>
                <div style="width: 15%;height:100%;font-size:80%;color:#259B24;display: flex;align-items: center;justify-content: center;float: left">high</div>
              </div>
              <div style="height: 35%;width: 100%;font-size:60%">
                <div style="float:left;width: 20%;height:100%;font-size:70%;display: flex;align-items: center;">J2EE：</div>
                <div style="width: 10%;height:100%;font-size:80%;color:#259B24;display: flex;align-items: center;justify-content: center;float: left">low</div>
                <div style="width: 50%;height:100%;display: flex;align-items: center;float: left;margin-left: 2%"><Slider v-model="value3" range style="width: 90%;margin-left: 5%" :step="1" :max="6"></Slider></div>
                <div style="width: 15%;height:100%;font-size:80%;color:#259B24;display: flex;align-items: center;justify-content: center;float: left">high</div>
              </div>
               <div style="height: 30%;width: 100%;font-size:60%;">
                 <Select v-model="select000" style="width: 80%;height: 80%;margin-left: 10%;border:1px solid green;border-radius: 5px">
                   <Option :value="1">均满足</Option>
                   <Option :value="0">满足其一</Option>
                 </Select>
              </div>
            </span>
            <span style="position: absolute;right:10%" @click="bySex">✔</span>
          </div>
        </div>
      </div>
      <div class="conflict">
        <div class="text">冲突课程：</div>
        <div class="contain">
          <div class="conflict-item1" id="conflict1">
            <Select v-model="select1" class="select-conflict1">
              <Option v-for="item in conflictList" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
            <Select v-model="select2" class="select-conflict2">
              <Option v-for="item in conflictList" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </div>

          <div class="conflict-item2" id="conflict2">
            <Select v-model="select3" class="select-conflict1">
              <Option v-for="item in conflictList" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
            <Select v-model="select4" class="select-conflict2">
              <Option v-for="item in conflictList" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </div>

          <div class="conflict-item3" id="conflict3">
            <Select v-model="select5" class="select-conflict1">
              <Option v-for="item in conflictList" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
            <Select v-model="select6" class="select-conflict2">
              <Option v-for="item in conflictList" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </div>

          <div class="new-item">
            <Button style="width:100%;font-size: 130%" type="error" ghost @click="addConflict">新增对象</Button>
          </div>
        </div>
      </div>
      <div class="footer">
        <button class="button" @click="createCourse">发布</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "loginAndActivateAndHome",
      data() {
        return {
          id:localStorage.getItem("token"),
          conflictNumber: 1,
          courseName: '',
          courseIntro: '',
          startTime: '',
          endTime: '',
          showScore:'',
          askScore:'',
          reportScore:'',
          value1:[0,10],
          value2: [0, 6],
          value3: [0, 6],
          conflictList: [],
          select1:'',
          select2:'',
          select3:'',
          select4:'',
          select5:'',
          select6:'',
          select000:'',
        }
      },
      methods: {
        closeMenu: function () {
          const menu = document.getElementById("show");
          if (document.getElementById("show").style.display === "block") {
            if (!menu.contains(event.target)) document.getElementById("show").style.display = "none";
          }
        },
        hei:function() {
          let Height = window.innerHeight;
          document.getElementById("root").style.height = 2*Height + "px";
        },
        addConflict:function(){
          if(this.$data.conflictNumber===3){
            this.$message({
              type:'error',
              message:'太多啦!'
            })
          }
          else{
            document.getElementById("conflict"+(this.$data.conflictNumber+1).toString()).style.visibility="visible";
            this.$data.conflictNumber++;
          }
        },
        bySex:function(){
          if(document.getElementById("sex").style.color==="green"){
            document.getElementById("sex").style.color="gray";
            document.getElementById("mySex").style.display="none";
            this.$data.isBySex='0';
          }
          else{
            document.getElementById("sex").style.color="green";
            document.getElementById("mySex").style.display="block";
            this.$data.isBySex='1';
          }
        },
        createCourse:function() {
          let _this = this;
          const member = {
            minMember: _this.$data.value1[0],
            maxMember: _this.$data.value1[1],
          };

          const conflict = [[],[],[]];
          if(_this.$data.conflictNumber===3){
            if(_this.$data.select6!==''){
              conflict[0][0]=_this.$data.select1;
              conflict[0][1]=_this.$data.select2;
              conflict[1][0]=_this.$data.select3;
              conflict[1][1]=_this.$data.select4;
              conflict[2][0]=_this.$data.select5;
              conflict[2][1]=_this.$data.select6;
            }else if(_this.$data.select5!==''){
              conflict[0][0]=_this.$data.select1;
              conflict[0][1]=_this.$data.select2;
              conflict[1][0]=_this.$data.select3;
              conflict[1][1]=_this.$data.select4;
              conflict[2][0]=_this.$data.select5;
            }
          }else if(_this.$data.conflictNumber===2){
            if(_this.$data.select4!==''){
              conflict[0][0]=_this.$data.select1;
              conflict[0][1]=_this.$data.select2;
              conflict[1][0]=_this.$data.select3;
              conflict[1][1]=_this.$data.select4;
            }else if(_this.$data.select3!==''){
              conflict[0][0]=_this.$data.select1;
              conflict[0][1]=_this.$data.select2;
              conflict[1][0]=_this.$data.select3;
            }
          }else if(_this.$data.conflictNumber===1){
            if(_this.$data.select2!==''){
              conflict[0][0]=_this.$data.select1;
              conflict[0][1]=_this.$data.select2;
            }else if(_this.$data.select1!==''){
              conflict[0][0]=_this.$data.select1;
            }
          }

          const conflict1=conflict.slice(0,_this.$data.conflictNumber);

          const courseMember=[{
            courseId:20,
            minMember:_this.$data.value2[0],
            maxMember:_this.$data.value2[1],
          },
            {
              courseId:17,
              minMember:_this.$data.value3[0],
              maxMember:_this.$data.value3[1],
            }];

          this.$axios({
            method: 'post',
            url: '/course',
            data:{
              name:_this.$data.courseName,
              intro:_this.$data.courseIntro,
              presentationPercentage:_this.$data.showScore,
              questionPercentage:_this.$data.askScore,
              reportPercentage:_this.$data.reportScore,
              teamStartTime:_this.myFormatDate(_this.$data.startTime),
              teamEndTime:_this.myFormatDate(_this.$data.endTime),
              memberLimitStrategy:member,
              courseMemberLimitFlag:_this.$data.select000,
              courseMemberLimitStrategies:courseMember,
              conflictCourses:conflict1
            },
            headers: {
              'Authorization': 'Bearer '+_this.$data.id
            },
          }).then(function(response){
            if(response.data===true) {
              _this.$message({
                message: '新建成功',
                type: 'success',
              });
              _this.enter(localStorage.getItem("token"));
            }
          }).catch(function(error){
            _this.$message({
              message:error.data,
              type:'warning',
            })
          })
        },
        enter:function(id){
          this.$router.push({
            name:'teacherMobileCourse',
            params:{id}
          })
        },
        back:function(){
          this.$router.go(-1);
        },
        checkTime:function(i){
          if (i<10){
            const x="0" + i
            return x;
          }
          return i;
        },
        myFormatDate:function(abc){
          const date = abc.toString();
          var date1=new Date(date);
          return date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate() + ' ' + this.checkTime(date1.getHours()) + ':' + this.checkTime(date1.getMinutes()) + ':' + this.checkTime(date1.getSeconds());
        },
        getAllCourse:function(){
          let _this=this;
          this.$axios({
            method: 'get',
            url: '/course/all',
            headers: {
              'Authorization': 'Bearer '+this.$data.id
            },
          }).then(function(response){
            _this.$data.conflictList=response.data
          }).catch(function(error){
          })
        }
      },
      mounted() {
        this.hei();
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
    height: 4%;
    border:1px solid transparent;
    font-family:思源黑体;
    font-size: 150%;
    color:#000;
    letter-spacing:1px;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
  }
  .root {
    width: 100%;
    background: #fff;
  }
  .main{
    /*margin-top: 8%;*/
    height: 96%;
    width: 100%;
    border-top: 1px solid #AAAAAA;
  }
  .base{
    height: 21%;
    background: #fff;
    margin-left: 2%;
    width: 96%;
    border-bottom: solid 1px #AAAAAA;
  }
  .name{
    height: 20%;
    width: 100%;
    border-bottom: solid 1px #AAAAAA;
  }
  .intro{
    height: 79%;
    width: 100%;
  }
  .rule{
    height: 19%;
    background: #fff;
    margin-left: 2%;
    width: 96%;
    border-bottom: solid 1px #AAAAAA;
  }
  .text{
    font-size:150%;
    color:#000;
    height: 15%;
    width: 40%;
    display: flex;
    align-items: flex-end;
    margin-left: 2%;
  }
  .contain{
    height:85%;
    width: 100%;
  }
  .row{
    height: 33%;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .input-rule{
    height: 40%;
    width: 70%;
    border: 1px #f3f3f3 solid;
    font-size: 120%;
    padding:0 7% 0 7%;
  }
  .input-rule::-webkit-input-placeholder, textarea::-webkit-input-placeholder { /* WebKit*/
    color:#CCCCCC;
    font-size:150%;
  }
  .groupRule{
    height: 25%;
    background: #fff;
    margin-left: 2%;
    width: 96%;
    border-bottom: solid 1px #AAAAAA;
  }
  .row1{
    height: 20%;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .conflict{
    height: 25%;
    background: #fff;
    margin-left: 2%;
    width: 96%;
    border-bottom: solid 1px #AAAAAA;
  }
  .conflict-item1{
    height: 20%;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .conflict-item2{
    height: 20%;
    width: 100%;
    display: flex;
    align-items: center;
    visibility: hidden;
    border-top:1px solid #eeeeee ;
  }
  .conflict-item3{
    height: 20%;
    width: 100%;
    display: flex;
    align-items: center;
    visibility: hidden;
    border-top:1px solid #eeeeee ;
  }
  .new-item{
    height: 20%;
    width: 25%;
    margin-left: 65%;
    display: flex;
    align-items: center;
  }
  .select-conflict1{
    height: 60%;
    margin-left: 5%;
    width: 40%;
    border: 2px solid #259B24;
    border-radius: 5px;
  }
  .select-conflict2{
    height: 60%;
    margin-left: 5%;
    width: 40%;
    border: 2px solid #259B24;
    border-radius: 5px;
  }
  .footer{
    height: 10%;
    margin-left: 2%;
    width: 96%;
  }
  .button {
    display: inline-block;
    background-color: #96c864;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 130%;
    /*padding: 20px;*/
    height: 40%;
    width: 100%;
    margin-top: 10%;
  }
  .input1{
    height: 100%;
    width: 100%;
    border: transparent;
    padding: 0 3% 0 3%;
    font-size:150%;
  }
  .input2{
    height: 100%;
    width: 100%;
    border: transparent;
    padding: 3% 3% 3% 3%;
    font-size: 150%;
  }
  .input1::-webkit-input-placeholder, textarea::-webkit-input-placeholder { /* WebKit*/
    color:#CCCCCC;
    font-size:100%;
  }
  .input2::-webkit-input-placeholder, textarea::-webkit-input-placeholder { /* WebKit*/
    color:#CCCCCC;
    font-size:100%;
  }
</style>
