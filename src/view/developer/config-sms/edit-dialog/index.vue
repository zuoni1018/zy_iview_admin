<style scoped>

</style>
<template>
  <Modal
    :value="isShow"
    :title="title"
    :closable="false"
    :mask-closable="false"
    @on-visible-change="visibleChange">
    <Form v-if="formDetails!==undefined" :model="formDetails" :label-width="100">
      <Row>
        <Col span="12">
          <FormItem label="templateCode">
            <label>
              <Input v-model="formDetails.templateCode"></Input>
            </label>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="regionId">
            <label>
              <Input v-model="formDetails.regionId"></Input>
            </label>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="signName">
            <label>
              <Input v-model="formDetails.signName"></Input>
            </label>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="remark">
            <label>
              <Input v-model="formDetails.remark"></Input>
            </label>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="tag">
            <label>
              <Input v-model="formDetails.tag"></Input>
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
  import { getBaseApi } from '@/api/config_sms'
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
      getDefaultForm () {
        return {
          ossBucketName: '',
          regionId: '',
          signName: '',
          remark: '',
          tag: '',
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


