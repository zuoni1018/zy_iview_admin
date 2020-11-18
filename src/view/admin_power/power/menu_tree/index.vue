<template>
  <Modal
    :value="isShow"
    title="权限配置"
    @on-ok="ok"
    @on-cancel="cancel"
    :loading="loading"
    @on-visible-change="visibleChange">

    <Tree style="width: 400px"
          :data="treeData"
          :render="renderContent"
          show-checkbox multiple
          :check-strictly="true"
    ></Tree>

  </Modal>
</template>

<script>
  import { editDialogMixin } from '@/base/EditDialogMixin'
  import { getAdminMenuListByPowerId } from '@/api/admin_menu'
  import { setPowerMenu } from '@/api/admin_power'

  export default {
    mixins: [editDialogMixin],
    name: 'menu_tree',
    data () {
      return {
        treeData: [],
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
            h('span', data.name )
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px'
            }
          }, )
        ])
      },

      /**
       * 获取表单数据
       */
      getData () {
        let param = {}
        param.id = this.id
        getAdminMenuListByPowerId(param)
          .then((response) => {
            if (response.status === 200) {
              this.treeData = response.data.treeList
            } else {
              this.$Message.error(response.msg)
            }
          })
      },
      ok () {
        this.loading = true
        let request
        //校验表单数据
        let form = {};
        form.id=this.id;
        form.menuJson=JSON.stringify(this.treeData);
        request = setPowerMenu(form)
        this.commit(request)
      },
    },
  }
</script>


