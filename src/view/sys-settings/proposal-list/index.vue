<style scoped>

</style>
<template>
  <div>
    <Card style="margin-bottom: 10px">
      <Row type="flex">
        <Form inline>
          <FormItem label="用户手机">
            <label>
              <Input v-model="searchFormData.mobile" placeholder="请输入"
                     clearable></Input>
            </label>
          </FormItem>
          <FormItem label="用户昵称">
            <label>
              <Input v-model="searchFormData.nickName" placeholder="请输入"
                     clearable></Input>
            </label>
          </FormItem>
          <FormItem label="内容">
            <label>
              <Input v-model="searchFormData.content" placeholder="请输入"
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
  </div>
</template>

<script>

  import { defaultTableMixin } from '@/common/DefaultTableMixin'
  import { getBaseApi } from '@/api/proposal'
  import MyMainTable from '@/components/my-mian-table'

  export default {
    name: 'index',
    mixins: [defaultTableMixin],
    components: { MyMainTable },

    data () {
      return {
        stateList: [
          {
            id: 'all',
            name: '全部',
          },
          {
            id: 'normal',
            name: '未处理',
          },
          {
            id: 'forbidden',
            name: '已处理',
          }
        ],
        columnsData: [
          { type: 'index', width: 60, align: 'center' },
          { title: '昵称', key: 'nickName', width: 150, align: 'center' },
          { title: '手机号码', key: 'mobile', width: 150, align: 'center' },
          { title: '内容', key: 'content', minWidth: 180, align: 'center' },
          { title: '创建时间', key: 'createTime', width: 180, align: 'center' },
          {
            title: '状态',
            align: 'center',
            width: 80,
            render: (h, params) => {
              return h('div', this.DefaultDataStateUtils.getStringByStateAndList(params.row.state, this.stateList))
            }
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 200,
            render: (h, params) => {
              return h('div', [
                  h('TipButton', {
                    props: {
                      content: '处理',
                      icon: 'md-checkmark',
                      type: 'success',
                      size: 'small',
                      disabled: params.row.state !== 'normal',
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        let param = {}
                        param.id = params.row.id
                        let text1 = '是否处理？'
                        this.showConfirmDialog(getBaseApi().forbiddenById(param, true), text1)
                      }
                    }
                  }, ''),
                  h('TipButton', {
                    props: {
                      content: '删除',
                      icon: 'md-trash',
                      type: 'error',
                      size: 'small',
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
        ]
      }
    },
    methods: {
      getDefaultSearchForm () {
        return {
          content: '',
          mobile: '',
          nickName: '',
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


