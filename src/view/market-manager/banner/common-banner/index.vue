<style scoped>

</style>
<template>
  <div>
    <Card style="margin-bottom: 10px">
      <Row type="flex">
        <Form inline>
          <FormItem label="跳转类型">
            <label>
              <Select
                v-model="searchFormData.jumpType"
                style="width: 200px"
                placeholder="选择状态">
                <Option v-for="item in jumpTypeList"
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
          <Button ghost @click="showEditDialog(0)" style="margin-left: 10px" type="success">新增
          </Button>
        </div>
      </Row>
      <Alert type="error" style="width: 300px" v-if="showType===1">App 取第一个作为中屏广告</Alert>
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
    </my-main-table>

    <banner-editor
      :isShow.sync="isShowEditDialog"
      :id="clickId"
      :showType="showType"
      @refresh="baseRefresh(false)"
    ></banner-editor>

  </div>
</template>

<script>

  import { defaultTableMixin } from '@/common/DefaultTableMixin'
  import { getBaseApi } from '@/api/banner'
  import MyMainTable from '@/components/my-mian-table'
  import BigImg from '@/components/big-img/big-img'
  import BannerEditor from '@/view/market-manager/banner/banner-editor/index'
  import BannerConfig from '@/utils/BannerConfig'

  export default {
    name: 'common-banner',
    mixins: [defaultTableMixin],
    components: { BannerEditor, MyMainTable },
    props: {
      showType: {
        type: String,
        default: '',
      }
    },
    data () {
      return {
        jumpTypeList: BannerConfig.jumpType,
        columnsData: [
          { type: 'index', width: 60, align: 'center' },
          {
            title: '图片',
            align: 'center',
            minWidth: 140,
            render: (h, params) => {
              return h(BigImg, {
                props: {
                  showImageWidth: this.bannerUiConfig.showImageWidth,
                  originalImageHeight: this.bannerUiConfig.originalImageHeight,
                  originalImageWidth: this.bannerUiConfig.originalImageWidth,
                  imageUrl: params.row.image
                },
              })
            }
          },
          {
            title: '跳转类型',
            align: 'center',
            width: 120,
            render (h, params) {
              return h('div', BannerConfig.getStringByJumpType(params.row.jumpType))
            }
          },
          { title: '创建时间', key: 'createTime', minWidth: 180, align: 'center' },
          { title: '排序', key: 'weight', width: 100, align: 'center' },

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
          jumpType: 'all',
          state: 'all',
        }
      },
      selectPage () {
        let param = this.getDefaultPageParam()
        param.showType = this.showType
        this.defaultSelectPage(getBaseApi().selectPage(param))
      },
    },
    computed: {
      bannerUiConfig () {
        return BannerConfig.getBannerUiConfig(this.showType, 0)
      }
    },
  }
</script>


