<template>
  <el-container>
    <el-header>在线考试注册系统</el-header>
    <el-container>
      <el-main>
        <register-page></register-page>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import RegisterPage from '../components/RegisterPage.vue'
  export default {
    name: 'Register',
    components: { RegisterPage }
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
    background-image: url(../assets/img/RegisterBgc.jpg);
    background-size: cover;
    color: #333;
    /* text-align: center;*/
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