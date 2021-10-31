<template>
  <div>
    <el-form @submit.prevent="submitForm('ruleForm')" :model="ruleForm" :rules="rules" ref="ruleForm"
      label-width="100px" class="demo-ruleForm">
      <el-form-item label="职业" prop="profession">
        <el-select v-model="ruleForm.profession" placeholder="请选择职业">
          <el-option label="学生" value="Student"></el-option>
          <el-option label="教师" value="Teacher"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所授课程" prop="course" v-show="ruleForm.profession === 'Teacher'">
        <el-input v-model="ruleForm.course"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="ruleForm.sex" placeholder="请选择性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" prop="phonenumber">
        <el-input v-model="ruleForm.phonenumber"></el-input>
      </el-form-item>
      <el-form-item label="工号" prop="id">
        <el-input v-model="ruleForm.id"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="学院" prop="dept">
        <el-select v-model="ruleForm.dept" placeholder="请选择学院">
          <el-option label="公共管理学院" value="公共管理学院"></el-option>
          <el-option label="信息学院" value="信息学院"></el-option>
          <el-option label="生命科学技术学院" value="生命科学技术学院"></el-option>
          <el-option label="医学院" value="医学院"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <cube style="position: absolute;left: 700px;top: 100px;width: 200px"></cube>
  </div>
</template>
<script>
  import Cube from './beautify/Cube.vue'
  export default {
    name: 'RegisterPage',
    components: { Cube },
    data() {
      return {
        ruleForm: {
          name: '',  //姓名
          sex: '',   //性别
          phonenumber: '',  //手机号
          id: '',     //工号或者学号
          password: '',  //账户密码
          dept: '',       //所在学院
          profession: '',   //身份职业
          course: '',  //老师教授的课程
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          phonenumber: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          id: [
            { required: true, message: '请输入工号', trigger: 'blur' },
            { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, max: 16, message: '长度在 8 到16 个字符', trigger: 'blur' }
          ],
          dept: [
            { required: true, message: '请选择学院', trigger: 'change' }
          ],
          profession: [
            { required: false, message: '请选择职业', trigger: 'change' }
          ],
          course: [
            { required: false, message: '清选择教授的课程', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      // 提交注册信息
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post(`emp/${this.ruleForm.profession}Save`, this.ruleForm).then(res => {
              if (res.data) {
                this.$message({
                  message: '注册成功',
                  type: 'success',
                  center: true
                })
                this.$router.push('/')
              } else {
                this.$message.error('注册失败,可能是账号格式问题')
              }
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 重新输入
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .el-form-item {
    width: 500px;
  }
</style>