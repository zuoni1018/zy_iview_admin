<style lang="less">

</style>
<template>
  <div>
    <img
      v-show="isMyEmpty(imageUrl)"
      :src="imageUrl"
      style="
        width:100%;
        height:40px;
        object-fit: cover
      "
      alt="">
    <oss-upload
      ref="upload"
      @on-success="onSuccess"
      :format="format"
      :format-error-msg="formatErrorMsg">
      <div slot="table_center">
        <Button icon="ios-cloud-upload-outline">{{buttonText}}</Button>
      </div>
    </oss-upload>
  </div>
</template>

<script>
  import { isEmpty } from '@/utils/ValueUtils'
  import OssUpload from '@/components/oss-upload/oss-upload'

  export default {
    name: 'upload-details-single-image',
    components: { OssUpload },
    props: {
      buttonText: {
        default: '上传图片'
      },
      //膳食的图片尺寸
      showImageWidth: {
        default: 250
      },
      //原图宽
      originalImageWidth: {
        default: 250
      },
      //原图高
      originalImageHeight: {
        default: 250
      },
      //图片地址
      imageUrl: '',

    },
    data () {
      return {
        format: ['jpg', 'jpeg', 'png', 'gif'],
        formatErrorMsg: '',
      }
    },
    computed: {
      showImageHeight () {
        //计算原图比例
        return this.showImageWidth / (this.originalImageWidth / this.originalImageHeight)
      }
    },
    watch: {},
    methods: {
      /**
       * 文件上传成功回调
       * @param fileUrl
       */
      onSuccess (fileUrl) {
        console.log(fileUrl)
        this.$emit('on-change', fileUrl)
      },
      isMyEmpty (value) {
        return isEmpty(value)
      },
    },
  }
</script>



