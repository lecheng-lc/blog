<template>
  <div class="page-content" style="height: 100%">
    <div class="login-container">
      <SwitchDark />
      <div class="login-box">
        <div class="login-left">
          <img src="../assets/imgs/login-left.png" alt="login" />
        </div>
        <div class="login-form">
          <div class="login-logo">
            <img class="login-icon" src="../assets/imgs/logo.png" alt="logo" />
            <span class="logo-text">CMS-Admin</span>
          </div>
          <div class="form-content">
            <a-form labelAlign="left" :model="formState" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }"
              autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
              <a-form-item label="账号" name="username" :rules="[{ required: true, message: '请输入您的用户名' }]">
                <a-input v-model:value="formState.username" placeholder="请输入您的账号" />
              </a-form-item>
              <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入您的密码' }]">
                <a-input-password v-model:value="formState.password" placeholder="请输入您的密码 " />
              </a-form-item>
              <a-form-item label="验证码" name="verityCode" :rules="[{ required: true, message: '请输入验证码' }]">
                <a-input v-model:value="formState.verityCode" placeholder="请输入验证码" />
              </a-form-item>
              <div class="code-wrapper">
                <img :src="imgSrc" @click="getImgCodeData" id="fresh-code" class="imagecode-img" />
              </div>
              <a-form-item :wrapper-col="{ span: 24 }">
                <div class="btn-list">
                  <a-button type="reset" :disabled="iconLoading" html-type="reset"
                    class="css-button-3d--sand">重置</a-button>
                  <a-button :loading="iconLoading" html-type="submit" class="css-button-3d--sky">登录</a-button>
                </div>
              </a-form-item>
            </a-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { loginAdmin } from '@/api/login'
import { message, type FormProps } from 'ant-design-vue'
import SwitchDark from '@/components/SwitchDark.vue'
interface FormState {
  username: string
  password: string
  verityCode: string
}
const Router = useRouter()
const formState = reactive<FormState>({
  username: '',
  password: '',
  verityCode: ''
})
const iconLoading = ref(false)
const onFinish: FormProps['onFinish'] = async (form) => {
  iconLoading.value = true
  const params = {
    userName: form['username'],
    password: form['password'],
    imageCode: form['verityCode']
  }
  const [, res] = await loginAdmin(params)
  if (res) {
    message.success({
      content: '登陆成功',
      key: 'message',
      duration: 1.5,
      style: {
        marginTop: '40vh'
      },
      onClose() {
        iconLoading.value = false
        Router.push('/admin/dashbord')
      }
    })
  }
}

const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
let imgSrc = ref('')
const getImgCodeData = () => {
  imgSrc.value = `${import.meta.env.VITE_ADMIN_API_URL}/api/getImgCode?${Math.random()}`
}
getImgCodeData()
</script>
<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 550px;
  height: 100%;
  min-height: 500px;
  background-color: #eeeeee;
  background: url('../assets/imgs/login-bg.svg');
  background-position: 50%;
  background-size: 100% 100%;
  background-size: cover;
  position: relative;

  ::v-deep .dark {
    position: absolute;
    top: 5%;
    right: 3.2%;
  }

  .login-form {
    padding: 40px 45px 25px;
    border-radius: 10px;
    box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.2);

    .form-content {
      padding: 15px 12px;
    }

    .login-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;

      .login-icon {
        width: 70px;
      }

      .logo-text {
        padding-left: 25px;
        font-size: 48px;
        font-weight: bold;
        color: #475768;
        white-space: nowrap;
      }
    }
  }

  .login-box {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 96%;
    height: 94%;
    padding: 0 4% 0 20px;
    overflow: hidden;
    background-color: hsla(0, 0%, 100%, 0.8);
    border-radius: 10px;
    color: red !important;

    .login-left {
      width: 750px;
      margin-right: 20px;

      img {
        width: 750px;
      }
    }
  }
}

.css-button-3d--sky {
  min-width: 130px;
  height: 40px;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  border: none;
  background: #3a86ff;
  box-shadow: 0 5px #4433ff;
}

.css-button-3d--sky:hover {
  box-shadow: 0 3px #4433ff;
  top: 1px;
  color: #fff !important;
}

.css-button-3d--sky:active {
  box-shadow: 0 0 #4433ff;
  top: 5px;
}

.css-button-3d--sand {
  min-width: 130px;
  height: 40px;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  border: none;
  background: #ced4da;
  box-shadow: 0 5px #adb5bd;
}

.css-button-3d--sand:hover {
  box-shadow: 0 3px #adb5bd;
  top: 1px;
}

.css-button-3d--sand:active {
  box-shadow: 0 0 #adb5bd;
  top: 5px;
}

.btn-list {
  display: flex;
  justify-content: space-between;
}

.code-wrapper {
  padding-left: 90px;
  margin-bottom: 10px;
  margin-top: -10px;
}
</style>
// https://www.pipipi.net/questions/17254.html
