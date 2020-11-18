<style lang="less">

</style>
<!--单图上传-->
<template>
  <div>
    <div>推荐上传尺寸 {{originalImageWidth +'x'+originalImageHeight}}</div>
    <img
      v-show="isMyEmpty(imageUrl)"
      :src="imageUrl"
      :style="{
        width:showImageWidth+'px',
        height:showImageHeight+'px' ,
        margin:'10px 0 0 0' ,
        border:'1px solid #57A3F3' ,
        objectFit: 'cover'
      }"
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
    name: 'uploadSingleImage',
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
        this.$emit('on-change', fileUrl)
      },
      isMyEmpty (value) {
        return isEmpty(value)
      },
    },
  }
</script>



