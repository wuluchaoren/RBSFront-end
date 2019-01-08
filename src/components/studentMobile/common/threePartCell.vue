<template>
  <div style="width:100%;display:flex;margin-top: 2%">
    <div style="width: 30%;justify-content: center;text-align: center">
      <span :style="this.leftStyle">{{left}}</span>
    </div>
    <div style="width: 40%;justify-content: center;text-align: center">
      <span :style="this.centerStyle">{{center}}</span>
    </div>
    <div style="width: 30%;justify-content: center;text-align: center">
      <span :style="this.rightStyle">{{right}}</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "threePartCell",
        props:['left','center','right','leftStyle','centerStyle','rightStyle'],
        methods:{
          handelClick(){

          }
        }
    }
</script>

<style scoped>

</style>
