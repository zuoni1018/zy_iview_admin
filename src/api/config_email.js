import { BaseApi } from './base/baseApi'

const base = '/config_email/'
const baseApi = new BaseApi(base)

export function getBaseApi () {
  return baseApi
}
export function sendEmailTest (param) {
  return baseApi.post('sendEmailTest', param)
}
