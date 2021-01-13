<style scoped>

</style>
<template>
  <div>
    <Card style="margin-bottom: 10px">
      <Row type="flex">
        <Form inline>
          <FormItem label="备注">
            <label>
              <Input v-model="searchFormData.remark" placeholder="请输入"
                     clearable></Input>
            </label>
          </FormItem>
        </Form>

        <div style="margin-top:34px">
          <Button @click="doSearchForm" style="margin-left: 10px" type="primary">查询</Button>
          <Button @click="resetSearchForm" style="margin-left: 10px" type="primary" ghost>重置
          </Button>
          <Button ghost @click="showEditDialog(0)" style="margin-left: 10px" type="success">新增
          </Button>
        </div>
      </Row>
    </Card>

    <my-main-table
      :table-loading="tableLoading"
      :columnsData="columnsData"
      :tableList="tableList"
      :total="total"
      :page-param="pageParam"
      @onSelectionChange="onSelectionChange"
      @changePageParam="changePageParam">
      <div slot="table_top">
      </div>
    </my-main-table>

    <EditDialog
      :isShow.sync="isShowEditDialog"
      :id="clickId"
      @refresh="baseRefresh(false)"
    ></EditDialog>
  </div>
</template>

<script>

  import EditDialog from '@/view/developer/config-sms/edit-dialog/index'
  import { defaultTableMixin } from '@/common/DefaultTableMixin'
  import { getBaseApi } from '@/api/config_sms'

  export default {
    name: 'index',
    mixins: [defaultTableMixin],
    components: { EditDialog },

    data () {
      return {
        columnsData: [
          { title: 'id', key: 'id', width: 80, align: 'center' },
          { title: 'remark', key: 'remark', minWidth: 150, align: 'center' },
          { title: 'templateCode', key: 'templateCode', minWidth: 150, align: 'center' },
          { title: 'regionId', key: 'regionId', minWidth: 150, align: 'center' },
          { title: 'signName', key: 'signName', minWidth: 150, align: 'center' },
          { title: 'tag', key: 'tag', minWidth: 150, align: 'center' },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 200,
            fixed: 'right',
            needExport: false,
            render: (h, params) => {

              let text = ''
              switch (params.row.accountState) {
                case 1:
                  text = '禁用'
                  break
                default:
                  text = '启用'
                  break
              }
              return h('div', [
                  h('TipButton', {
                    props: {
                      content: '编辑',
                      icon: 'md-create',
                      type: 'primary',
                      size: 'small',
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.showEditDialog(params.row.id)
                      }
                    }
                  }, ''),
                  h('TipButton', {
                    props: {
                      content: '删除',
                      icon: 'md-trash',
                      type: 'error',
                    },
                    style: {
                      marginRight: '5px',
                    },
                    on: {
                      click: () => {
                        let param = {}
                        param.id = params.row.id
                        let text1 = '是否删除？'
                        this.showConfirmDialog(getBaseApi().deleteById(param, true), text1)
                      }
                    }
                  }, '删除'),
                ]
              )
            }
          }
        ]
      }
    },
    methods: {
      getDefaultSearchForm () {
        return {
          remark: '',
        }
      },
      selectPage () {
        let param = this.getDefaultPageParam()
        this.defaultSelectPage(getBaseApi().selectPage(param))
      },

    }
  }
</script>


