<template>
  <div class="main_bg">
    <!--    背景图片-->
    <div class="login_bg">
      <img
        src="../../assets/login_1.png"
        style="width: 80px;margin-bottom: 99px; position: absolute;bottom: 0;right: 0;margin-right: 278px"
        alt=""/>
      <img src="../../assets/login_3.png"
           style="height: 123px;margin-bottom: 99px; position: absolute;top: 0;right: 0"
           alt=""/>
      <img src="../../assets/login_2.png"
           style="position: absolute;bottom: 0"
           alt=""/>
    </div>
    <div class="login_bg2">
      <div class="login">

        <div style="font-size:50px;color: black;margin-top: 280px">{{appName}}</div>

        <div style="margin-top: 15px ;font-size:16px;color: black">系统管理后台</div>

        <login-form @on-success-valid="handleSubmit"
                    style="margin-top: 50px ;width: 505px"></login-form>
        <div style="width: 505px;margin-top: 15px">
          <div style="float: right;color: #969699"> 忘记密码请联系管理员</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  import { setTagNavListInLocalstorage } from '@/libs/util'
  import { adminLogin } from '@/api/admin_user'
  import { setToken } from '@/cache/cache_utils'
  import LoginForm from '../../components/login-form/login-form'
  import config from '@/config'
  export default {
    components: { LoginForm },
    data () {
      return {
        appName: config.appName,
      }
    },
    methods: {
      handleSubmit (data) {
        adminLogin(data)
          .then(response => {
            if (response.status === 200) {
              // 登录成功
              this.$Message.info('登录成功')
              // 保存用户参数
              // 重新登录清除顶部标签
              setTagNavListInLocalstorage([])
              // 重新保存token
              setToken(response.data.token)
              //
              store.state.user.hasGetInfo = true
              store.state.user.headImage = response.data.userInfo.headImage
              // 保存权限信息
              store.state.user.access = response.data.access
              // 跳转首页
              this.$router.push({
                name: this.$config.homeName
              })
            } else {
              this.$Message.error(response.msg)
            }
          })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "login";

  .main_bg {
    height: 100%;
    background-color: #E8E5E9;
  }

  .login_bg {
    position: absolute;
    left: 50%;
    margin-left: -600px;
    width: 1200px;
    height: 100%;
  }

  .login_bg2 {
    position: absolute;
    left: 50%;
    width: 506px;
    margin-left: -228px;
    height: 100%;
  }
</style>
