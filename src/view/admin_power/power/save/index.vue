<template>
  <Modal
    :value="isShow"
    :title="title"
    @on-ok="ok"
    @on-cancel="cancel"
    :loading="loading"
    @on-visible-change="visibleChange">

    <Form :model="formDetails" :label-width="90">
      <FormItem label="名称">
        <Input v-model="formDetails.name"></Input>
      </FormItem>

      <FormItem label="备注">
        <Input v-model="formDetails.remark"></Input>
      </FormItem>
    </Form>

  </Modal>
</template>

<script>
  import { getBaseApi } from '../../../../api/admin_power'
  import { editDialogMixin } from '@/base/EditDialogMixin'

  export default {
    mixins: [editDialogMixin],
    name: 'save',
    data () {
      return {}
    },
    methods: {

      /**
       * 获取表单数据
       */
      getData () {
        let param = {}
        param.id = this.id
        getBaseApi()
          .selectById(param)
          .then((response) => {
            if (response.status === 200) {
              this.formDetails = response.data.entity
            } else {
              this.$Message.error(response.msg)
            }
          })
      },
      getCommonData () {
        if (this.id === 0) {
          this.title = '添加角色'
        } else {
          this.title = '添加角色'
        }
      },

      ok () {
        this.loading = true
        let request
        //校验表单数据
        let form = this.formDetails

        if (this.valueValidatorString(form.name, '请输入名称')) {
          return
        }
        if (this.valueValidatorString(form.remark, '请输入备注')) {
          return
        }
        //校验完成进行提交数据
        if (this.id === 0) {
          request = getBaseApi().insert(this.formDetails)
        } else {
          request = getBaseApi().updateById(this.formDetails)
        }
        this.commit(request)
      },
    },
  }
</script>


