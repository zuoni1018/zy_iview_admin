<template>

  <Modal
    :value="isShow"
    :title="title"
    @on-ok="ok"
    @on-cancel="cancel"
    :loading="loading"
    @on-visible-change="visibleChange">

    <Form :model="formDetails">

      <FormItem label="路由">
        <label>
          <Input v-model="formDetails.url" disabled></Input>
        </label>
      </FormItem>
      <FormItem label="备注">
        <label>
          <Input v-model="formDetails.remark"></Input>
        </label>
      </FormItem>


      <FormItem label="权限">
        <br>

        <div>
          <Checkbox
            v-model="formDetails.candidatePower"
            :true-value="1"
            :false-value="0"
          >候选人权限
          </Checkbox>

          <Checkbox
            v-model="formDetails.postPower"
            :true-value="1"
            :false-value="0"
          >岗位权限
          </Checkbox>
          <Checkbox
            v-model="formDetails.resumePower"
            :true-value="1"
            :false-value="0"
          >简历权限
          </Checkbox>
        </div>
      </FormItem>
    </Form>
  </Modal>


</template>

<script>

  import {editDialogMixin} from '@/base/EditDialogMixin'
  import {getBaseApi} from '@/api/api_url'

  export default {
    name: 'save',
    mixins: [editDialogMixin],
    data() {
      return {
        // 弹窗配置
        powerList: [],
        bindPowerList: [28, 29, 3, 4, 5, 6, 7],
        formDetails: {
          candidatePower: 0,
          postPower: 0,
          resumePower: 0
        }
      }
    },
    methods: {
      //初始化数据
      initData() {

      },

      getCommonData() {
        this.bindPowerList = [];
        this.title = '权限配置'

        this.formDetails = {
          candidatePower: 0,
          postPower: 0,
          resumePower: 0
        }

      },
      getData() {
        let param = {}
        param.id = this.id
        getBaseApi().selectById(param)
          .then(response => {
            this.formDetails = response.data.entity
          })
      },

      ok() {
        this.loading = true
        let form = this.formDetails
        let request = getBaseApi().updateById(this.formDetails)
        this.commit(request)
      },
    },
  }
</script>

<style scoped>

</style>
