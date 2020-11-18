<template>

  <Modal
    :value="isShow"
    :title="title"
    @on-ok="ok"
    @on-cancel="cancel"
    :loading="loading"
    @on-visible-change="visibleChange">
    <Form :model="formDetails">
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
      <div>权限选择</div>
      <div style=" overflow:scroll; max-height: 400px">
        <Tree style="width: 400px"
              :data="treeData"
              :render="renderContent"
              show-checkbox multiple
              :check-strictly="true"
        ></Tree>
      </div>
    </Form>
  </Modal>

</template>

<script>

  import { editDialogMixin } from '@/base/EditDialogMixin'
  import { getBaseApi } from '@/api/admin_power'
  import { getAdminMenuTree } from '@/api/admin_menu'

  export default {
    name: 'save',
    mixins: [editDialogMixin],
    data () {
      return {
        // 弹窗配置
        treeData: [],
        powerList: [],
        formDetails: {
          adminPowerId: 0
        }
      }
    },
    methods: {
      renderContent (h, { root, node, data }) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        }, [
          h('span', [
            h('span', data.name)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px'
            }
          },)
        ])
      },

      //初始化数据
      initData () {

      },
      getCommonData () {
        if (this.id === 0) {
          this.title = '新增角色'
          let param = {}
          this.treeData=[]
          getAdminMenuTree(param)
            .then(response => {
              this.treeData = response.data.treeList
            })
        } else {
          this.title = '编辑角色'
        }
      },
      getData () {
        let param = {}
        param.id = this.id
        getBaseApi().selectById(param)
          .then(response => {
            this.formDetails = response.data.entity
            this.treeData = response.data.treeList
          })
      },

      ok () {
        this.loading = true
        let form = this.formDetails
        if (this.valueValidatorString(form.name, '请输入角色名称')) {
          return
        }
        this.formDetails.menuJson = JSON.stringify(this.treeData)
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
