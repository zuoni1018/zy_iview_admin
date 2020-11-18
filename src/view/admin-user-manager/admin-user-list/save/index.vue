<template>

  <Modal
    :value="isShow"
    :title="title"
    @on-ok="ok"
    @on-cancel="cancel"
    :loading="loading"
    @on-visible-change="visibleChange">

    <Form :model="formDetails">

      <FormItem label="姓名">
        <label>
          <Input v-model="formDetails.name" :maxlength=15></Input>
        </label>
      </FormItem>
      <FormItem label="账号">
        <label>
          <Input v-model="formDetails.mobile" :maxlength=15></Input>
        </label>
      </FormItem>

<!--      <FormItem label="邮箱">-->
<!--        <label>-->
<!--          <Input v-model="formDetails.email"></Input>-->
<!--        </label>-->
<!--      </FormItem>-->


      <FormItem label="角色">
        <label>
          <Select
            multiple
            v-model="bindPowerList"
            placeholder="选择角色">
            <Option v-for="item in powerList"
                    :value="item.id" :key="item.id">{{ item.name }}
            </Option>
          </Select>
        </label>
      </FormItem>

      <FormItem label="密码">
        <label>
          <Input v-model="formDetails.password"></Input>
        </label>

<!--        <Button style="margin-top: 10px"  type="primary" ghost v-show="id!==0" @click="resetPassword">重置</Button>-->
      </FormItem>

    </Form>
  </Modal>


</template>

<script>

  import { editDialogMixin } from '@/base/EditDialogMixin'
  import { getPowerList } from '@/api/admin_power'
  import { getBaseApi, resetPassword } from '@/api/admin_user'

  export default {
    name: 'save',
    mixins: [editDialogMixin],
    data () {
      return {
        // 弹窗配置
        powerList: [],
        bindPowerList: [28, 29, 3, 4, 5, 6, 7],
        formDetails: {
          adminPowerId: 0
        }
      }
    },
    methods: {
      //初始化数据
      initData () {

      },
      resetPassword () {
        this.$Modal.confirm({
          title: '提示',
          content: '是否重置密码？',
          onOk: () => {
            resetPassword({ id: this.id })
              .then(response => {
                if (response.status === 200) {
                  this.$Message.success(response.msg)
                } else {
                  this.$Message.error(response.msg)
                }
              })
          },
          onCancel: () => {
          }
        })
      },
      getCommonData () {
        this.bindPowerList=[];
        if (this.id === 0) {
          this.title = '新增用户'
        } else {
          this.title = '编辑用户'
        }
        getPowerList()
          .then(response => {
            this.powerList = response.data.list
          })
      },
      getData () {
        let param = {}
        param.id = this.id
        getBaseApi().selectById(param)
          .then(response => {
            this.formDetails = response.data.entity
            this.bindPowerList = response.data.powerList
          })
      },

      ok () {
        this.loading = true
        let form = this.formDetails
        if (this.valueValidatorString(form.name, '请输入用户姓名')) {
          return
        }
        if (this.valueValidatorString(form.mobile, '请输入手机号')) {
          return
        }
        this.formDetails.powerIds = JSON.stringify(this.bindPowerList)
        let request
        //校验完成进行提交数据
        if (this.id === 0) {
          //新增
          request = getBaseApi().insert(this.formDetails)
        } else {
          //更新
          request = getBaseApi().updateById(this.formDetails)
        }
        this.commit(request)
      },
    },
  }
</script>

<style scoped>

</style>
