<template>
  <div>
    <el-table :data="courseInfo" border class="table">
      <el-table-column prop="date" label="日期" width="200">
      </el-table-column>
      <el-table-column prop="coursename" label="课程名" width="200">
      </el-table-column>
      <el-table-column prop="studentscore" label="成绩" width="200">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    name: 'studentTestInfo',
    props: ['student'],
    data() {
      return {
        courseInfo: []
      }
    },
    beforeMount() {
      // 获取该学生考试数据
      this.$axios.post('exam/scoreforTeacher',this.student).then(res => {
        this.courseInfo = res.data
        for(let i=0;i<this.courseInfo.length;i++) {
          this.courseInfo[i].date = this.courseInfo[i].date.substr(0,10)
        }
      })
    },
  }
</script>
<style scoped>
  .table {
    margin-left: 30px;
  }
  div{
    padding: 5px;
  }
</style>