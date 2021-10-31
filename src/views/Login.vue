<template>
  <el-container>
    <el-header>在线考试登录系统</el-header>
    <el-container>
      <el-main>
        <login-page></login-page>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import LoginPage from '../components/LoginPage.vue'
  export default {
    name: 'login',
    components: { LoginPage },
    mounted() {
      
    },
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-image: url(../assets/img/LoginBgc.jpg);
    background-size: cover;
    color: #333;
    text-align: center;
    height: 710px;
  }

  body>.el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>