<template>
  <div class="home-page">
    <div class="header">
      <h1>欢迎来到余粮宝</h1>
      <van-button type="danger" size="small" @click="handleLogout">退出登录</van-button>
    </div>
    <div class="content">
      <van-cell-group>
        <van-cell title="用户信息" :value="userInfo?.phone || '未设置'" />
        <van-cell title="登录状态" value="已登录" />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { showSuccessToast } from 'vant'

const router = useRouter()
const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)

const handleLogout = () => {
  userStore.logout()
  showSuccessToast('已退出登录')
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  background-color: #f7f8fa;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: #fff;
    margin-bottom: 16px;

    h1 {
      font-size: 20px;
      color: #323233;
    }
  }

  .content {
    padding: 0 16px;
  }
}
</style>

