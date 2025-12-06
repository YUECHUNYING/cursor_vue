<template>
  <div class="login-page">
    <!-- 导航栏 -->
    <div class="nav-bar">
      <div class="nav-left" @click="handleBack">
        <van-icon name="arrow-left" size="20" />
      </div>
      <div class="nav-title">余粮宝</div>
      <div class="nav-right" @click="handleMore">
        <van-icon name="ellipsis" size="20" />
      </div>
    </div>

    <!-- 提示横幅 -->
    <div class="alert-banner">
      提示:该号码将作为用户实名认证,手机号与身份证为同一人。
    </div>

    <!-- Logo和品牌 -->
    <div class="brand-section">
      <div class="logo">
        <div class="logo-circle">
          <div class="logo-leaf"></div>
        </div>
      </div>
      <div class="brand-name">余粮宝</div>
      <div class="brand-website">Yuliangbao.com</div>
      <div class="brand-desc">余粮宝数字农业服务平台</div>
    </div>

    <!-- 登录表单 -->
    <div class="login-form">
      <div class="form-item">
        <van-field
          v-model="form.phone"
          type="tel"
          placeholder="请输入新的手机号码"
          maxlength="11"
          clearable
          @input="handlePhoneInput"
        />
      </div>
      <div class="form-item">
        <van-field
          v-model="form.code"
          type="number"
          placeholder="请输入验证码"
          maxlength="6"
          clearable
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              :disabled="!canSendCode || countdown > 0"
              @click="handleSendCode"
            >
              {{ countdown > 0 ? `${countdown}秒` : '获取验证码' }}
            </van-button>
          </template>
        </van-field>
      </div>
      <div class="form-item">
        <van-button
          type="primary"
          block
          :disabled="!canLogin"
          :loading="loading"
          @click="handleLogin"
        >
          登录
        </van-button>
      </div>
    </div>

    <!-- 协议同意 -->
    <div class="agreement">
      <van-checkbox v-model="agreed" shape="square">
        <span class="agreement-text">
          阅读并同意我们的
          <span class="link" @click="handleServiceAgreement">服务协议</span>、
          <span class="link" @click="handlePrivacyAgreement">隐私协议</span>
        </span>
      </van-checkbox>
    </div>

    <!-- 底部信息 -->
    <div class="footer-info">
      <div class="footer-item">京ICP备18048982号-1</div>
      <div class="footer-item">
        <span class="red-dot">●</span>京公网安备11010502039941号
      </div>
      <div class="footer-item">京网信备1101081971596078003x号</div>
      <div class="footer-item">增值电信业务经营许可证京B2-20200408</div>
      <div class="footer-item">© 2023 Stringom.com 余粮宝科技 版权所有</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { sendSmsCode, login } from '@/api/user'
import { validatePhone, validateCode } from '@/utils'
import { showToast, showSuccessToast, showFailToast } from 'vant'

const router = useRouter()
const userStore = useUserStore()

const form = ref({
  phone: '',
  code: ''
})

const agreed = ref(false)
const loading = ref(false)
const countdown = ref(0)
let countdownTimer = null

// 是否可以发送验证码
const canSendCode = computed(() => {
  return validatePhone(form.value.phone)
})

// 是否可以登录
const canLogin = computed(() => {
  return (
    validatePhone(form.value.phone) &&
    validateCode(form.value.code) &&
    agreed.value
  )
})

// 手机号输入
const handlePhoneInput = () => {
  // 只允许输入数字
  form.value.phone = form.value.phone.replace(/\D/g, '')
}

// 发送验证码
const handleSendCode = async () => {
  if (!canSendCode.value) {
    showToast('请输入正确的手机号')
    return
  }

  try {
    await sendSmsCode(form.value.phone)
    showSuccessToast('验证码已发送')
    
    // 开始倒计时
    countdown.value = 60
    countdownTimer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(countdownTimer)
        countdownTimer = null
      }
    }, 1000)
  } catch (error) {
    showFailToast(error.message || '发送验证码失败')
  }
}

// 登录
const handleLogin = async () => {
  if (!canLogin.value) {
    if (!validatePhone(form.value.phone)) {
      showToast('请输入正确的手机号')
      return
    }
    if (!validateCode(form.value.code)) {
      showToast('请输入验证码')
      return
    }
    if (!agreed.value) {
      showToast('请先同意服务协议和隐私协议')
      return
    }
    return
  }

  loading.value = true
  try {
    const res = await login({
      phone: form.value.phone,
      code: form.value.code
    })
    
    // 保存token和用户信息
    userStore.setToken(res.data?.token || res.token)
    userStore.setUserInfo(res.data?.userInfo || res.userInfo)
    
    showSuccessToast('登录成功')
    
    // 跳转到首页
    setTimeout(() => {
      router.push('/home')
    }, 500)
  } catch (error) {
    showFailToast(error.message || '登录失败')
  } finally {
    loading.value = false
  }
}

// 返回
const handleBack = () => {
  router.back()
}

// 更多选项
const handleMore = () => {
  // 可以显示更多操作菜单
  showToast('更多选项')
}

// 服务协议
const handleServiceAgreement = () => {
  // 跳转到服务协议页面
  showToast('服务协议')
}

// 隐私协议
const handlePrivacyAgreement = () => {
  // 跳转到隐私协议页面
  showToast('隐私协议')
}

// 组件卸载时清除定时器
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 20px;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding: 0 16px;
  background-color: #fff;
  border-bottom: 1px solid #ebedf0;

  .nav-left,
  .nav-right {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .nav-title {
    font-size: 18px;
    font-weight: 500;
    color: #323233;
  }
}

.alert-banner {
  background-color: #ff9500;
  color: #fff;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.5;
}

.brand-section {
  text-align: center;
  padding: 40px 0 30px;
  background-color: #fff;

  .logo {
    margin-bottom: 16px;

    .logo-circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: #1a7c3a;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .logo-leaf {
        width: 50px;
        height: 50px;
        background: radial-gradient(circle, #fff 2px, transparent 2px);
        background-size: 8px 8px;
        border-radius: 50%;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #fff 0%, transparent 50%);
          border-radius: 50%;
        }
      }
    }
  }

  .brand-name {
    font-size: 24px;
    font-weight: 500;
    color: #323233;
    margin-bottom: 8px;
  }

  .brand-website {
    font-size: 14px;
    color: #07c160;
    margin-bottom: 16px;
  }

  .brand-desc {
    font-size: 16px;
    color: #323233;
  }
}

.login-form {
  padding: 20px 16px;
  background-color: #fff;
  margin-top: 20px;

  .form-item {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(.van-field) {
    background-color: #f7f8fa;
    border-radius: 4px;
  }

  :deep(.van-button) {
    height: 44px;
    border-radius: 4px;
    font-size: 16px;
  }

  :deep(.van-button--disabled) {
    background-color: #c8c9cc;
    border-color: #c8c9cc;
  }
}

.agreement {
  padding: 16px;
  display: flex;
  align-items: flex-start;

  :deep(.van-checkbox) {
    align-items: flex-start;
  }

  .agreement-text {
    font-size: 14px;
    color: #646566;
    line-height: 1.5;
    margin-left: 8px;

    .link {
      color: #1989fa;
      cursor: pointer;
    }
  }
}

.footer-info {
  padding: 20px 16px;
  text-align: center;
  font-size: 12px;
  color: #969799;
  line-height: 1.8;

  .footer-item {
    margin-bottom: 4px;

    .red-dot {
      color: #ee0a24;
      margin-right: 4px;
    }
  }
}
</style>

