<template>
  <div class="root">
    <div class="header">
      <student-mobile-header title="账户与设置"></student-mobile-header>
    </div>
    <div class="main">
      <CellGroup class="list">
        <Cell style="margin-top: 2%">
          <span slot="default" class="cell-title">
            姓名:
          </span>
          <span slot="extra" class="cell-content">
            {{user.userName}}
          </span>
        </Cell>
        <Cell>
          <span slot="default" class="cell-title">
            学号:
          </span>
          <span slot="extra" class="cell-content">
            {{user.account}}
          </span>
        </Cell>
        <Cell v-if="user.sex">
          <span slot="default" class="cell-title">
            性别:
          </span>
          <span slot="extra" class="cell-content">
            {{user.sex}}
          </span>
        </Cell>
        <Cell v-if="user.birth">
          <span slot="default" class="cell-title">
            出生年月:
          </span>
          <span slot="extra" class="cell-content">
            {{user.birth}}
          </span>
        </Cell>
        <Cell :to="{name:'teacherMobileAlterEmail'}">
          <span slot="default" class="cell-title">
            联系方式(邮箱):
          </span>
          <span slot="extra" class="cell-content">
            {{user.email}}
          </span>
        </Cell>
        <Cell :to="{name:'teacherMobileAlterPassword',params: {role:user.role}}">
          <span slot="default" class="cell-title">
            账户密码
          </span>
        </Cell>
        <Cell v-if="adminEmail">
          <span slot="default" class="cell-title">
            管理员邮箱:
          </span>
          <span slot="extra" class="cell-content">
            {{adminEmail}}
          </span>
        </Cell>
      </CellGroup>
    </div>
    <div class="footer">
      <Button class="button" @click="signOut"  long>退出登陆</Button>
    </div>
  </div>
</template>

<script>
    import StudentMobileHeader from "../common/StudentMobileHeader";
    export default {
        name: "studentMobileAccountSettings",
      components: {StudentMobileHeader},
      data(){
          return{
            user:'',
            adminEmail:'',
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

              let user ={
                userName:datas.name,
                email:datas.email,
                account:datas.account,
                role:datas.role
              }



              this.user=user

            })
            .catch(err=>console.log(err))
        },
        signOut:function () {
            localStorage.clear()
            this.$router.push({path:'/MTlogin'})
        }
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
    height: 89%;
    width: 100%;
  }
  .list div{
    padding-top: 4%;
    padding-bottom: 4%;
    margin-left: 2%;
    margin-right: 2%;
  }
  .list div:nth-child(odd){
    background: #f8f8f8;
  }
  .footer{
    text-align: center;
    position:fixed;
    width:100%;
    bottom: 0px
  }
  .cell-title{
    width: 40%;
    margin-left: 2%;
    font-family:思源黑体;
    font-size:2.5vmax;
  }
  .cell-content{
    font-family:思源黑体;
    font-size:2.5vmax;
  }
  .button{
    display: inline-block;
    background-color: #EA4C4C;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 2.5vmax;
    /*padding: 20px;*/
    height: 9%;
    width: 100%;
    margin-top: 20%;
  }
</style>
