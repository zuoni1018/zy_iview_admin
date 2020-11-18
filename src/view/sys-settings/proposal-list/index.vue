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
        chooseData: [],
        searchFormData: {
          content: '',
          pName: '',
          state: -1,
          mobile:'',
          nickName:''
        },
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
          { type: 'index', width: 60, align: 'center' },
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
          { title: '昵称', key: 'nickName', width: 150, align: 'center' },
          { title: '手机号码', key: 'mobile', width: 150, align: 'center' },
          // { title: '标题', key: 'title', minWidth: 180, align: 'center' },
          { title: '内容', key: 'content', minWidth: 180, align: 'center' },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 300,
            render: (h, params) => {
              return h('div', [

                  h('Button', {
                    props: {
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
        this.searchFormData = {
          content: '',
          pName: '',
          state: -1,
          mobile:'',
          nickName:''
        }
        this.doSearchForm()
      },

      // 执行搜索
      doSearchForm () {
        this.doSearchFormData = this.searchFormData
        this.pageParam.pageNum = 1
        this.selectPage()
      },

      selectPage () {
        let param = this.getDefaultPageParam()
        this.defaultSelectPage(getBaseApi().selectPage(param))
      },
    }
  }
</script>


