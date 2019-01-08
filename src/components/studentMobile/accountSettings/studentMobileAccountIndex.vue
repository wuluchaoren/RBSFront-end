<template>
  <div class="root">
    <div class="header">
      <student-mobile-header title="我"></student-mobile-header>
    </div>
    <div class="main">
      <div class="man"><img style="width:80%" src="../../../assets/man.png"></div>
      <div class="entry">
        <div class="entry-div" @click="enterSetting()">
          <div>
            <img style="width:50%" src="../../../assets/personal.png"/>
          </div>
          <div class="entry-font-div">账户与设置</div>
        </div>
        <div class="entry-div" @click="enterCourse()">
          <div>
            <img style="width:50%" src="../../../assets/seminar.png"/>
          </div>
          <div class="entry-font-div">我的课程</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import StudentMobileHeader from "../common/StudentMobileHeader";
    export default {
        name: "studentMobileAccountIndex",
      components: {StudentMobileHeader},
      data() {
        return {
          getUserUrl:'/user/information'
        }
      },
      created(){
        this.getUser(this.getUserUrl,{})
      },
      methods:{
        getUser:function(url,params){
          this.$http.get(this.getUserUrl,{params})
            .then((res)=>{

              let datas = res.data

              localStorage.setItem('studentId',datas.id)

            })
            .catch(err=>
            {

            })
        },
        enterCourse:function(){
          this.$router.push({
            name:'StudentMobileCourseIndex',
          })
        },
        enterSetting:function(){
          this.$router.push({
            name:'StudentMobileAccountSettings',
          })
        }
      }
    }
</script>

<style scoped>
  .root {
    height: 100%;
    width: 100%;
    background: #fff;
  }
  .header{
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
  .main{
    /*margin-top: 8%;*/
    height: 92%;
    width: 100%;
    background: #fff;
    text-align:center;
  }
  .man{
    height:30%;
    width:80%;
    margin:0 auto;
  }
  .entry{
    margin-top:30%;
    height: 50%;
    width:100%;
    text-align:center;
  }
  .entry-font-div{
    font-size:2vmax;
    margin-top: 5%;
  }
  .entry-div{
    width:50%;
    float:left;
  }
</style>
