<template>
  <div>
    <el-descriptions title="用户信息">
      <el-descriptions-item label="学号">
        <span>{{teacher.id}}</span>
      </el-descriptions-item>
      <el-descriptions-item label="姓名">
        <span v-show="!isChange">{{teacher.name}}</span>
        <input type="text" v-model="teacher.name" v-show="isChange">
      </el-descriptions-item>
      <el-descriptions-item label="性别">
        <span v-show="!isChange">{{teacher.sex}}</span>
        <input type="text" v-model="teacher.sex" v-show="isChange">
      </el-descriptions-item>
      <el-descriptions-item label="手机号">
        <span v-show="!isChange">{{teacher.phonenumber}}</span>
        <input type="text" v-model="teacher.phonenumber" v-show="isChange">
      </el-descriptions-item>
      <el-descriptions-item label="所在学院">
        <span v-show="!isChange">{{teacher.dept}}</span>
        <input type="text" v-model="teacher.dept" v-show="isChange">
      </el-descriptions-item>
      <el-descriptions-item label="所授课程">
        <span>{{teacher.course}}</span>
      </el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">教师</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <transition-group name="animate__animated animate__bounce" enter-active-class="animate__lightSpeedInRight"
      leave-active-class="animate__lightSpeedOutLeft" appear>
      <el-button type="primary" plain @click="update" v-show="!isChange" key="0">修改</el-button>
      <el-button type="primary" plain @click="save" v-show="isChange" key="1">保存</el-button>
    </transition-group>
  </div>
</template>
<script>
  import 'animate.css'
  export default {
    name: 'teacherInfo',
    data() {
      return {
        teacher: {},
        isChange: false
      }
    },
    methods: {
      update() {
        this.isChange = true
      },
      // 提交老师个人信息修改后的数据
      save() {
        this.$confirm('是否保存?').then(() => {
          this.$axios.post('emp/StudentUpdate',this.student).then(() => {
            console.log('成功')
          },
          err => {
            console.log(err)
          })
          this.isChange = false
        },
        () => {
          this.isChange = true
        })
      }
    },
    //获取老师个人信息
    beforeMount() {
      this.$axios.post('emp/teacherSelect').then(res => {
        this.teacher = res.data
      },
        err => {
          console.log('请求错误', err)
        })
    },
  }
</script>
<style scoped>

</style>