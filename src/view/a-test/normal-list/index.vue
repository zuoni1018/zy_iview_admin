<style scoped>

</style>
<template>
  <div>
    <Card style="margin-bottom: 10px">
      <Row type="flex">
        <Form inline>
          <FormItem label="昵称">
            <label>
              <Input v-model="searchFormData.nickName" placeholder="请输入"
                     clearable></Input>
            </label>
          </FormItem>
          <FormItem label="手机号">
            <label>
              <Input v-model="searchFormData.mobile" placeholder="请输入"
                     clearable></Input>
            </label>
          </FormItem>
          <FormItem label="状态">
            <label>
              <Select
                v-model="searchFormData.accountState"
                style="width: 100px"
                placeholder="选择状态">
                <Option v-for="item in stateList"
                        :value="item.id" :key="item.id">{{ item.name }}
                </Option>
              </Select>
            </label>
          </FormItem>
        </Form>

        <div style="margin-top:34px">
          <Button @click="doSearchForm" style="margin-left: 10px" type="primary">查询</Button>
          <Button @click="resetSearchForm" style="margin-left: 10px" type="primary" ghost>重置
          </Button>
          <Button icon="md-download" :loading="exportLoading" @click="exportExcel"
                  style="margin-left: 10px">导出
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
      :state="clickState"
      @refresh="baseRefresh(false)"
    ></EditDialog>
  </div>
</template>

<script>

  import EditDialog from '@/view/a-test/normal-list/edit-dialog/index'
  import { defaultTableMixin } from '@/common/DefaultTableMixin'
  import { getBaseApi } from '@/api/users'
  import excel from '@/libs/excel'

  export default {
    name: 'index',
    mixins: [defaultTableMixin],
    components: { EditDialog },

    data () {
      return {
        exportLoading: false,
        chooseData: [],
        searchFormData: {
          nickName: '',
          headImage: '',
          accountState: -1
        },
        clickState: 0,

        stateList: [
          {
            id: -1,
            name: '全部'
          },
          {
            id: 1,
            name: '正常'
          },
          {
            id: 2,
            name: '禁用'
          }
        ],
        columnsData: [
          { title: 'id', key: 'id', width: 80, align: 'center' },
          {
            title: '头像',
            align: 'center',
            width: 80,
            render: (h, params) => {
              return h('BigImg', {
                props: {
                  showImageWidth: 40,
                  originalImageHeight: 40,
                  originalImageWidth: 40,
                  imageUrl: params.row.headImage
                },
              })
            }
          },
          { title: '昵称', key: 'nickName', minWidth: 120, align: 'center' },
          { title: '手机号码', key: 'mobile', minWidth: 150, align: 'center' },
          { title: '注册时间', key: 'createTime', minWidth: 180, align: 'center' },
          {
            title: '状态',
            align: 'center',
            minWidth: 110,
            render: (h, params) => {
              let text = ''
              switch (params.row.accountState) {
                case 1:
                  text = '正常'
                  break
                default:
                  text = '禁用'
                  break
              }
              return h('div', text)
            }
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 200,
            fixed: 'right',
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
      // 重置搜索
      resetSearchForm () {

        // this.$isEmpty(11)

        this.searchFormData = {
          accountState: -1,
          mobile: '',
          nickName: '',
        }
        this.doSearchForm()
      },

      // 执行搜索
      doSearchForm () {
        this.doSearchFormData = this.searchFormData
        this.pageParam.pageNum = 1
        this.selectPage()
      },

      onSelectionChange (data) {
        this.chooseData = data
      },

      batchDelete () {
        if (this.chooseData.length === 0) {
          this.$Message.info('请先勾选数据')
          return
        }

        let ids = []
        for (let i = 0; i < this.chooseData.length; i++) {
          ids.push(this.chooseData[i].id)
        }
        let param = {}
        param.ids = JSON.stringify(ids)
        let text1 = '是否删除？'
        this.showConfirmDialog(getBaseApi().batchDeleteById(param, true), text1)
      },

      selectPage () {
        let param = this.getDefaultPageParam()
        this.defaultSelectPage(getBaseApi().selectPage(param))
      },

      exportExcel () {
        let exportData = []
        for (let item of this.tableList) {
          //转换下性别的格式
          // let d=this.getFinanceText(item.isFinance);
          item.isCreateOrder = (item.isCreateOrder === 1 ? '是' : '否')

          let text = ''
          switch (item.openMerchantState) {
            case 0:
              text = '未开通'
              break
            case 1:
              text = '审核中'
              break
            case 2:
              text = '已开通'
              break
            case 3:
              text = '未通过'
              break
            default:
              text = '--'
              break
          }
          item.openMerchantState = text
          exportData.push(item)
        }
        this.exportLoading = true
        let fileName = '用户数据导出'
        const params = {
          title: ['id', '昵称', '手机号码', '积分', '虚拟币', '收益', '可提现金额', '注册时间', '是否下过单', '商家端状态'],
          key: ['id', 'nickName', 'mobile', 'integral', 'virtualMoney', 'profit', 'cashOutMoney', 'createTime', 'isCreateOrder', 'openMerchantState'],
          data: exportData,
          autoWidth: true,
          filename: fileName
        }
        excel.export_array_to_excel(params)
        this.exportLoading = false
        this.$Message.info('导出成功！')
      }
    }
  }
</script>


