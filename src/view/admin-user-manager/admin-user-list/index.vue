<template>
  <!--用户资料管理-->
  <div>

    <Card style="margin-bottom: 10px">
      <Row type="flex">
        <Form inline>
          <FormItem label="姓名">
            <label>
              <Input v-model="searchFormData.name" placeholder="请输入" :maxlength=15 clearable></Input>
            </label>
          </FormItem>
          <FormItem label="角色">
            <label>
              <Input v-model="searchFormData.powerName" placeholder="请输入" :maxlength=15 clearable></Input>
            </label>
          </FormItem>
          <FormItem label="状态">
            <label>
              <Select
                v-model="searchFormData.state"
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
          <Button @click="showEditDialog(0)" style="margin-left: 10px" type="primary">新增用户</Button>

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
        <Row type="flex" justify="end">

<!--          <Button icon="md-download"-->
<!--                  style="margin-left: 10px">下载-->
<!--          </Button>-->


<!--          <Button @click="batchDelete" style="margin-left: 10px" type="error">删除选中</Button>-->

        </Row>
      </div>

    </my-main-table>

    <Save :isShow="isShowEditDialog" :id="clickId" @cancel="isShowEditDialog=false"
          @refresh="baseRefresh(false)"></Save>
  </div>
</template>

<script>

  import Save from '@/view/admin-user-manager/admin-user-list/save/index'
  import { getButtonState } from '@/view/settings/apiType'
  import { defaultTableMixin } from '@/common/DefaultTableMixin'
  import { getBaseApi, resetPassword } from '@/api/admin_user'
  import MyMainTable from '@/components/my-mian-table'

  export default {
    name: 'index',
    mixins: [defaultTableMixin],
    components: { MyMainTable, Save },

    data () {
      return {
        chooseData:[],
        searchFormData: {
          name: '',
          powerName: '',
          state: -1,
        },
        stateList: [
          {
            id: -1,
            name: '全部',
          },
          {
            id: 1,
            name: '正常',
          },
          {
            id: 2,
            name: '停用',
          }
        ],
        columnsData: [
          // { type: 'selection', width: 60, align: 'center' },
          { type: 'index', width: 60, align: 'center' },
          { title: '用户id', key: 'id', width: 80, align: 'center' },
          { title: '姓名', key: 'name', minWidth: 120, align: 'center' },
          { title: '账号', key: 'mobile', minWidth: 120, align: 'center' },
          // { title: '邮箱', key: 'email', minWidth: 120, align: 'center' },
          { title: '角色', key: 'powerNames', minWidth: 120, align: 'center' },
          { title: '创建时间', key: 'createTime', width: 180, align: 'center' },
          {
            title: '状态',
            align: 'center',
            width: 80,
            render (h, params) {
              let text
              if (params.row.state === 1) {
                text = '正常'
              } else {
                text = '停用'
              }
              return h('div', text)
            }
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 300,
            render: (h, params) => {
              let model = getButtonState(params.row.state)
              let text = model.text
              if (params.row.state === 1) {
                text = '停用'
              } else {
                text = '启用'
              }
              return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      disabled: params.row.isSys === 1,
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
                  // h('Button', {
                  //   props: {
                  //     type: 'primary',
                  //     size: 'small',
                  //     disabled: params.row.isSys === 1,
                  //   },
                  //   style: {
                  //     marginRight: '5px'
                  //   },
                  //   on: {
                  //     click: () => {
                  //       this.$Modal.confirm({
                  //         title: '提示',
                  //         content: '是否重置密码？',
                  //         onOk: () => {
                  //           resetPassword({ id: params.row.id })
                  //             .then(response => {
                  //               if (response.status === 200) {
                  //                 this.$Message.success(response.msg)
                  //               } else {
                  //                 this.$Message.error(response.msg)
                  //               }
                  //             })
                  //         },
                  //         onCancel: () => {
                  //         }
                  //       })
                  //     }
                  //   }
                  // }, '重置密码'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      disabled: params.row.isSys === 1,
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        let param = {}
                        param.id = params.row.id
                        let text1 = '是否' + text + '？'
                        this.showConfirmDialog(getBaseApi().forbiddenById(param, true), text1)
                      }
                    }
                  }, text),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small',
                      disabled: params.row.isSys === 1,
                    },
                    style: {
                      marginRight: '5px'
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
        ],
      }
    },

    methods: {

      //重置搜索
      resetSearchForm () {
        this.searchFormData.state = -1
        this.searchFormData.name = ''
        this.searchFormData.powerName = ''
        this.doSearchFormData = this.searchFormData
        this.pageParam.pageNum = 1
        this.selectPage()
      },

      //执行搜索
      doSearchForm () {
        this.doSearchFormData = this.searchFormData
        this.pageParam.pageNum = 1
        this.selectPage()
      },

      onSelectionChange (data) {
        this.chooseData = data
      },

      batchDelete(){

        if(this.chooseData.length===0){
          this.$Message.info("请先勾选数据");
          return
        }

        let ids =[]
        for (let i = 0; i < this.chooseData.length; i++) {
          ids.push(this.chooseData[i].id)
        }
        let param = {}
        param.ids =JSON.stringify(ids);
        let text1 = '是否删除？'
        this.showConfirmDialog(getBaseApi().batchDeleteById(param, true), text1)
      },

      selectPage () {
        let param = this.getDefaultPageParam()
        this.defaultSelectPage(getBaseApi().selectPage(param))
      },
    }
  }
</script>

<style scoped>

</style>
