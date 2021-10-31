<template>
  <div>
    <el-form @submit.prevent="submitForm('ruleForm')" :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
      label-width="100px" class="demo-ruleForm">
      <el-form-item label="职业">
        <el-select v-model="ruleForm.profession" placeholder="请选择身份" style="width: 300px;">
          <el-option label="学生" value="student"></el-option>
          <el-option label="教师" value="teacher"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号" prop="id">
        <el-input type="UserIdword" v-model="ruleForm.id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="UserIdword" v-model="ruleForm.password" autocomplete="off" show-password>
        </el-input>
      </el-form-item>
      <div class="checkbox"><input type="checkbox" v-model="isContinue">下次自动登录</div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="register">注册身份</el-button>
      </el-form-item>
    </el-form>
    <cube></cube>
  </div>
</template>
<script>
  import Cube from './beautify/Cube.vue'
  // import qs from 'querystring'
  export default {
    name: 'LoginPage',
    components: { Cube },
    data() {
      var validateUserId = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入工号'));
        } else {
          if (this.ruleForm.password !== '') {
            this.$refs.ruleForm.validateField('password');
          }
          callback();
        }
      };
      var validateUserId2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        else {
          callback();
        }
      };
      return {
        ruleForm: {
          id: '',
          password: '',
          profession: ''
        },
        rules: {
          id: [
            { validator: validateUserId, trigger: 'blur' }
          ],
          password: [
            { validator: validateUserId2, trigger: 'blur' }
          ]
        },
        isContinue: false
      };
    },
    methods: {
      // 提交登录信息
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.$axios.post(`emp/${this.ruleForm.profession}Login`, this.ruleForm).then(res => {
                if (res.data) {
                  this.$message({
                    message: '登录成功',
                    type: 'success',
                    center: true
                  });
                  if (this.isContinue) {
                    window.localStorage.setItem('user', JSON.stringify(this.ruleForm))
                    let token = res.data
                    window.localStorage.setItem('token', JSON.stringify(token))
                  } else {
                    window.localStorage.removeItem('user')
                    window.sessionStorage.setItem('user', JSON.stringify(this.ruleForm))
                    let token = res.data
                    window.localStorage.setItem('token', JSON.stringify(token))
                  }
                  this.$router.push(`/${this.ruleForm.profession}`)
                } else {
                  this.$message.error('用户名或密码错误')
                }
              },
              err => {
                console.log('登录请求失败')
                console.log(err)
              })
          } else {
            this.$message.error('用户名或密码错误')
            return false
          }
        });
      },
      register() {
        this.$router.push('/register')
      }
    },
    mounted() {
      if (JSON.parse(window.localStorage.getItem('user'))) {
        this.ruleForm = JSON.parse(window.localStorage.getItem('user'))
      }
    },
  }
</script>
<style scoped>
  .header {
    display: flex;
    width: 100%;
  }

  .el-form {
    margin-left: 50%;
    transform: translateX(-35%);
    border-radius: 2px;
  }

  .el-input {
    background-color: transparent;
  }

  .el-form-item {
    width: 400px;
  }

  .checkbox {
    transform: translateX(-28%);
  }
</style>