<template>
  <Modal
    :value="isShow"
    title="菜单编辑"
    @on-ok="ok"
    @on-cancel="cancel"
    :loading="loading"
    @on-visible-change="visibleChange">

    <Form :model="formDetails" :label-width="90">

      <FormItem label="菜单名称">
        <Input v-model="formDetails.name"></Input>
      </FormItem>
      <FormItem label="菜单路由">
        <Input v-model="formDetails.path"></Input>
      </FormItem>
      <FormItem label="排序值">
        <Tooltip trigger="hover" placement="right" content="值越小越靠前，支持小数">
          <InputNumber :max="5000" :min="0" v-model="formDetails.weight"></InputNumber>
        </Tooltip>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
  import { getBaseApi } from '../../../../api/admin_menu'
  import { editDialogMixin } from '@/base/EditDialogMixin'

  export default {
    mixins: [editDialogMixin],
    name: 'edit_root_menu',
    props: {
      pid: {
        default: 0,
      },
    },
    data () {
      return {
        formDetails: {
          weight: 0,
        },
      }
    },
    methods: {

      initMyFormDetails () {
        this.formDetails.weight = 0
      },

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
              this.shelfType = response.data.entity.state + ''
              this.content = response.data.entity.content
            } else {
              this.$Message.error(response.msg)
            }
          })
      },

      ok () {
        this.loading = true
        let request
        //校验表单数据
        let form = this.formDetails

        if (this.valueValidatorString(form.name, '菜单名称')) {
          return
        }
        if (this.valueValidatorString(form.path, '菜单路由')) {
          return
        }
        form.pid = this.pid

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


