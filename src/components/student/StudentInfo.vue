<template>
  <div>
    <el-descriptions title="用户信息">
      <el-descriptions-item label="学号">
        <span>{{student.id}}</span>
      </el-descriptions-item>
      <el-descriptions-item label="姓名">
        <span v-show="!isChange">{{student.name}}</span>
        <input type="text" v-model="student.name" v-show="isChange">
      </el-descriptions-item>
      <el-descriptions-item label="性别">
        <span v-show="!isChange">{{student.sex}}</span>
        <input type="text" v-model="student.sex" v-show="isChange">
      </el-descriptions-item>
      <el-descriptions-item label="手机号">
        <span v-show="!isChange">{{student.phonenumber}}</span>
        <input type="text" v-model="student.phonenumber" v-show="isChange">
      </el-descriptions-item>
      <el-descriptions-item label="所在学院">
        <span v-show="!isChange">{{student.dept}}</span>
        <input type="text" v-model="student.dept" v-show="isChange">
      </el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">学生</el-tag>
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
    name: 'StudentInfo',
    data() {
      return {
        student: {
          id: '',
          password: '',
          name: '',
          sex: '',
          phonenumber: '',
          dept: '',
        },
        isChange: false
      }
    },
    methods: {
      update() {
        this.isChange = true
      },
      // 保存学生修改后的个人信息
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
    // 获取学生的个人信息
    mounted() {
      this.$axios.post('emp/studentAll').then(res => {
        this.student = res.data
      },
      err => {
        console.log(err)
      })
    }
  }
</script>
<style scoped>

</style>