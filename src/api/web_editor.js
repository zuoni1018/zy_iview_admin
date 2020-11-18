import { BaseApi } from './base/baseApi'

const base = '/web_editor/'
const baseApi = new BaseApi(base)

export function getBaseApi () {
  return baseApi
}


