<template>
  <el-container>
    <el-header class="header">{{course.name}}考试(一题一分)</el-header>
    <el-main>
      <exam-page :course="course"></exam-page>
    </el-main>
  </el-container>
</template>
<script>
  import ExamPage from '../components/exam/ExamPage.vue'
  export default {
    name: 'Exam',
    components: {
      ExamPage
    },
    data () {
      return {
        course: {name: '111'}
      }
    },
    beforeCreate() {
      // 鉴权
      const user = JSON.parse(window.localStorage.getItem('user')) || JSON.parse(window.sessionStorage.getItem('user'))
      if( user === null || user.profession !== 'student') {
        alert('非法访问数据')
        this.$router.push('/login')
      } else {
        console.log('合法访问')
      }
    },
    beforeMount() {
      // 提取浏览器存储中的课程，以便获取课程题目
      this.course = JSON.parse(window.sessionStorage.getItem('course'))
    },
  }
</script>
<style scoped>
  .header{
    background-color: rgb(99, 114, 116);
    text-align: center;
    line-height: 50px;
  }
</style>