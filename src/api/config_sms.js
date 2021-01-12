import { BaseApi } from './base/baseApi'

const base = '/config_sms/'
const baseApi = new BaseApi(base)

export function getBaseApi () {
  return baseApi
}
