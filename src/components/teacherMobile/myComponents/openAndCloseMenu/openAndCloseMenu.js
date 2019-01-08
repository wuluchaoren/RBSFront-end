import OCMenuComponent from './openAndCloseMenu.vue'

const OCMenu ={
  install:function(Vue){
    Vue.component('OCMenu',OCMenuComponent)
  }
}

export default OCMenu
