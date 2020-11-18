<style lang="less" scoped>
  /deep/ .ivu-input {
    height: 54px;
  }
</style>
<template>
  <div>
    <div style="font-size: 16px;color: #7D7D80">
      账户名
    </div>
    <label>
      <Input
        v-model="form.account"
        placeholder="请输入账号"
        style="width: 100% ">
      </Input>
    </label>
    <div style="font-size: 16px;color: #7D7D80;margin-top: 26px">
      密码
    </div>
    <label>
      <Input
        type="password"
        v-model="form.password"
        @on-enter="handleSubmit"
        placeholder="请输入密码">
      </Input>
    </label>
    <Button @click="handleSubmit" style=" margin-top: 40px;height: 54px" type="primary" long>登录
    </Button>
  </div>
</template>
<script>
  export default {
    name: 'LoginForm',

    data() {
      return {
        form: {
          account: '',
          password: ''
        }
      }
    },
    methods: {
      handleSubmit() {
        if (this.form.account === '') {
          this.$Message.info('请输入账号')
          return
        }
        if (this.form.password === '') {
          this.$Message.info('请输入密码')
          return
        }
        this.$emit('on-success-valid', this.form)
      }
    }
  }
</script>

