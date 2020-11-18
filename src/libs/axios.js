import axios from 'axios'
import store from '@/store'
import Router from '../router/index'
import { Message } from 'view-design'
import { getToken, setToken } from '../cache/cache_utils'
import Qs from 'qs'
// import { Spin } from 'iview'
const addErrorLog = errorInfo => {
  const {statusText, status, request: {responseURL}} = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig() {
    return {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
  }

  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // // 添加全局的loading...
      // if (!Object.keys(this.queue).length) {
      //   // Spin.show() // 不建议开启，因为界面不友好
      // }
      // this.queue[url] = true
      const token = getToken();
      if (config.data === undefined) {
        //没有定义
        config.data = {};
      }
      config.data.token = token;
      // console.log(config.data);
      config.data=Qs.stringify(config.data);
      return config
    }, error => {
      return Promise.reject(error)
    });
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        this.destroy(url);
        const backDataJson = res.data;
        // console.log(backDataJson);
        //访问成功
        if (backDataJson.status === 502) {
          //token异常
          //清空本地数据
          setToken("");
          // Message.warning(backDataJson.msg);
          Router.push({path: '/login'})
        }
        //把服务端的数据返回前端处理
        return backDataJson

      }, error => {
        this.destroy(url)
        let errorInfo = error.response
        Message.warning('网络连接失败');
        return Promise.reject(error)
      })
  }

  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
