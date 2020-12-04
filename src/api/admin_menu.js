import { BaseApi } from './base/baseApi'

const base = '/admin_menu/'
const baseApi = new BaseApi(base)

export function getBaseApi () {
  return baseApi
}
export function getAdminMenuTree (param) {
  return baseApi.post('getAdminMenuTree', param)
}

export function getAdminMenuListByPowerId (param) {
  return baseApi.post('getAdminMenuListByPowerId', param)
}
export function updateAdminMenu (param) {
  return baseApi.post('updateAdminMenu', param)
}
