<template>
  <div class="form-container">
    <el-form :model="loginForm" label-width="80px" class="form">
      <el-form-item label="用户名">
        <el-input type="text" v-model="loginForm.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="loginForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
        <el-button>注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import ax from '@/api/api';
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const loginForm = reactive({
  username: '',
  password: '',
})

const router = useRouter()
const handleLogin = () => {
  if (loginForm.password != '' && loginForm.username != '') {
    ax.post('/users/login', loginForm).then((resp) => {
      localStorage.setItem('token', resp.data.token)
      localStorage.setItem('uid',resp.data.uid)
      router.push('/')
    }).catch((err) => {
      ElMessage.error(err.response.data.message)
      loginForm.password = ''
    })
  } else ElMessage.error('请输入账号及密码')
}
</script>
<style lang="scss" scoped>
.form-container {
  width: calc(100vw);
  height: calc(100vh);
  background-color: var(--color-stdblue-1);
  display: flex;
  justify-content: center;
  align-items: center;

  .form {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 80px;
    border-radius: 10px;
  }
}
</style>