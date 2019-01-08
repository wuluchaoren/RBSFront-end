<template>
  <div class="root">
  <div class="header">
    <student-mobile-header :title="title"></student-mobile-header>
  </div>
  <div class="main">
    <CellGroup v-if="sendBack">
      <div v-for="(pre,index) in allPres" :key="pre.attendanceId" :class="{shade:index%2!=0}" style="display: flex;height:8vmax;align-items: center;">
        <div style="width: 30%;justify-content: center;text-align: center">
          <span class="span1" slot="default">第{{index+1}}组</span>
        </div>
        <div style="width: 40%;justify-content: center;text-align: center">
          <span class="span2" v-if="!pre.teamId">未报名</span>
          <span class="span2" v-else-if="pre.preFileName" slot="default"><a  @click="downloadPPT(pre)">{{pre.preFileName}}</a></span>
          <span class="span2" style="color: red" v-else>暂未上传</span>
        </div>
        <Cell  style="width: 30%;justify-content: center;text-align: center">
          <span class="span1" slot="default">{{pre.teamNumber}}</span>
        </Cell>
      </div>
    </CellGroup>
  </div>
  </div>
</template>

<script>
    import StudentMobileHeader from "../common/StudentMobileHeader";
    export default {
        name: "StudentMobileSeminarPPTDownLoad",
      components: {StudentMobileHeader},
      data(){
          return{
            title:this.$route.query.courseName+'-'+"讨论课",
            pres:[],
            maxTeam:this.$route.query.maxTeam,
            getTeamListUrl:`attendance`,
            sendBack:false
          }
      },
      created(){
        this.getTeamList(this.getTeamListUrl,{cClassId:this.$route.query.classId,seminarId:this.$route.query.seminarId})
      },
      methods:{
        getTeamList:function (url,params) {
          this.$http.get(url,{params:params})
            .then((res)=>{

              let datas = res.data

              let pres = []

              datas.forEach(presentation=>{
                let pre = {
                  attendanceId:presentation.id,
                  teamId:presentation.teamBaseInfoVO.id,
                  teamNumber:presentation.teamBaseInfoVO.teamSerials,
                  teamName:presentation.teamBaseInfoVO.teamName,
                  preOrder:presentation.teamOrder,
                  preFileName:presentation.pptName,
                  preFileUrl:presentation.pptUrl
                }

                pres.push(pre)

              })

              this.pres = pres
              this.sendBack = true


            })
            .catch(err=>{

            })
        },
        downloadPPT(pre){
          this.$http.get(`attendance/${pre.attendanceId}/ppt`,{
            responseType:'arraybuffer'
          })
            .then(res=>{
              // let blob = new window.Bolb([res.data],{type:"application/force-download"})
              // let objectUrl = URL.createObjectURL(blob)
              // window.location.href = objectUrl;
              this.$downloadFile(pre.preFileName,res.data)
              this.$Message.success('下载成功')
            })
            .catch(err=>{
              console.log(err)
            })
        }
      },
      computed:{
        allPres:function () {
          let all = []
          this.pres.forEach(pre=>{
            all[pre.preOrder-1] = pre
          })

          for (let i =0 ;i<this.maxTeam;i++){

            if(all[i]==null){
              let pre = {
                teamId:null,
                teamNumber:null,
                teamName:null,
                preOrder:i+1,
                preFileName:null,
                preFileUrl:null
              }
              all[i]=pre
            }
          }

          return all
        }
      },
    }
</script>

<style scoped>
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
  .root {
    height: 100%;
    width: 100%;
    background: #fff;
  }
  .main{
    /*margin-top: 8%;*/
    height: 92%;
    width: 100%;
    background: #fff;
  }
  .span1{
    font-family:思源黑体;
    font-size:3vmax;
    color: black;
    width: 21%;
    line-height: 8vmax;
  }
  .span2{
    font-family:思源黑体;
    font-size:2.2vmax;
    color: green;
    width: 66%;
    line-height: 8vmax;
  }
  .shade{
    background-color:#f8f8f9;
  }
  .footer{
    text-align: center;
    position:fixed;
    width:100%;
    bottom: 0px
  }
</style>
