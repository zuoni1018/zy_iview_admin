export const DialogTabMixin = {

  props: {
    isShowDialog: {
      default: false,
    },
    isShowTab: {
      default: false,
    },
    id: {
      default: 1,
    },

  },

  data () {
    return {
      //是否拿到数据了
      isGetData: true,
    }
  },

  watch: {
    isShowDialog (val, oldVal) {
      // console.log("弹窗状态发生改变: "+val);
      if (!val) {
        //弹窗都不显示了
        //那么下次数据要重新加载
        this.isGetData = true
      }
      this.initUi()
    },
    isShowTab (val, oldVal) {
      // console.log("tab发生改变: "+val);
      this.initUi()
    },
  },

  methods: {

    initUi () {
      if (this.isShowDialog && this.isShowTab && this.isGetData) {
        this.isGetData=false;
        this.getUiData()
      }
    },
    reInitUi () {
      //重新加载数据
      this.isGetData=true;
      if (this.isShowDialog && this.isShowTab && this.isGetData) {
        this.isGetData=false;
        this.getUiData()
      }
    },
    getUiData () {

    }

  }
}
