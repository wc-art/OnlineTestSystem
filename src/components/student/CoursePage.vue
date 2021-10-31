<template>
  <el-main>
    <el-table :data="performances" border>
      <el-table-column prop="date" label="日期" width="300">
      </el-table-column>
      <el-table-column prop="studentscore" label="成绩" width="300">
      </el-table-column>
    </el-table>
    <p>{{course.name}}考试</p>
    <transition name="animate__animated animate__bounce" enter-active-class="animate__lightSpeedInRight"
      leave-active-class="animate__lightSpeedOutLeft" appear>
      <el-button @click="GoExam" type="primary" round v-show="!this.performances.length" key="0">参加考试
      </el-button>
    </transition>
    <transition name="animate__animated animate__bounce" enter-active-class="animate__lightSpeedInRight"
      leave-active-class="animate__lightSpeedOutLeft" appear>
      <el-button @click="GoExam2" type="primary" round v-show="this.performances.length > 0" key="1">重考</el-button>
    </transition>
  </el-main>
</template>
<script>
  export default {
    data() {
      return {
        course: {},
        performances: [
        ]
      }
    },
    methods: {
      // 去考试
      GoExam() {
        this.$router.push(`/exam`)
      },
      // 重考
      GoExam2() {
        this.$router.push('/exam')
      }
    },
    // 获取或更新学生该课程考试信息
    beforeMount() {
      const course = JSON.parse(window.sessionStorage.getItem('course'))
      this.course = course
      this.$axios.post(`exam/scoreforStudent`, this.course).then(res => {
        this.performances = res.data
        for (let i = 0; i < this.performances.length; i++) {
          this.performances[i].date = this.performances[i].date.substr(0, 10)
        }
      },
        err => {
          console.log('请求错误', err)
        })
    },
  }
</script>
<style scoped>

</style>