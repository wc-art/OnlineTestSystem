import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  //默认界面路由
  {
    path: '/',
    redirect: '/login',
    meta: {title: '登录'}
  },
  //登录界面路由
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {title: '登录'}
  },
  //教师界面路由
  {
    path: '/teacher',
    component: () => import ('../views/Teacher.vue'),
    children: [
      {
        path: '',
        redirect: 'info'
      },
      {
        path: 'info',
        name: 'teacherInfo',
        component: () => import('../components/teacher/TeacherInfo.vue'),
        meta: {title: '个人'}
      },
      {
        path: 'studenttestinfo',
        name: 'testInfo',
        component: () => import('../components/teacher/TestInfo.vue'),
        meta: {title: '学生考试信息'}
      },
      {
        path: 'course',
        name: 'teacherCourse',
        component: () => import('../components/teacher/CoursePage.vue'),
        meta: {title: '课程相关'}
      }
    ]
  },
  //学生界面路由
  {
    path: '/student',
    component: () => import ('../views/Student.vue'),
    children: [
      //学生界面路由重定向
      {
        path: '',
        redirect: 'info'
      },
      //学生个人信息界面路由
      {
        path: 'info',
        name: 'StudentInfo',
        component: () => import('../components/student/StudentInfo.vue'),
        meta: {title: '个人'}
      },
      //学生某课程路由
      {
        path: 'course',
        name: 'coursePage',
        component: () => import('../components/student/CoursePage.vue'),
        meta: {title: '学生课程成绩'}
      }
    ]
  },
  //注册页面路由
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {title: '注册'}
  },
  //考试界面路由
  {
    path: '/exam',
    name: 'Exam',
    component: () => import('../views/Exam.vue'),
    meta: {title: '考试'}
  },
  // 学生选课路由
  {
    path: '/selectcourse',
    name: 'selectCousrse',
    component: () => import('../views/SelectCourse.vue'),
    meta: {title: '选课'}
  }
]


const router = new VueRouter({
  mode: 'history',
  routes
})


router.afterEach((to) => {
  document.title = to.meta.title
})

export default router
