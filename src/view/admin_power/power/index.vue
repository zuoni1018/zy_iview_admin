<template>
  <div>
    <Card>
      <Row>
        <Button @click="showEditDialog(0)" type="primary" icon="md-add">添加角色</Button>
        <Button @click="reFreshData" icon="md-refresh" style="margin-left: 10px">刷新</Button>
      </Row>
      <Row style="margin-top: 10px;">
        <Table
          :loading="tableLoading"
          border
          :columns="columnsData"
          :data="tableList"
          ref="table"
          sortable="custom"
          @on-sort-change="onSortChange"
          @on-selection-change="onSelectionChange"
        ></Table>
      </Row>
      <Row type="flex" justify="end" class="page" style="margin-top: 10px;">
        <Page
          :current="pageParam.pageNum"
          :total="total"
          :page-size="pageParam.pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size-opts="pageSizeOpts"
          size="small"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </Row>
    </Card>
    <Save :isShow="isShowEditDialog" :id="clickId" @cancel="isShowEditDialog=false"
          @refresh="baseRefresh(false)"></Save>

    <menu_tree :isShow="isShowMenuTreeDialog" :id="clickId" @cancel="isShowMenuTreeDialog=false"
               @refresh="isShowMenuTreeDialog=false"></menu_tree>


  </div>
</template>

<script>

  import Save from '@/view/admin_power/power/save/index'
  import { getBaseApi } from '@/api/admin_power'
  import { defaultTableMixin } from '@/common/DefaultTableMixin'
  import Menu_tree from '@/view/admin_power/power/menu_tree/index'

  export default {
    name: 'index',
    mixins: [defaultTableMixin],
    components: { Menu_tree, Save },

    data () {
      return {
        isShowMenuTreeDialog: false,

        columnsData: [
          { type: 'index', width: 60, align: 'center' },
          { title: '角色名称', key: 'name',minWidth:180, align: 'center' },
          { title: '备注', key: 'remark',minWidth:180, align: 'center' },
          { title:  '创建时间', key: 'createTime',minWidth:180, align: 'center' },
          {
            title: '操作',
            width: 400,
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.showEditDialog(params.row.id)
                      }
                    }
                  }, '编辑'),
                  h('Button', {
                    props: {
                      type: 'info',
                      size: 'small',
                      disabled: params.row.id === 1
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.clickId = params.row.id
                        this.isShowMenuTreeDialog = true
                      }
                    }
                  }, '权限配置'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small',
                      disabled: params.row.id === 1
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: '提示',
                          content: '是否删除该权限',
                          onOk: () => {
                            let p = {}
                            p.id = params.row.id
                            getBaseApi().deleteById(p)
                              .then(response => {
                                if (response.status === 200) {
                                  this.$Message.success(response.msg)
                                  this.baseRefresh(true)
                                } else {
                                  this.$Message.error(response.msg)
                                }
                              })
                          },
                          onCancel: () => {
                          }
                        })
                      }
                    }
                  }, '删除'),
                ]
              )
            }
          }
        ],
        threeData: [],
        buttonProps: {
          type: 'default',
          size: 'small',
        }
      }

    },
    methods: {
      selectPage () {
        let param = this.getDefaultPageParam()
        this.defaultSelectPage(getBaseApi().selectPage(param))
      },
    }
  }
</script>

<style scoped>

</style>
