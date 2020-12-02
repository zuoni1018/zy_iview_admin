<style scoped>

</style>
<template>
  <Modal
    :value="isShow"
    :title="title"
    :closable="false"
    :mask-closable="false"
    @on-visible-change="visibleChange">
    <Form  v-if="formDetails!==undefined" :model="formDetails" :label-width="100">
      <FormItem label="用户头像" prop="">
        <upload-single-image
          show-image-width="100"
          original-image-height="100"
          original-image-width="100"
          :image-url="formDetails.headImage"
          @on-change="formDetails.headImage=$event"
        >
        </upload-single-image>
      </FormItem>
      <Row>
        <Col span="12">
          <FormItem label="昵称">
            <label>
              <Input v-model="formDetails.nickName" :maxlength=15></Input>
            </label>
          </FormItem>
        </Col>
      </Row>
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
  import { getBaseApi } from '@/api/users'
  import { genderList, userPowerList } from '@/utils/DataUtils'
  import { editDialogMixin } from '@/base/EditDialogMixin2'

  export default {
    components: {},
    mixins: [editDialogMixin],
    name: 'edit-dialog',
    data () {
      return {
        title: '',
        genderList: genderList,
        userPowerList: userPowerList,
      }
    },
    methods: {
      getCommonData () {
        if (this.id !== 0) {
          this.title = '编辑用户资料'
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
      //确认按钮点击事件
      ok () {
        //数据校验
        //开始提交表单 不允许其他操作
        this.loading = true
        //校验完成进行提交数据
        this.commit(getBaseApi().updateById(this.formDetails))
      },

    },
  }
</script>


