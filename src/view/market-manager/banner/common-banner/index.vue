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
                        :value="item.value" :key="item.value">{{ item.name }}
                </Option>
              </Select>
            </label>
          </FormItem>
        </Form>

        <div style="margin-top:34px">
          <Button @click="doSearchForm" style="margin-left: 10px" type="primary">查询</Button>
          <Button @click="resetSearchForm" style="margin-left: 10px" type="primary" ghost>重置
          </Button>
          <Button ghost @click="showEditDialog(0)" style="margin-left: 10px" type="success">添加
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
      :isShow="isShowEditDialog"
      :id="clickId"
      :showType="showType"
      @cancel="isShowEditDialog=false"
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
  import { bannerJumTypeList, getBannerUiConfig } from '@/utils/DataUtils'

  export default {
    name: 'common-banner',
    mixins: [defaultTableMixin],
    components: { BannerEditor, MyMainTable },
    props: {
      showType: {
        type: Number,
        default: 0,
      }
    },
    data () {
      return {
        jumpTypeList: bannerJumTypeList,
        searchFormData: {
          jumpType: -1,
        },
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
              let text
              if (params.row.jumpType === 0) {
                text = '无'
              } else if (params.row.jumpType === 1) {
                text = '商品详情'
              } else if (params.row.jumpType === 2) {
                text = '外链'
              } else {
                text = '--'
              }
              return h('div', text)
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
                  h('Button', {
                    props: {
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
                  }, '编辑'),

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
          jumpType: -1,
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
        param.showType = this.showType
        this.defaultSelectPage(getBaseApi().selectPage(param))
      },
    },
    computed: {
      bannerUiConfig () {
        return getBannerUiConfig(this.showType, 0)
      }
    },
  }
</script>


