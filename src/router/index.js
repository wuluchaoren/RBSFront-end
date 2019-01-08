import Vue from 'vue'
import Router from 'vue-router'
import teacherMobileLogin from '@/components/teacherMobile/loginAndActivateAndHome/login'
import teacherMobileFindPassword from '@/components/teacherMobile/accountAndSettings/findPassword'
import teacherMobileSpecificSeminarHome from '@/components/teacherMobile/seminar/specificSeminarHome'
import teacherMobilePauseSeminar from '@/components/teacherMobile/seminar/pauseSeminar'
import teacherMobileProcessingSeminar from '@/components/teacherMobile/seminar/processingSeminar'
import teacherMobileProfile from '@/components/teacherMobile/loginAndActivateAndHome/profile'
import teacherMobileSeminar from '@/components/teacherMobile/seminar/seminar'
import teacherMobileSeminarScore from '@/components/teacherMobile/seminar/seminarScore'
import teacherMobileActivate from '@/components/teacherMobile/loginAndActivateAndHome/activate'
import teacherMobileSetPassword from '@/components/teacherMobile/accountAndSettings/setPassword'
import teacherMobileUpcomings from '@/components/teacherMobile/upcomings/upcomings'
import teacherMobileSettings from '@/components/teacherMobile/accountAndSettings/accountSettings'
import teacherMobileAlterEmail from '@/components/teacherMobile/accountAndSettings/alterEmail'
import teacherMobileAlterPassword from '@/components/teacherMobile/accountAndSettings/alterPassword'
import teacherMobileCourse from '@/components/teacherMobile/myCourse/course'
import teacherMobileCreateCourse from '@/components/teacherMobile/createCourse/createCourse'
import teacherMobileClassInfo from '@/components/teacherMobile/myCourse/classInfo'
import teacherMobileCourseInfo from '@/components/teacherMobile/myCourse/courseInfo'
import teacherMobileShareSettings from '@/components/teacherMobile/myCourse/shareSettings'
import teacherMobileStudentScore from '@/components/teacherMobile/myCourse/studentScore'
import teacherMobileStudentTeam from '@/components/teacherMobile/myCourse/studentTeam'
import teacherMobileCreateShare from '@/components/teacherMobile/myCourse/createShare'
import teacherMobileCreateClass from '@/components/teacherMobile/myCourse/createClass'
import teacherMobileSpecificSeminar from '@/components/teacherMobile/seminar/specificSeminar'
import teacherMobileSeminarReport from '@/components/teacherMobile/seminar/seminarReport'
import teacherMobileSeminarRoundSettings from '@/components/teacherMobile/seminar/seminarRoundSettings'
import teacherMobileCreateSeminar from '@/components/teacherMobile/seminar/createSeminar'
import teacherMobileAlterSeminar from '@/components/teacherMobile/seminar/alterSeminar'

import StudentMobileAccountIndex from '@/components/studentMobile/accountSettings/StudentMobileAccountIndex'
import StudentMobileAccountSettings from '@/components/studentMobile/accountSettings/StudentMobileAccountSettings'
import StudentMobileCourseIndex from '@/components/studentMobile/course/StudentMobileCourseIndex'
import StudentMobileCourseInfo from '@/components/studentMobile/course/StudentMobileCourseInfo'
import StudentMobileCourseTeamLimit from '@/components/studentMobile/course/StudentMobileCourseTeamLimit'
import StudentMobileCourseScore from '@/components/studentMobile/course/StudentMobileCourseScore'
import StudentMobileCourseTeam from '@/components/studentMobile/course/StudentMobileCourseTeam'
import StudentMobileCourseTeamCreating from '@/components/studentMobile/course/StudentMobileCourseTeamCreating'
import StudentMobileCourseMyTeam from  '@/components/studentMobile/course/StudentMobileCourseMyTeam'
import StudentMobileSeminarCourseSelect from '@/components/studentMobile/seminar/StudentMobileSeminarCourseSelect'
import StudentMobileSeminarSelect from '@/components/studentMobile/seminar/StudentMobileSeminarSelect'
import StudentMobileSeminarIndex from '@/components/studentMobile/seminar/StudentMobileSeminarIndex'
import StudentMobileSeminarPPTDownload from '@/components/studentMobile/seminar/StudentMobileSeminarPPTDownload'
import StudentMobileSeminarPresenting from  '@/components/studentMobile/seminar/StudentMobileSeminarPresenting'
import StudentMobileSeminarSignUp from '@/components/studentMobile/seminar/StudentMobileSeminarSignUp'
import StudentMobileSeminarCancelSignUp from '@/components/studentMobile/seminar/StudentMobileSeminarCancelSignUp'
import StudentMobileSeminarScore from  '@/components/studentMobile/seminar/StudentMobileSeminarScore'

Vue.use(Router)

export default new Router({
  mode:'history',
  base:'/dist/',
  routes: [
    //PC端路由
    //教师端
    {
      path: '/',
      redirect: '/MTlogin',//设置默认指向的路径
    },
    {
      //登陆
      path: '/MTlogin',
      name: 'teacherMobileLogin',
      component: teacherMobileLogin
    },
    {
      //激活
      path:'/MTactivate',
      name:'teacherMobileActivate',
      component:teacherMobileActivate
    },
    {
      //找回密码
      path: '/accountAndSettings/MTfindPassword',
      name: 'teacherMobileFindPassword',
      component: teacherMobileFindPassword
    },
    {
      //账户设置
      path:'/accountAndSettings/MTaccountSettings',
      name:'teacherMobileAccountSettings',
      component:teacherMobileSettings
    },
    {
      //修改密码
      path:'/accountSettings/MTalterPassword/:role',
      name:'teacherMobileAlterPassword',
      component:teacherMobileAlterPassword
    },
    {
      //修改邮箱
      path:'/accountSettings/MTalterEmail/:role',
      name:'teacherMobileAlterEmail',
      component:teacherMobileAlterEmail
    },
    {
      //课程管理
      path:'/myCourse/MTcourse',
      name:'teacherMobileCourse',
      component:teacherMobileCourse
    },
    {
      //班级信息
      path:'/myCourse/MTclassInfo/:name/:courseNumber',
      name:'teacherMobileClassInfo',
      component:teacherMobileClassInfo
    },
    {
      //新建班级
      path:'/myCourse/MTcreateClass/:name/:courseNumber',
      name:'teacherMobileCreateClass',
      component:teacherMobileCreateClass
    },
    {
      //课程信息
      path:'/myCourse/MTcourseInfo/:name/:courseNumber',
      name:'teacherMobileCourseInfo',
      component:teacherMobileCourseInfo
    },
    {
      //共享设置
      path:'/myCourse/MTshareSettings/:name/:courseNumber',
      name:'teacherMobileShareSettings',
      component:teacherMobileShareSettings
    },
    {
      //讨论课轮次设置
      path:'/seminar/MTseminarRoundSettings/:name/:courseNumber/:round/:roundId',
      name:'teacherMobileSeminarRoundSettings',
      component:teacherMobileSeminarRoundSettings
    },
    {
      //新增共享
      path:'/myCourse/MTcreateShare/:name/courseNumber',
      name:'teacherMobileCreateShare',
      component:teacherMobileCreateShare
    },
    {
      //学生成绩
      path:'/myCourse/MTstudentScore/:name/:courseNumber',
      name:'teacherMobileStudentScore',
      component:teacherMobileStudentScore
    },
    {
      //学生组队
      path:'/myCourse/MTstudentTeam/:name/:courseNumber',
      name:'teacherMobileStudentTeam',
      component:teacherMobileStudentTeam
    },
    {
      //新建课程
      path:'/createCourse/MTcreateCourse',
      name:'teacherMobileCreateCourse',
      component:teacherMobileCreateCourse
    },
    {
      //待办事项
      path:'/upcomings/MTupcomings',
      name:'teacherMobileUpcomings',
      component:teacherMobileUpcomings
    },
    {
      //某个讨论课
      path:'/seminar/MTspecificSeminar/:name/:courseNumber',
      name:'teacherMobileSpecificSeminar',
      component:teacherMobileSpecificSeminar
    },
    {
      //某个讨论课首页
      path: '/seminar/MTspecificSeminarHome/:name/:courseNumber/:seminar/:seminarNumber/:class/:classNumber',
      name: 'teacherMobileSpecificSeminarHome',
      component: teacherMobileSpecificSeminarHome
    },
    // {
    //   //暂停讨论课
    //   path: '/seminar/MTpauseSeminar',
    //   name: 'teacherMobilePauseSeminar',
    //   component: teacherMobilePauseSeminar
    // },
    {
      //讨论课进行中
      path: '/seminar/MTprocessingSeminar/:name/:courseNumber/:seminar/:seminarNumber/:class/:classNumber',
      name: 'teacherMobileProcessingSeminar',
      component: teacherMobileProcessingSeminar
    },
    {
      //个人首页
      path: '/users/MTprofile',
      name: 'teacherMobileProfile',
      component: teacherMobileProfile
    },
    {
      //讨论课首页
      path:'/seminar/MTseminarHome',
      name:'teacherMobileSeminar',
      component:teacherMobileSeminar
    },
    {
      //讨论课查看成绩
      path:'/seminar/MTseminarScore/:name/:courseNumber/:seminar/:seminarNumber/:class/:classNumber',
      name:'teacherMobileSeminarScore',
      component:teacherMobileSeminarScore
    },
    {
      //讨论课报告
      path:'/seminar/MTseminarReport/:name/:courseNumber/:seminar/:seminarNumber/:class/:classNumber',
      name:'teacherMobileSeminarReport',
      component:teacherMobileSeminarReport
    },
    {
      //新建讨论课
      path:'/seminar/MTcreateSeminar/:name/:courseNumber',
      name:'teacherMobileCreateSeminar',
      component:teacherMobileCreateSeminar
    },
    {
      //修改讨论课
      path:'/seminar/MTalterSeminar/:name/:courseNumber/:seminar/:seminarNumber',
      name:'teacherMobileAlterSeminar',
      component:teacherMobileAlterSeminar
    },

    {
      //账户首页
      path:'/studentMobile/account',
      name:'StudentMobileAccountIndex',
      component:StudentMobileAccountIndex,
      alias:'/studentMobile/course',
    },
    {
      //账户设置界面
      path:'/studentMobile/account/settings',
      name:'StudentMobileAccountSettings',
      component:StudentMobileAccountSettings,
      alias:'/studentMobile/course',
    },
    {
      //课程选择界面
      path:'/studentMobile/course/index',
      name:'StudentMobileCourseIndex',
      component:StudentMobileCourseIndex,
      props:true
    },
    {
      //课程信息
      path:'/studentMobile/course/info',
      name:'StudentMobileCourseInfo',
      component:StudentMobileCourseInfo,
      props:true
    },
    {
      //课程组队信息
      path:'/studentMobile/course/info/limit',
      name:'StudentMobileCourseTeamLimit',
      component:StudentMobileCourseTeamLimit,
      props:true
    },
    {
      //课程成绩
      path:'/studentMobile/course/score',
      name:'StudentMobileCourseScore',
      component:StudentMobileCourseScore,
      props:true
    },
    {
      //课程组队
      path:'/studentMobile/course/team',
      name:'StudentMobileCourseTeam',
      component:StudentMobileCourseTeam,
      props:true
    },
    {
      //创建队伍
      path:'/studentMobile/course/team/create',
      name:'StudentMobileCourseTeamCreating',
      component:StudentMobileCourseTeamCreating,
      props:true
    },
    {
      //创建队伍
      path:'/studentMobile/course/team/myTeam',
      name:'StudentMobileCourseMyTeam',
      component:StudentMobileCourseMyTeam,
      props:true
    },
    {
      //讨论课课程选择界面
      path:'/studentMobile/seminar/index',
      name:'StudentMobileSeminarCourseSelect',
      component:StudentMobileSeminarCourseSelect,
      props:true
    },
    {
      //讨论课选择界面
      path:'/studentMobile/seminar/select',
      name:'StudentMobileSeminarSelect',
      component:StudentMobileSeminarSelect,
      props:true
    },
    {
      //讨论课首页
      path:'/studentMobile/seminar/info/index',
      name:'StudentMobileSeminarIndex',
      component:StudentMobileSeminarIndex,
      props:true
    },
    {
      //讨论课ppt下载
      path:'/studentMobile/seminar/info/ppt',
      name:'StudentMobileSeminarPPTDownload',
      component:StudentMobileSeminarPPTDownload,
      props:true
    },
    {
      //讨论课展示流程(提问)
      path:'/studentMobile/seminar/info/presenting',
      name:'StudentMobileSeminarPresenting',
      component:StudentMobileSeminarPresenting,
      props:true
    },
    {
      //讨论课报名
      path:'/studentMobile/seminar/info/signUp',
      name:'StudentMobileSeminarSignUp',
      component:StudentMobileSeminarSignUp,
      props:true
    },
    {
      //讨论课取消报名
      path:'/studentMobile/seminar/info/cancelSignUp',
      name:'StudentMobileSeminarCancelSignUp',
      component:StudentMobileSeminarCancelSignUp,
      props:true
    },
    {
      //讨论课取消报名
      path:'/studentMobile/seminar/info/score',
      name:'StudentMobileSeminarScore',
      component:StudentMobileSeminarScore,
      props:true
    },
  ]
})
