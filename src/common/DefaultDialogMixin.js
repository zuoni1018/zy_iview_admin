/**
 * 编辑框页面基类
 */
import {cleanParams, isEmpty} from "@/utils/ValueUtils";

export const defaultDialogMixin = {

  props: {
    isShow: {
      default: false,
    },
    id: {
      default: 1,
    }
  },

  data() {
    return {
      isDialog:true,
      /**
       * 要编辑的id
       */
      editId: 0,
      /**
       * 确认按钮弹窗
       */
      loading: true,
      /**
       * 表单详情
       */
      formDetails: {}
    }
  },
  created() {

  },

  mounted () {
    console.log('弹窗 vue 生命周期 mounted')
    //页面展示的时候
    //获取表格数据
    // this.selectPage()
  },
  methods: {

    /**
     * 用于控制确认按钮转圈圈
     */
    changeLoading() {
      this.loading = false;
      this.$nextTick(() => {
        this.loading = true;
      });
    },
    /**
     * 弹窗取消
     */
    cancel() {
      this.$emit('cancel');
    },
    /**
     * 获取表单数据
     */
    getData() {

    },

    isMyEmpty(value){
      return isEmpty(value);
    },

    getCommonData(){

    },

    /**
     *  弹窗可见状态
     */
    visibleChange(visible) {
      // console.log("弹窗可见"+visible)

      //清空原来的数据
      // this.formDetails = {};
      this.initFormDetails();
      if (visible) {
        //获取数据
        if (this.id !== 0) {
          //有id传递进来
          //需要调用接口获取数据
          this.getData();
        }
        this.getCommonData();
      }
    },

    initFormDetails(){
      this.formDetails= cleanParams(this.formDetails);
      this.initMyFormDetails();
    },
    initMyFormDetails(){

    },

    /**
     * @param request 提交表单
     */
    commit(request) {
      request
        .then(response => {
          if (response.status === 200) {
            this.$Message.info(response.msg)
            this.$emit('refresh');
          } else {
            this.changeLoading();
            this.$Message.info(response.msg)
          }
        })
        .catch(error => {
          this.$Message.info(error)
          this.changeLoading();
        });
    },

    /**
     * 字符串校验
     */
    valueValidatorString(value, msg) {
      if (!isEmpty(value)) {
        this.$Message.info(msg);
        this.changeLoading();
        return true;
      } else {
        return false;
      }
    }

  }
};
