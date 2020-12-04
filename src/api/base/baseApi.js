import axios from '@/libs/api.request'

export class BaseApi {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }

  post (mUrl, param, isGetUrl) {
    if (isGetUrl) {
      let mRequest = {}
      mRequest.url = this.baseUrl + mUrl
      mRequest.param = param
      return mRequest
    } else {
      return axios.request({
        url: this.baseUrl + mUrl,
        method: 'post',
        data: param
      })
    }
  }

  selectPage (param, isGetUrl) {
    return this.post('selectPage', param, isGetUrl)
  }

  insert (param, isGetUrl) {
    return this.post('insert', param, isGetUrl)
  }

  selectById (param, isGetUrl) {
    return this.post('selectById', param, isGetUrl)
  }

  updateById (param, isGetUrl) {
    return this.post('updateById', param, isGetUrl)
  }

  deleteById (param, isGetUrl) {
    return this.post('deleteById', param, isGetUrl)
  }

  forbiddenById (param, isGetUrl) {
    return this.post('forbiddenById', param, isGetUrl)
  }

  batchDeleteById (param, isGetUrl) {
    return this.post('batchDeleteById', param, isGetUrl)
  }

  getDeleteUrl () {
    return this.baseUrl + 'deleteById'
  }

}
