/*
讨论课设置里 修改某一轮的讨论课设置
*/
<template>
  <div class="root">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">{{this.$route.params.round}}</span>
      <span style="visibility: hidden"><Icon type="ios-arrow-back" size="large"/></span>
    </div>
    <div class="main">
      <down-menu></down-menu>
      <div class="row0">
        <div class="header">讨论课：</div>
        <div v-for="item in seminarList" style="height: 20%;width: 100%;text-align: center;font-size: 150%;color:#000">{{item.name}}</div>
      </div>
      <div class="row1">
        <div class="header">成绩设置：</div>
        <div class="innerRow">
          <div class="col1">展示：</div>
          <div class="col2">
            <el-select class="select" v-model="show">
              <el-option v-for="item in scoreMethod" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <div class="innerRow">
          <div class="col1">提问：</div>
          <div class="col2">
            <el-select class="select" v-model="ask">
              <el-option v-for="item in scoreMethod" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <div class="innerRow">
          <div class="col1">报告：</div>
          <div class="col2">
            <el-select class="select" v-model="report">
              <el-option v-for="item in scoreMethod" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="row1">
        <div class="header">本轮讨论课报名次数：</div>
        <div class="innerRow" v-for="item in classList">
          <div class="col1">{{item.number}}</div>
          <div class="col2">
            <el-select class="select" v-model="item.times">
              <el-option v-for="item in numberRule" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="row2"><button class="button" @click="confirm">修改</button></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "seminarRoundSettings",
      data(){
          return{
            response1:undefined,
            response2:undefined,
            id:localStorage.getItem("token"),
            courseNumber:this.$route.params.courseNumber,
            courseName:this.$route.params.name,
            round:this.$route.params.round,
            roundId:this.$route.params.roundId,
            seminarList:[{
              name:''
            }],

            ask:'',
            report:'',
            show:'',

            classList:[{
              id:'',
              number:'',
              times:''
            }],

            scoreMethod:[{
              value:'0',
              label:'平均分',
            },
              {
                value:'1',
                label:'最高分',
              }],

            numberRule:[{
              value:0,
              label:0
            },
              {
                value:1,
                label:1
              },
              {
                value:2,
                label:2
              },
              {
                value:3,
                label:3
              },
              {
                value:4,
                label:4
              },
              {
                value:5,
                label:5
              },
              {
                value:6,
                label:6
              },
              {
                value:7,
                label:7
              },
              {
                value:8,
                label:8
              },
              {
                value:9,
                label:9
              },
              {
                value:10,
                label:10
              }]
          }
      },
      methods: {
        getAllSeminar: function () {
          let _this = this;
          this.$axios({
            url: '/course/' + _this.$data.courseNumber + '/seminars',
            method: 'get',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
          }).then(function (response) {
            for(var i=0;i<response.data.rounds.length;i++){
              if(response.data.rounds[i].roundId.toString()===_this.$data.roundId.toString()){
                _this.$data.seminarList.splice(0,_this.$data.seminarList.length);
                for(var j=0;j<response.data.rounds[i].seminarInfoVOS.length;j++) {
                  _this.$data.seminarList.push({
                    name: response.data.rounds[i].seminarInfoVOS[j].seminarName
                  })
                }
              }
            }
          })
        },
        back:function(){
          this.$router.go(-1);
        },
        confirm:function(){
          var askT,reportT,showT;
          if(this.$data.ask==='最高分') askT=1;
          else if(this.$data.ask==='平均分') askT=0;
          else askT=parseInt(this.$data.ask);

          if(this.$data.report==='最高分') reportT=1;
          else if(this.$data.report==='平均分') reportT=0;
          else reportT=parseInt(this.$data.report);

          if(this.$data.show==='最高分') showT=1;
          else if(this.$data.show==='平均分') showT=0;
          else showT=parseInt(this.$data.show);

          let _this=this;
          this.$axios({
            url:'/round/'+_this.$data.roundId,
            method: 'put',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
            data:{
              presentationScoreMethod:showT,
              reportScoreMethod:reportT,
              questionScoreMethod:askT
            }
          }).then(function(response){
            _this.$data.response1=response.data;
            console.log(response.data);
            _this.confirmTimes();
            _this.enter();

          }).catch(function(error){
            console.log(error)
          });
        },
        confirmTimes:function(){
          let _this=this;
          for(var i=0;i<_this.$data.classList.length;i++) {
            this.$axios({
              url: '/round/' + _this.$data.roundId + '/class/'+_this.$data.classList[i].id,
              method: 'put',
              headers: {
                'Authorization': 'Bearer ' + this.$data.id
              },
              data: {
                enrollNumber:_this.$data.classList[i].times
              }
            }).then(function (response) {
              _this.$data.response2=response.data;
              if(_this.$data.response1===true&&_this.$data.response2===true){
                _this.$message({
                  message:'修改成功!',
                  type:'success'
                })
              }
              else{
                _this.$message({
                  message:'出了一点意外哦',
                  type:'error'
                })
              }
            }).catch(function (error) {
              console.log(error)
            })
          }
        },
        getRoundSettings:function(){
          let _this=this;
          this.$axios({
            url:'/round/'+this.$data.roundId,
            method:'get',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
          }).then(function(response){
            if(response.data.questionScoreMethod===1) _this.$data.ask='最高分';
            else _this.$data.ask='平均分';
            if(response.data.presentationScoreMethod===1) _this.$data.show='最高分';
            else _this.$data.show='平均分';
            if(response.data.reportScoreMethod===1) _this.$data.report='最高分';
            else _this.$data.report='平均分';

            _this.$data.classList.splice(0,_this.$data.classList.length);
            for(var i=0;i<response.data.classes.length;i++){
              _this.$data.classList.push({
                id:response.data.classes[i].classId,
                number:response.data.classes[i].className,
                times:response.data.classes[i].enrollNumber
              })
            }
          })
        },
        enter:function(){
          this.$router.push({
            name:'teacherMobileSpecificSeminar',
            params:{
              name:this.$data.courseName,
              courseNumber:this.$data.courseNumber,
            }
          })
        }
      },
      mounted() {
          this.getAllSeminar();
          this.getRoundSettings();
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
  .row0{
    width: 100%;
    height: 20%;
  }
  .row1{
    width: 100%;
    height: 30%;
  }
  .row2{
    width:100%;
    height: 10%;
    position: fixed;
    bottom: 0;
  }
  .button{
    width: 100%;
    height: 100%;
    background: #96c864;
    border: none;
    color: #fff;
    font-size:150%;
  }
  .header{
    width: 80%;
    height: 20%;
    font-size: 130%;
    color:#000;
    margin-left: 5%;
    display: flex;
    align-items: center;
  }
  .innerRow{
    width: 100%;
    height: 26%;
    color:#000;
  }
  .col1{
    width: 20%;
    margin-left: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 130%;
    float: left;
  }
  .col2{
    width:65%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size:130%;
    float: left;
  }
  .select{
    width:60%;
    border: #96c864 1px solid;
    border-radius: 5px;
    margin-left: 10%;
    color:green;
    text-align: center;
    text-align-last: center;
  }
</style>
