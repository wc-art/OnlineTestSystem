<template>
  <el-collapse>
    <el-collapse-item v-for="(question, index) in questions" :key="index" :title="`${index+1}、${question.name}`" :name="index">
      <div>{{question.topic}}</div>
      <el-input type="textarea" v-model="question.answer" style="width: 1000px;" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入答案"></el-input>
    </el-collapse-item>
    <el-button @click="uploadExam" type="primary" v-show="questions.length">提交</el-button>
    <p v-show="!questions.length">暂无考题</p>
  </el-collapse>
</template>
<script>
  export default {
    name: 'ExamPage',
    props: ['course'],
    data() {
      return {
        questions: [
        ]
      }
    },
    methods: {
      // 调教试卷并返回成绩
      uploadExam() {
        if (confirm('是否提交试卷?')) {
          this.$axios.post('exam/studentSubmit', this.questions,{
            params: {
              s: this.course.name,
              courseteacher: this.course.teacher
            }
          }).then(res => {
            window.sessionStorage.setItem('grade',res.data)
            this.$message({
              message: `提交试卷成功分数为${res.data}`,
              type: 'success',
              center: true
            })
          })
          this.$router.push('/student/course')
        }
      }
    },
    beforeMount() {
      const course = JSON.parse(window.sessionStorage.getItem('course'))
      this.$axios.post('exam/studentSelectTopic',course).then(res => {
        this.questions = res.data
        for(let i=0; i<this.questions.length;i++) {
          this.questions[i].answer=''
        }
      },
      err => {
        console.log('请求错误', err)
      })
    }
  }
</script>
<style scoped>

</style>