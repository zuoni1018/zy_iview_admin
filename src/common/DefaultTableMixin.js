/**
 * 用于单纯的表格数据获取
 */

import { post } from '@/api/customHttp'

export const defaultTableMixin = {

  mounted () {
    // console.log('vue 生命周期 mounted')

    if(!this.isDialog){
      this.getCommonData()
      //页面展示的时候
      //获取表格数据
      this.selectPage()
    }


  },

  data () {
    return {

      //当前页面跳转的时候用到
      nowShowUi:'main',
      //Excel导出状态
      exportLoading: false,




      isDialog:false,
      editDialogTitle:'',
      //表格接口访问参数
      pageParam: {
        pageNum: 1,//当前页码
        pageSize: 20,//每页访问条数
        sortKey: '',//排序key
        // sortOrder: '',//排序方式
        search: '',//模糊搜索
        order:'',//排序方式
      },

      searchText:'',
      //编辑id
      clickId: 0,
      pageSizeOpts: [20, 40, 80],
      total:0,

      //控制表格是否在加载中
      tableLoading: true,

      //是否展示编辑框
      isShowEditDialog: false,
      //数据源
      tableList: [],

      searchFormData: {
        name:'',
        state:-1,
      },

      doSearchFormData: {
        name:'',
        state:-1,
      },
      isChangeData:false,

      //记录切换前滚动到的位置
      lastScroll:0,
    }
  },

  methods: {

    getCommonData () {

    },
    selectPage () {

    },

    clickBack(){
      if(this.isChangeData){
        this.$emit('refreshData');
      }
      this.$emit('back');
    },

    changeNowShowUi(tag){
      //记录滚动位置
      this.lastScroll=document.getElementById('main_content').scrollTop;
      this.nowShowUi=tag;
    },

    back(){
      this.nowShowUi='main'
      if(this.lastScroll>0){
        this.$nextTick(() => {
          document.getElementById('main_content').scrollTop=this.lastScroll;
        });
      }
    },

    //监听表格里面的方法------------------------------------------

    changePageParam(newPageParam){
      this.pageParam =newPageParam;
      this.selectPage()
    },

    /**
     * 排序方式改变
     */
    onSortChange (data) {
      // console.log('排序方式改变' + JSON.stringify(data))
      //重置到第一页
      this.pageParam.pageNum = 1
      this.pageParam.sortKey = data.key
      this.pageParam.order = data.order
      // this.pageParam.sortOrder = data.order
      this.selectPage()
    },
    onSelectionChange (data) {
      console.log('排序方式改变' + JSON.stringify(data))
    },

    //监听分页器里面的方法-----------------------------------

    /**
     *  页码改变的时候
     */
    changePage (pageNum) {
      this.pageParam.pageNum = pageNum
      this.selectPage()
    },

    changePageSize (pageSize) {
      console.log('改变每页大小' + pageSize)
      //每页数量发生改变的时候切换到第一页
      this.pageParam.pageNum = 1
      this.pageParam.pageSize = pageSize
      this.selectPage()
    },

    reFreshData(){
      this.pageParam.pageNum = 1
      this.selectPage()
    },


    /**
     * @param isBack1 是否跳转到第一页
     */
    baseRefresh (isBack1) {
      this.isShowEditDialog = false
      this.tableLoading = true
      if (isBack1) {
        //跳转到第一页
       this.pageNum=1;
      }
      this.selectPage()
    },

    /**
     * 在加载数据之前自行处理某些字段
     */
    customResponse (response) {
      return response
    },

    getDefaultPageParam () {
      let param = {}
      param = this.pageParam
      return Object.assign(param, this.doSearchFormData);
    },

    /**
     * 默认的分页加载
     */
    defaultSelectPage (request) {
      this.tableLoading = true
      request
        .then(response => {
          this.tableLoading = false
          if (response.status === 200) {
            response = this.customResponse(response)
            this.tableList = response.data.list
            this.total = response.data.total
          } else {
            this.$Message.error(response.msg)
          }
        })
        .catch(error => {
          this.tableLoading = false
        })
    },

    /**
     *搜索框搜索
     */
    doSearch (data) {
      this.pageParam.pageNum = 1
      this.pageParam.search = data
      this.selectPage()
    },

    showEditDialog (id) {
      this.clickId = id
      this.isShowEditDialog = true
    },

    //确认弹窗

    /**
     * @param mRequest 确认后需要访问的地址
     * @param showText 提示语句
     */
    showConfirmDialog (mRequest, showText) {
        this.$Modal.confirm({
          title: '提示',
          content: showText,
          onOk: () => {
            post(mRequest.url,mRequest.param)
              .then(response => {
              if (response.status === 200) {
                this.$Message.success(response.msg);
                this.pageParam.pageNum=1;
                this.selectPage();
              } else {
                this.$Message.error(response.msg);
              }
            })

          },
          onCancel: () => {
          }
        });
    }

    /**
     * @param entity 禁止
     *  @param forbiddenUrl url
     */
    // defaultForbiddenEntity(entity, forbiddenUrl,pText) {
    //   let text;
    //   if (entity.state === 1) {
    //     text = "是否禁用";
    //   } else {
    //     text = "是否启用";
    //   }
    //   if(pText!==undefined){
    //     text=pText;
    //   }
    //
    //
    //   this.$Modal.confirm({
    //     title: '提示',
    //     content: text,
    //     onOk: () => {
    //       post(forbiddenUrl,entity)
    //         .then(response => {
    //         if (response.status === 200) {
    //           this.$Message.success(response.msg);
    //           this.baseRefresh(false);
    //         } else {
    //           this.$Message.error(response.msg);
    //         }
    //       })
    //
    //     },
    //     onCancel: () => {
    //     }
    //   });
    // }

  }
}
