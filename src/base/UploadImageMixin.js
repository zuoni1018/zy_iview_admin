import config from '@/config'

export const uploadImageMixin = {

  data() {
    return {
      //上传地址
      uploadUrl: config.baseUrl.pro+'file/uploadFile',
      imageFormat: ['jpg','jpeg','png'],
    }
  },
  methods: {
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式有问题',
        desc: '请上传jpg 或者 png 的文件'
      });
    },
  }
};
