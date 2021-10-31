<template>
  <div>
    <el-container>
      <el-header>学生选课页面</el-header>
      <el-main>
        <el-table 
          :data="teachers" 
          tooltip-effect="dark" 
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="200">
          </el-table-column>
          <el-table-column label="课程名" width="200">
            <template slot-scope="scope">{{ scope.row.course }}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="学院" width="200">
            <template slot-scope="scope">{{ scope.row.dept }}</template>
          </el-table-column>
        </el-table>
        <el-button type="pramiry" @click="submit" class="select">选课完成</el-button>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>
<script>
  export default {
    name: 'SelectCourse',
    data() {
      return {
        teachers: [
        ],// 学生选课列表
        selectTeachers: [], //学生正在选课程列表
        multipleSelection: []  //学生
      }
    },
    methods: {
      // 将学生所选课程列表存储
      handleSelectionChange(val) {
        this.selectTeachers = val
      },
      submit() {
        //提交学生所选课程列表
        this.$axios.post('face/courseDecisions', this.selectTeachers).then(res => {
          if (res.data) {
            this.$message({
              type: 'success',
              message: '选课完成'
            })
            this.$router.push('/student')
          } else {
            this.$message.error('选课出现问题')
          }
        },
          err => {
            console.log('请求失败', err)
          })
      }
    },
    beforeMount() {
      //向服务器请求学生可选课程列表
      this.$axios.get('face/SelectCourse').then(res => {
        this.teachers = res.data
      },
        err => {
          console.log('请求超时', err)
        })
    },

  }
</script>
<style scoped>
  .el-header,
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
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