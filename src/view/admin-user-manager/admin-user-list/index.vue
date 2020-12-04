<template>
  <div>
    <Card style="margin-bottom: 10px">
      <Row type="flex">
        <Form inline>
          <FormItem label="姓名">
            <label>
              <Input v-model="searchFormData.name" placeholder="请输入" :maxlength=15
                     clearable></Input>
            </label>
          </FormItem>
          <FormItem label="角色">
            <label>
              <Input v-model="searchFormData.powerName" placeholder="请输入" :maxlength=15
                     clearable></Input>
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
          <Button @click="showEditDialog(0)" style="margin-left: 10px" type="success" ghost>新增
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
        <Row type="flex" justify="end">
        </Row>
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

  import EditDialog from '@/view/admin-user-manager/admin-user-list/edit-dialog/index'
  import { defaultTableMixin } from '@/common/DefaultTableMixin'
  import { getBaseApi } from '@/api/admin_user'

  export default {
    name: 'index',
    mixins: [defaultTableMixin],
    components: { EditDialog },

    data () {
      return {
        stateList: this.DefaultDataStateUtils.stateList,
        columnsData: [
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
            render: (h, params) => {
              return h('div', this.DefaultDataStateUtils.getStringByState(params.row.state))
            }
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 300,
            render: (h, params) => {
              return h('div', [
                  h('TipButton', {
                    props: {
                      content: '编辑',
                      icon: 'md-create',
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
                  }, ''),
                  h('TipButton', {
                    props: {
                      content: '删除',
                      icon: 'md-trash',
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
                  }, ''),
                ]
              )
            }
          }
        ],
      }
    },
    methods: {
      //重置搜索
      getDefaultSearchForm () {
        return {
          content: '',
          powerName: '',
          name: '',
          state: 'all',
        }
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
