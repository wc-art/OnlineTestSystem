<template>
  <el-container style="height: 750px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-menu-item index="/teacher/info" @click="getInfo"><i class="el-icon-user-solid"></i>教师个人信息</el-menu-item>
        <el-menu-item index='1' @click="getTestSit"><i class="el-icon-s-operation"></i>课程考试情况
        </el-menu-item>
        <el-menu-item index='2' @click="getQuestions"><i class="el-icon-s-tools"></i>考题</el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span>教师考试信息查询系统</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'Student',
    data() {
      return {
        course: {}
      }
    },
    beforeCreate() {
      // 鉴权 如果不是老师或者未登录就阻止进入该界面
      const user = JSON.parse(window.localStorage.getItem('user')) || JSON.parse(window.sessionStorage.getItem('user'))
      if (user === null || user.profession !== 'teacher') {
        this.$message.error('用户未登录或无权限查看')
        this.$router.push('/login')
      } else {
        console.log('合法访问')
      }
    },
    methods: {
      //进入个人信息界面
      getInfo() {
        this.$router.push('/teacher/info')
      },
      // 进入考试情况界面
      getTestSit() {
        this.$router.push('/teacher/studenttestinfo')
      },
      //进入题目增删改查界面
      getQuestions() {
        this.$router.push('/teacher/course')
      }
    }
  };
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>