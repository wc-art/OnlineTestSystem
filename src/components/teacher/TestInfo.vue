<template>
  <div>
    <el-table :data="students" style="width: 100%" max-height="250">
      <el-table-column prop="id" label="学号" width="150">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="queryInfo(scope.row, students)" type="pramiry" size="small">
            查看详细
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer :title="getStudentCourse" :visible.sync="drawer" direction="ltr" :before-close="handleClose" size="50%">
      <student-test-info :student="student"></student-test-info>
    </el-drawer>
  </div>
</template>

<script>
  import studentTestInfo from './studentTestInfo.vue'
  export default {
    name: 'testInfo',
    components: { studentTestInfo },
    methods: {
      //将点击学生保存
      queryInfo(student) {
        this.student = student
        this.drawer = true
      },
      // 关闭某学生信息页面
      handleClose() {
        this.$confirm('确认关闭？')
          .then(() => {
            this.$message({
              type: 'success',
              message: '关闭成功',
              center: true
            })
            this.drawer = false
          }).catch(() => {
            this.drawer = true
          })
      },
    },
    computed: {
      getStudentCourse() {
        return `${this.student.name}的考试成绩`
      }
    },
    data() {
      return {
        students: [],
        student: {

        },
        drawer: false
      }
    },
    // 请求学生考试数据
    beforeMount() {
      this.$axios.post(`exam/selectCourseStudent`).then(res => {
          this.students = res.data
        },
        err => {
          console.log('请求失败',err)
        })
    },
  }
</script>