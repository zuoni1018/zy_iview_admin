import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import config from '@/config'
import { canTurnTo, setTitle } from '../libs/util'
import { getToken } from '../cache/cache_utils'
import { getMyAccess } from '@/api/admin_user'
import { setToken } from '@/cache/cache_utils'

const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) {
    next()
  }// 有权限，可访问
  else {
    next({ replace: true, name: 'error_401' })
  } // 无权限，重定向到401页面
}

// 跳转之前判断一下
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  // console.log(to.name)
  if (to.name === 'app_download') {
    next()
    return
  }
  if (to.name === 'camera-play') {
    next()
    return
  }
  // console.log("token  "+token);
  if (token === '' && to.name !== LOGIN_PAGE_NAME) {
    // console.log("未登录且要跳转的页面不是登录页");
    next({
      name: LOGIN_PAGE_NAME
    })
  } else if (token === '' && to.name === LOGIN_PAGE_NAME) {
    // console.log("未登陆且要跳转的页面是登录页");
    next() // 跳转
  } else if (token !== '' && to.name === LOGIN_PAGE_NAME) {
    // console.log("已登录且要跳转的页面是登录页");
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    // console.log("其他状态");
    //判断有无拉去用户信息
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next)
    } else {
      getMyAccess()
        .then(response => {
          let status = response.status
          if (status === 200) {
            store.state.user.hasGetInfo = true
            store.state.user.access = response.data.access
            store.state.user.headImage = response.data.userInfo.headImage
            turnTo(to, response.data.access, next)
          } else {
            //拿不到清空登录状态
            setToken('')
            next({
              name: 'login'
            })
          }
        })
        .catch(error => {
          setToken('')
          next({
            name: 'login'
          })
        })
    }

  }
})

router.afterEach(to => {

  if(to.name==='camera-play'){
    window.document.title = '直播详情'
  }else {
    setTitle(to, router.app)
  }
  window.scrollTo(0, 0)
  iView.LoadingBar.finish()
})

export default router
