import { BaseApi } from './base/baseApi'

const base = '/proposal/'
const baseApi = new BaseApi(base)

export function getBaseApi () {
  return baseApi
}



