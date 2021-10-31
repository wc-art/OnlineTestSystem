<template>
  <el-container style="height: 750px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1" >
          <template slot="title"><i class="el-icon-user-solid"></i>学生个人信息</template>
          <el-menu-item @click="getInfo">查看个人信息</el-menu-item>
        </el-submenu>
        <el-submenu index='3'>
          <template slot="title"><i class="el-icon-menu"></i>学生所选课程列表</template>
          <el-menu-item @click="selectCourse">进入选课页面</el-menu-item>
          <el-menu-item-group v-for="course in courses" :key="course.name">
            <el-menu-item @click="getCourse(course)">{{course.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span>学生考试系统</span>
      </el-header>

      <el-main>
        <router-view v-if="refreshNowPage"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'Student',
    data() {
      return {
        courses: [
          {name: '语文'},
          {name: '数学'}
        ],
        refreshNowPage: true
      }
    },
    // 判断用户是否登录且用户为学生，防止强行跳转
    beforeCreate() {
      const user = JSON.parse(window.localStorage.getItem('user')) || JSON.parse(window.sessionStorage.getItem('user'))
      if( user === null || user.profession !== 'student') {
        this.$message.error('用户未登录或无权限查看')
        this.$router.push('/login')
      } else {
        console.log('合法访问')
      }
    },
    //获取学生所选课程列表
    beforeMount() {
      this.$axios.get('face/afterCourse').then(res => {
        this.courses = res.data
      })
    },
    methods: {
      //获取学生个人信息路由
      getInfo() {
        this.$router.push('/student/info')
      },
      // 获取学生所点击课程，并保存到浏览器缓存中以便使用
      getCourse (course) {
        window.sessionStorage.setItem('course',JSON.stringify(course))
        this.$router.push('/student/course')
        this.refreshNowPage = false
        this.$nextTick(function () {
          this.refreshNowPage = true
        })
        
      },
      // 学生进入选课列表
      selectCourse() {
        this.$router.push('/selectcourse')
      }
    },
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