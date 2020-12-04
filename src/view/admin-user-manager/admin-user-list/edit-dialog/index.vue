<template>

  <Modal
    :value="isShow"
    :title="title"
    :closable="false"
    :mask-closable="false"
    @on-visible-change="visibleChange">
    <Form :model="formDetails" v-if="formDetails!==undefined">
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
      </FormItem>
      <FormItem label="状态">
        <RadioGroup v-model="formDetails.state">
          <Radio label="normal">正常</Radio>
          <Radio label="forbidden">禁止</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <div slot="footer">
      <EditDialogBottomButton
        :loading="loading"
        @handleCancel="cancel"
        @handleOk="ok"
      ></EditDialogBottomButton>
    </div>
  </Modal>
</template>

<script>

  import { editDialogMixin } from '@/base/EditDialogMixin2'
  import { getPowerList } from '@/api/admin_power'
  import { getBaseApi } from '@/api/admin_user'

  export default {
    name: 'edit-dialog',
    mixins: [editDialogMixin],
    data () {
      return {
        // 弹窗配置
        powerList: [],
        bindPowerList: [],
      }
    },
    methods: {
      getCommonData () {
        this.bindPowerList = []
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
      getDefaultForm () {
        return {
          name: '',
          mobile: '',
          password: '',
          state: 'normal'
        }
      },
      ok () {
        let form = this.formDetails
        console.log(form)
        if (this.valueValidatorString(form.name, '请输入用户姓名')) {
          return
        }
        if (this.valueValidatorString(form.mobile, '请输入手机号')) {
          return
        }
        this.formDetails.powerIds = JSON.stringify(this.bindPowerList)
        let request
        //校验完成进行提交数据
        request = getBaseApi().insert(this.formDetails)
        this.commit(request)
      },
    },
  }
</script>

<style scoped>

</style>
