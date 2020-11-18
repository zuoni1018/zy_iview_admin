import { BaseApi } from './base/baseApi'

const base = '/user/'
const baseApi = new BaseApi(base)

export function getBaseApi () {
  return baseApi
}
/**
 * 获取技师列表
 */
export function forbiddenTeacherAccount (param) {
  return baseApi.post('forbiddenTeacherAccount', param)
}

