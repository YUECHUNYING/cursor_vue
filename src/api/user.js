import request from '@/utils/request'

/**
 * 用户相关接口
 */

// 发送验证码
export function sendSmsCode(phone) {
  return request({
    url: '/user/sendSmsCode',
    method: 'post',
    data: {
      phone
    }
  })
}

// 登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

