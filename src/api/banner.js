import { BaseApi } from './base/baseApi'

const base = '/banner/'
const baseApi = new BaseApi(base)

export function getBaseApi () {
  return baseApi
}
