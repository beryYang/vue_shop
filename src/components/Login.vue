<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" />
      </div>
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef"  label-width="0px" class="login_form">
      <el-form-item prop="username">
          <el-input v-model="loginForm.username"><i slot="prefix" class="iconfont icon-user"></i></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" show-password><i slot="prefix" class="iconfont icon-3702mima"></i></el-input>
        </el-form-item>
        <el-form-item class="bts">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) return
        const { data: result } = await this.$http.post('login', this.loginForm)
        console.log(result)
        if (result.meta.status !== 200) return this.$message.error(result.meta.msg)
        // 登陆成功 保存token
        this.$message.success('登录成功')
        console.log(result.data.token)
        window.sessionStorage.setItem('token', result.data.token)
        // 跳转页面
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form{
    position: absolute;
    bottom:0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

}
.bts{
    display: flex;
    justify-content: flex-end;
}
</style>
