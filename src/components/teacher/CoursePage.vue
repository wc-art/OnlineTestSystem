<template>
  <div>
    <el-table border style="width: 100%"
      :data="questions.filter(data => search==='' || data.name.toLowerCase().includes(search.toLowerCase()))"
      max-height="500">
      <el-table-column fixed prop="name" label="题目名称" width="150">
      </el-table-column>
      <el-table-column prop="topic" label="题目描述" width="1000">
      </el-table-column>
      <el-table-column prop="answer" label="题目答案" width="120">
      </el-table-column>
      <el-table-column fixed="right" width="200">
        <template slot="header">
          查询题目名称
          <input v-model="search" placeholder="输入关键字搜索" @input="change" type="text">
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer title="修改题目" :visible.sync="drawer" direction="rtl" :before-close="handleClose">
      &nbsp;题目名称<el-input type="textarea" :rows="2" v-model="selectQuestion.name"></el-input>
      <hr>
      &nbsp;题目描述
      &nbsp;<el-input type="textarea" :rows="2" v-model="selectQuestion.topic"></el-input>
      <hr>
      &nbsp;答案
      &nbsp;<el-input type="textarea" :rows="2" v-model="selectQuestion.answer"></el-input>
    </el-drawer>
    <el-button type="pramiry" @click="addQuestion">&nbsp;添加题目</el-button>
    <el-drawer title="添加题目" :visible.sync="drawer2" direction="rtl" :before-close="handleClose2">
      &nbsp;题目名称<el-input type="textarea" :rows="2" v-model="selectQuestion.name"></el-input>
      <hr>
      &nbsp;题目描述<el-input type="textarea" :rows="2" v-model="selectQuestion.topic"></el-input>
      <hr>
      &nbsp;答案<el-input type="textarea" :rows="2" v-model="selectQuestion.answer"></el-input>
      <el-button type="primary" @click="submit" class="submit">提交</el-button>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: 'CoursePage',
    data() {
      return {
        questions: [],
        selectQuestion: {},
        oldquestion: {},
        drawer: false,
        drawer2: false,
        search: ''
      }
    },
    methods: {
      handleEdit(index, question) {
        this.drawer = true
        this.selectQuestion = { ...question }
      },
      // 删除题目
      handleDelete(question) {
        this.$axios.post('exam/deleteTopic', question).then(() => {
          this.$message({
            type: 'success',
            message: `删除成功`
          })
          location.reload(true)
        })
      },
      // 修改题目
      handleClose() {
        if (this.selectQuestion.name === "") {
          this.$message.error('题目不能为空')
          return false
        } else if (this.selectQuestion.topic === "") {
          this.$message.error('题目内容不能为空')
          return false
        } else if (this.selectQuestion.answer === "") {
          this.$message.error('答案不能为空')
          return false
        }
        this.$confirm('确认保存？')
          .then(() => {
            console.log(111)
            this.questions.forEach((element, index) => {
              if (element.name === this.selectQuestion.name) {
                this.oldquestion = this.questions[index]
              }
            });
            console.log(this.oldquestion, this.selectQuestion)
            this.drawer = false
            let newQuestion = [this.oldquestion, this.selectQuestion]
            this.$axios.post('exam/updateTopic', newQuestion).then(() => {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            })
          }).catch(() => {
            this.drawer = true
          })
      },
      addQuestion() {
        this.drawer2 = true
      },
      // 添加题目
      handleClose2() {
        this.$confirm('确认关闭?')
          .then(() => {
            this.drawer2 = false
            location.reload(true)
          }).catch(() => {
            this.drawer2 = true
          })
      },
      //提交添加后的题目
      submit() {
        if (this.selectQuestion.name === undefined || this.selectQuestion.name === "") {
          this.$message.error('请输入题目名称')
          return false
        } else if (this.selectQuestion.topic === undefined || this.selectQuestion.topic === "") {
          this.$message.error('请输入题目内容')
          return false
        } else if (this.selectQuestion.answer === undefined || this.selectQuestion.answer === "") {
          this.$message.error('请输入题目答案')
          return false
        }
        this.$axios.post('exam/teacherSubmit', this.selectQuestion).then(() => {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        })
        location.reload(true)
      },
      //查询题目时自动调用 用来刷新视图，解决el-input不刷新的问题
      change() {
        this.$forceUpdate()
      }
    },
    // 向服务端请求数据
    beforeMount() {
      this.$axios.post('exam/teacherSelectTopic').then(res => {
        this.questions = res.data
      },
        err => {
          console.log('请求失败', err)
        })
    },
    mounted() {
      console.log('挂载完毕')
    }
  }
</script>
<style scoped>
  .submit {
    margin-left: 100px
  }
</style>