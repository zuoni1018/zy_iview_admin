<template>
  <!--用户资料管理-->
  <div>

    <Card style="margin-bottom: 10px">
      <Row type="flex">
        <Form inline>
          <FormItem label="url/备注 模糊搜索">
            <label>
              <Input v-model="searchFormData.search" placeholder="请输入" :maxlength=15
                     clearable></Input>
            </label>
          </FormItem>
        </Form>

        <div style="margin-top:34px">
          <Button @click="doSearchForm" style="margin-left: 10px" type="primary">查询</Button>
          <Button @click="resetSearchForm" style="margin-left: 10px" type="primary" ghost>重置
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
      @changePageParam="changePageParam"
    >

      <div slot="table_top">
        <Alert type="error">该界面为开发人员使用,后台管理人员请勿进行编辑！！！</Alert>
      </div>

    </my-main-table>

    <Save
      :isShow="isShowEditDialog"
      :id="clickId"
      :state="clickState"
      @cancel="isShowEditDialog=false"
      @refresh="baseRefresh(false)">

    </Save>


  </div>
</template>

<script>

  import Save from '@/view/admin-user-manager/sub-account-api-url/save/index'
  import {defaultTableMixin} from '@/common/DefaultTableMixin'
  import {getBaseApi} from '@/api/api_url'
  import MyMainTable from '@/components/my-mian-table'

  export default {
    name: 'index',
    mixins: [defaultTableMixin],
    components: {MyMainTable, Save},
    data() {
      return {
        clickState: 0,
        isShowAddCompanyDialog: false,
        chooseData: [],
        searchFormData: {
          search: '',
        },


        columnsData: [
          {type: 'selection', width: 60, align: 'center'},
          {title: 'id', key: 'id', width: 80, align: 'center'},
          {title: 'url', key: 'url', minWidth: 230, align: 'left'},
          {title: '备注', key: 'remark', minWidth: 230, align: 'left'},
          {title: '候选人权限', key: 'candidatePower', width: 140, align: 'center'},
          {title: '岗位权限', key: 'postPower', width: 140, align: 'center'},
          {title: '简历权限', key: 'resumePower', width: 140, align: 'center'},
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('div', [
                  h('Button', {
                    props: {
                      type: 'text',
                      size: 'small',

                      disabled: params.row.isSys === 1
                    },
                    style: {
                      color: '#001BB0',
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.clickState = params.row.companyState
                        this.showEditDialog(params.row.id)
                      }
                    }
                  }, '查看')
                ]
              )
            }
          }
        ]
      }
    },

    methods: {

      // 重置搜索
      resetSearchForm() {
        this.searchFormData = {
          search: '',
        }

        this.doSearchFormData = this.searchFormData
        this.pageParam.pageNum = 1
        this.selectPage()
      },

      // 执行搜索
      doSearchForm() {
        this.doSearchFormData = this.searchFormData
        this.pageParam.pageNum = 1
        this.selectPage()
      },

      onSelectionChange(data) {
        this.chooseData = data
      },


      selectPage() {
        this.isShowAddCompanyDialog = false
        let param = this.getDefaultPageParam()
        this.defaultSelectPage(getBaseApi().selectPage(param))
      },


    }
  }
</script>

<style scoped>

</style>
