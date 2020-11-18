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
