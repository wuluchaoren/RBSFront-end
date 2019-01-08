<template>
  <div class="head">
    <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
    <span style="width:85%">{{this.title}}</span>
    <!--下拉框-->
    <Dropdown trigger="click" placement="bottom-end">
      <Icon type="md-add" size="large"></Icon>
    <DropdownMenu slot="list" class="drop-down">
      <router-link :to="{name:'StudentMobileAccountIndex'}">
        <DropdownItem>
          <div class="item">
            <img src="../../../assets/personal data.png" class="img"/>
            个人页
          </div>
        </DropdownItem>
      </router-link>

      <router-link :to="{name:'StudentMobileSeminarCourseSelect'}">
        <DropdownItem>
          <div class="item">
            <img src="../../../assets/Trophy.png" class="img"/>
            讨论课
          </div>
        </DropdownItem>
      </router-link>
    </DropdownMenu>
  </Dropdown>
  </div>
</template>

<script>
    export default {
        name: "StudentMobileHeader",
        data(){
          return {
          }
        },
        props:['title'],
        methods:{
          back:function () {
            this.$router.go(-1)
          }
        }
    }
</script>

<style scoped>
  .head{
    text-align: center;
    width:100%;
    height: 10%;
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
  .item{
    font-family: 思源黑体;
    font-size: 2vmax;
    color: #0B710A;
    width: 100%;
    height: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img {
    max-height: 26px;
    min-height: 26px;
    height: 50%;
    margin-right: 5%
  }
  .drop-down{
    width: 50%;
    height: 50%;
  }
</style>
