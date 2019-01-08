<template>
  <span @click="openMenu()"><Icon type="md-add" size="large"/></span>
</template>

<script>
    export default {
      name: "openAndCloseMenu",
      methods: {
        openMenu: function () {
          event.stopPropagation();
          if (document.getElementById("show").style.display === "none") {//如果show是隐藏的
            document.getElementById("show").style.display = "block";//show的display属性设置为block（显示）
          }
          else {
            document.getElementById("show").style.display = "none";
          }
        },
      }
    }
</script>

<style scoped>

</style>
