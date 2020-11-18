import { BaseApi } from './base/baseApi'

const base = '/api_url/'
const baseApi = new BaseApi(base)

export function getBaseApi () {
  return baseApi
}

