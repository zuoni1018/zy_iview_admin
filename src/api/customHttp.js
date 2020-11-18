import axios from "@/libs/api.request";

export function post(mUrl, param) {
  return axios.request({
    url: mUrl,
    method: 'post',
    data: param
  })
}
export function uploadFileToOss(mUrl, param) {
  return axios.request({
    url: mUrl,
    method: 'post',
    data: param
  })
}
