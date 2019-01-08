<template>
  <div style="width:100%;display:flex;margin-top: 2%">
    <div style="width: 5%;text-align: center;">
      <Checkbox :label="label">
        <span slot="default"></span>
      </Checkbox>
    </div>
    <div style="width:20%;vertical-align: middle;">
      <span slot="default" :style="this.leftStyle">{{left}}</span>
    </div>
    <div style="width: 50%;text-align: center;vertical-align: middle;">
      <span :style="this.centerStyle">{{center}}</span>
    </div>
    <div style="width: 25%;vertical-align: middle;">
      <span :style="this.rightStyle">{{right}}</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "threePartCellWithCheckBox",
        props:['left','center','right','leftStyle','centerStyle','rightStyle','label'],
      data(){
          return{
            active:false
          }
      }
    }
</script>

<style scoped>
  .cell-font-active{

  }
</style>
