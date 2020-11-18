import { BaseApi } from './base/baseApi'

const base = '/file/'
const baseApi = new BaseApi(base)

export function getBaseApi () {
  return baseApi
}
export function getAliOssPolicy (param) {
  return baseApi.post('getAliOssPolicy', param)
}

