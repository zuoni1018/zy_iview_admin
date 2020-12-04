import { BaseApi } from './base/baseApi'

const base = '/admin_power/'
const baseApi = new BaseApi(base)

export function getBaseApi () {
  return baseApi
}
export function setPowerMenu (param) {
  return baseApi.post('setPowerMenu', param)
}
export function getPowerList (param) {
  return baseApi.post('getPowerList', param)
}
export function updateAdminPowerList (param) {
  return baseApi.post('updateAdminPowerList', param)
}
export function getAdminPowerList (param) {
  return baseApi.post('getAdminPowerList', param)
}
