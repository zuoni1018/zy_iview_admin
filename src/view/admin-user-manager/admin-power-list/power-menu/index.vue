<template>

  <Modal
    :value="isShow"
    :title="title"
    width="600"
    :closable="false"
    :mask-closable="false"
    @on-visible-change="visibleChange">
    <div>权限选择</div>
    <div style=" overflow:scroll; height: 480px">
      <Tree style="width: 500px"
            :data="treeData"
            :render="renderContent"
            show-checkbox multiple
            :check-strictly="true"
      ></Tree>
    </div>
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
  import { getAdminPowerList, updateAdminPowerList } from '@/api/admin_power'

  export default {
    name: 'power-menu',
    mixins: [editDialogMixin],
    data () {
      return {
        // 弹窗配置
        treeData: [],
        powerList: [],
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
      setTitle () {
        this.title = '菜单管理'
      },
      getData () {
        let param = {}
        param.id = this.id
        getAdminPowerList(param)
          .then(response => {
            this.treeData = response.data.treeList
          })
      },
      ok () {
        this.loading = true
        let menuJson = JSON.stringify(this.treeData)
        let request
        //校验完成进行提交数据
        request = updateAdminPowerList({ menuJson: menuJson, id: this.id })
        this.commit(request)
      },
    },
  }
</script>

<style scoped>

</style>
