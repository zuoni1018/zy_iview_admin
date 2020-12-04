/**
 * 2020 11 18
 * 编辑框页面基类
 */
import { isEmpty } from '@/utils/ValueUtils'

export const editDialogMixin = {
  props: {
    isShow: {
      default: false,
    },
    id: {
      default: 1,
    }
  },

  data () {
    return {
      title: '',

      isDialog: true,
      /**
       * 要编辑的id
       */
      editId: 0,
      /**
       * 确认按钮弹窗
       */
      loading: false,
      /**
       * 表单详情
       */
      formDetails: this.getDefaultForm()
    }
  },
  created () {

  },
  methods: {
    /**
     * 用于控制确认按钮转圈圈
     */
    changeLoading () {
      this.loading = false
    },
    /**
     * 弹窗取消
     */
    cancel () {
      this.dismissDialog()
    },

    dismissDialog(){
      this.$emit('update:isShow',false)
    },

    /**
     * 获取表单数据
     */
    getData () {

    },

    isMyEmpty (value) {
      return isEmpty(value)
    },

    getCommonData () {

    },

    /**
     *  弹窗可见状态
     */
    visibleChange (visible) {
      if (visible) {
        //弹窗显示的时候
        this.initFormDetails()
        this.setTitle()
        this.loading=false;
        //获取数据
        if (this.id !== 0) {
          //有id传递进来
          //需要调用接口获取数据
          this.getData()
        }
        this.getCommonData()
      }
    },

    setTitle () {
      if (this.id !== 0) {
        this.title = '编辑';
      }else {
        this.title = '新增';
      }
    },

    initFormDetails () {
      this.formDetails = this.getDefaultForm();
    },

    /**
     * @param request 提交表单
     */
    commit (request) {
      request
        .then(response => {
          if (response.status === 200) {
            this.$Message.info(response.msg)
            this.dismissDialog()
            this.$emit('refresh')
          } else {
            this.loading = false
            this.$Message.info(response.msg)
          }
        })
        .catch(error => {
          this.loading = false
        })
      this.loading = false
    },

    /**
     * 字符串校验
     */
    valueValidatorString (value, msg) {
      if (this.CommonUtils.isEmpty(value)) {
        this.$Message.info(msg)
        this.loading = false
        return true
      } else {
        return false
      }
    },

    getDefaultForm(){
      return undefined
    }

  }
}
