<style lang="less" scoped>
 /*/deep/  .ivu-page-options-sizer {*/
 /*z-index:9999999 !important*/
 /*}*/
</style>
<!--带有分页功能的表格-->
<template>
  <div>
    <Card
      :bordered="useCardBackGround"
      :dis-hover="!useCardBackGround"
      :padding="useCardBackGround?16:0"
      :shadow="!useCardBackGround">
      <!--头部用于放搜索栏之类的-->
      <Row>
        <slot name="table_top"></slot>
      </Row>
      <!-- 表格部分-->
      <Row style="margin-top: 10px;">
        <Table
          :max-height="maxHeight"
          :loading="tableLoading"
          border
          :columns="columnsData"
          :data="tableList"
          ref="table"
          sortable="custom"
          @on-sort-change="onSortChange"
          @on-selection-change="onSelectionChange"
        ></Table>
      </Row>
      <!-- 分页插件-->
      <Row type="flex" justify="end" class="page" style="margin-top: 10px;">
        <Page
          transfer
          :current="pageParam.pageNum"
          :total="total"
          :page-size="pageParam.pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          size="small"
          show-total
          show-elevator
        ></Page>
      </Row>
    </Card>
  </div>
</template>

<script>

  export default {
    name: 'myMainTable',
    props: {
      maxHeight:{
        type: [Number,String],
        default: 600,
      },
      //表格加载
      tableLoading: false,
      // 表格字段
      columnsData: {},
      //表格数据
      tableList: {},

      //表格参数
      pageParam: {
        pageNum: 1,//当前页码
        pageSize: 20,//每页访问条数
        sortKey: '',//筛选条件
        order: '',//排序方式
      },

      //背景是否使用CardView
      useCardBackGround: {
        type: Boolean,
        default: true,
      },

      //总数量
      total: {
        type: Number,
        default: 0,
      },

      //分页下拉列表
      pageSizeOpts: {
        type: Array,
        default: () => [10, 20,30],
      },

    },
    data () {
      return {}
    },

    //钩子函数注解

    //1、changePageParam
    //返回最新的分页参数



    methods: {

      //排序选择修改
      onSelectionChange (data) {
        this.$emit('onSelectionChange', data)
      },
      //修改页码
      changePage (data) {
        let mPageParam = this.pageParam
        mPageParam.pageNum = data
        this.$emit('changePageParam', mPageParam)
      },
      //分页大小发生改变
      changePageSize (data) {
        let mPageParam = this.pageParam
        mPageParam.pageNum = 1
        mPageParam.pageSize = data
        this.$emit('changePageParam', mPageParam)
      },
      //排序修改
      onSortChange (data) {
        let mPageParam = this.pageParam
        mPageParam.pageNum = 1
        mPageParam.sortKey = data.key
        mPageParam.order = data.order
        this.$emit('changePageParam', mPageParam)
      },

    },
  }
</script>



