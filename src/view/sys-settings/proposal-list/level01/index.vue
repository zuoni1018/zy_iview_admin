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
        <label>
          <Input v-model="formDetails.name"  style="width: 200px"></Input>
        </label>
      </FormItem>
      <FormItem label="图片">
        <upload-single-image
          show-image-width="100"
          original-image-height="100"
          original-image-width="100"
          :image-url="formDetails.image"
          @on-change="formDetails.image=$event"
        >
        </upload-single-image>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
  import { getBaseApi } from '../../../../api/goods_cls'
  import { editDialogMixin } from '@/base/EditDialogMixin'
  import UploadSingleImage from '@/components/upload/upload-single-image'

  export default {
    components: { UploadSingleImage },
    mixins: [editDialogMixin],
    name: 'level01',
    data () {
      return {
        formDetails: {
          image: '',
          name: '',
        },
        pid:0
      }
    },
    methods: {
      initMyFormDetails () {
        this.formDetails.image = ''
        this.formDetails.name = ''
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
            } else {
              this.$Message.error(response.msg)
            }
          })
      },

      getCommonData () {
        if (this.id === 0) {
          this.title = '添加'
        } else {
          this.title = '编辑'
        }
      },

      ok () {
        this.loading = true
        let request
        //校验表单数据
        let form = this.formDetails
        // if (this.valueValidatorString(form.image, '请上传图片')) {
        //   return
        // }
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


