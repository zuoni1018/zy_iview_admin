<template>

  <div>
    <Card style="margin-bottom: 10px">
      <Row type="flex">
        <Form inline>
          <FormItem label="角色名称">
            <label>
              <Input v-model="searchFormData.name" :maxlength=15 placeholder="请输入"
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

      </div>

    </my-main-table>

    <EditDialog
      :isShow.sync="isShowEditDialog"
      :id="clickId"
      @refresh="baseRefresh(false)">

    </EditDialog>

    <PowerMenu
      :isShow.sync="isShowPowerMenuDialog"
      :id="clickId"
      @refresh="baseRefresh(false)">
    </PowerMenu>
  </div>
</template>

<script>

  import EditDialog from '@/view/admin-user-manager/admin-power-list/edit-dialog/index'
  import { defaultTableMixin } from '@/common/DefaultTableMixin'
  import { getBaseApi } from '@/api/admin_power'
  import PowerMenu from '@/view/admin-user-manager/admin-power-list/power-menu/index'

  export default {
    name: 'index',
    mixins: [defaultTableMixin],
    components: { PowerMenu, EditDialog },

    data () {
      return {
        isShowPowerMenuDialog:false,
        stateList: this.DefaultDataStateUtils.stateList,
        columnsData: [
          { type: 'index', width: 60, align: 'center' },
          { title: 'id', key: 'id', width: 80, align: 'center' },
          { title: '角色名称', key: 'name', minWidth: 120, align: 'center' },
          { title: '备注', key: 'remark', align: 'center' },
          {
            title: '状态',
            align: 'center',
            width: 80,
            render: (h, params) => {
              return h('div', this.DefaultDataStateUtils.getStringByState(params.row.state))
            }
          },
          { title: '更新时间', key: 'updateTime', width: 180, align: 'center' },

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
                      disabled: params.row.id === 1,
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
                    content: '菜单管理',
                    icon: 'md-build',
                    type: 'success',
                    size: 'small',
                    disabled: params.row.id === 1,
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.clickId=params.row.id;
                      this.isShowPowerMenuDialog=true;
                    }
                  }
                }, ''),
                h('TipButton', {
                  props: {
                    content: '删除',
                    icon: 'md-trash',
                    type: 'error',
                    size: 'small',
                    disabled: params.row.id === 1,
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
      getDefaultSearchForm () {
        return {
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
  .w-e-text-container {
    height: 700px !important;
  }
</style>
