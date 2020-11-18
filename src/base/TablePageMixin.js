/**
 * 表格页面基类
 */
import {post} from "@/api/customHttp";

export const tablePageMixin = {

  created() {
    this.onCreated();

    if (!this.isDialog) {
      //如果表格在弹窗上展示的
      //不用创建的时候就调用接口
      this.baseRefresh(true);
    }
  },




  data() {
    return {

      isDialog: false,
      //排序
      sortKey:"",
      sortOrder:"",
      //控制表格是否在加载中
      tableLoading: true,
      //当前页码
      pageNum: 1,
      //每页数量
      pageSize: 10,
      //总数
      total: 0,

      //搜索内容
      search: "",

      //是否展示编辑框
      isShowEditDialog: false,
      //编辑id
      clickId: 0,
      //数据源
      tableList: []
    }
  },


  methods: {

    selectPage() {

    },
    onSortChange(data){
      // this.sortKey=data.key;
      // this.sortOrder=data.order;
      // this.baseRefresh(true)
    },
    onCreated(){

    },

    /**
     * @param isBack1 是否跳转到第一页
     */
    baseRefresh(isBack1) {
      this.isShowEditDialog = false;
      this.tableLoading = true;
      if (isBack1) {
        this.jump2Page1();
      }
      this.selectPage();
    },


    /**
     * 在加载数据之前自行处理某些字段
     */
    customResponse(response) {
      return response;
    },

    getDefaultPageParam(){
      let  param={};
      param.pageSize = this.pageSize;
      param.pageNum = this.pageNum;
      param.search=this.search;
      param.sortKey=this.sortKey;
      param.sortOrder=this.sortOrder;
      return param;
    },

    /**
     * 默认的分页加载
     */
    defaultSelectPage(request) {
      this.tableLoading=true;
      request
        .then(response => {
          this.tableLoading = false;
          if (response.status === 200) {
            response = this.customResponse(response);
            this.tableList = response.data.list;
            this.total = response.data.total;
          } else {
            this.$Message.error(response.msg);
          }
        })
        .catch(error => {
          this.tableLoading = false;
        })
    },


    /**
     *搜索框搜索
     */
    doSearch(data) {
      this.search = data;
      this.baseRefresh(true);
    },
    /**
     *  页码改变的时候
     */
    changePage(pPageNum) {
      this.pageNum = pPageNum;
      this.baseRefresh(false)
    },
    showEditDialog(id) {
      this.clickId = id;
      this.isShowEditDialog = true;
    },

    /**
     * 跳转到第一页
     */
    jump2Page1() {
      this.pageNum = 1;
      this.$nextTick(function () {
        this.$refs['pages'].currentPage = 1;
      });
    },


    /**
     * @param entity 禁止
     *  @param forbiddenUrl url
     */
    defaultForbiddenEntity(entity, forbiddenUrl,pText) {
      let text;
      if (entity.state === 1) {
        text = "是否禁用";
      } else {
        text = "是否启用";
      }
      if(pText!==undefined){
        text=pText;
      }


      this.$Modal.confirm({
        title: '提示',
        content: text,
        onOk: () => {
          post(forbiddenUrl,entity)
            .then(response => {
            if (response.status === 200) {
              this.$Message.success(response.msg);
              this.baseRefresh(false);
            } else {
              this.$Message.error(response.msg);
            }
          })

        },
        onCancel: () => {
        }
      });
    }


  }
};
