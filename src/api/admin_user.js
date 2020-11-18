import { BaseApi } from './base/baseApi'

const base = '/admin_user/'
const baseApi = new BaseApi(base)

export function getBaseApi () {
  return baseApi
}
export function getMyAdminUserInfo (param) {
  return baseApi.post('getMyAdminUserInfo', param)
}

export function setMyAdminUserInfo (param) {
  return baseApi.post('setMyAdminUserInfo', param)
}

export function getMyAccess (param) {
  return baseApi.post('getMyAccess', param)
}

export function adminLogin (param) {
  return baseApi.post('adminLogin', param)
}

export function resetPassword (param) {
  return baseApi.post('resetPassword', param)
}

export function changePassword (param) {
  return baseApi.post('changePassword', param)
}

