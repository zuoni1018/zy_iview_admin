<template>
  <Modal
    :value="isShow"
    :title="title"
    :closable="false"
    :mask-closable="false"
    @on-visible-change="visibleChange">
    <Form :model="formDetails" v-if="formDetails!==undefined">
      <FormItem label="角色名称">
        <label>
          <Input v-model="formDetails.name" :maxlength=15></Input>
        </label>
      </FormItem>
      <FormItem label="备注">
        <label>
          <Input v-model="formDetails.remark" :maxlength=15></Input>
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
  import { getBaseApi } from '@/api/admin_power'

  export default {
    name: 'edit-dialog',
    mixins: [editDialogMixin],
    data () {
      return {}
    },
    methods: {

      getDefaultForm () {
        return {
          state: 'normal'
        }
      },

      getData () {
        let param = {}
        param.id = this.id
        getBaseApi().selectById(param)
          .then(response => {
            this.formDetails = response.data.entity
          })
      },

      ok () {
        this.loading = true
        let form = this.formDetails
        if (this.valueValidatorString(form.name, '请输入角色名称')) {
          return
        }
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
