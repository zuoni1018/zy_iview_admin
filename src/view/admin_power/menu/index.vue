<template>
  <div>
    <Card>
      <Row >
        <Button @click="addMenu(0,0)" type="primary" icon="md-add" >
          添加顶部菜单
        </Button>
        <Button @click="getData" icon="md-refresh" style="margin-left: 10px;">刷新</Button>

      </Row>
      <Row style="margin-top: 10px">
        <Alert type="error">该界面为开发人员使用,后台管理人员请勿进行编辑！！！</Alert>
      </Row>
      <Row style="margin-top: 10px">
        <Tree style="width: 400px" :data="treeData" :render="renderContent"></Tree>
      </Row>
    </Card>
    <edit_root_menu :isShow="isShowEditMenuDialog" :id="clickId" :pid="pid"
                    @cancel="isShowEditMenuDialog=false"
                    @refresh="getData()"></edit_root_menu>
  </div>
</template>

<script>

  import Edit_root_menu from '@/view/admin_power/menu/root/index'
  import { getAdminMenuTree } from '@/api/admin_menu'

  export default {
    name: 'index',

    components: { Edit_root_menu},

    data () {
      return {
        isShowManagerListDialog: false,
        isShowEditMenuDialog: false,
        pid: 0,
        clickId: 0,
        treeData: [],
      }
    },

    mounted () {
      this.getData()
    },

    methods: {
      getData () {
        this.isShowEditMenuDialog = false
        getAdminMenuTree()
          .then(response => {
            if (response.status === 200) {
              this.treeData = response.data.treeList
            } else {
              this.$Message.error(response.msg)
            }
          })
          .catch(error => {
            this.tableLoading = false
          })
      },

      addMenu (pid, id) {
        // console.log("添加菜单节点" +pid +"  "+id)
        this.pid = pid
        this.clickId = id
        this.isShowEditMenuDialog = true
      },

      renderContent (h, { root, node, data }) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        }, [
          h('span', [
            h('Icon', {
              props: {
                type: 'ios-paper-outline'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.name +" 排序("+data.weight+")")
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px'
            }
          }, [
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-create-outline'
              }),
              style: {
                marginRight: '8px',
              },
              on: {
                click: () => {
                  //编辑菜单
                  this.addMenu(data.pid,data.id)
                }
              }
            }),
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-add'
              }),
              style: {
                marginRight: '8px',
                visibility: data.pid === 0 ? 'visible' : 'hidden'
              },
              on: {
                click: () => {
                  //添加菜单
                  this.addMenu(data.id,0)
                }
              }
            })
          ])
        ])
      },
    }
  }
</script>

<style scoped>

</style>
