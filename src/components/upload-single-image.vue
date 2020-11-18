<style lang="less">

</style>
<!--单图上传-->
<template>
  <div>
    <div>推荐上传尺寸 {{title}}</div>

    <img
      v-show="isMyEmpty(imageUrl)"
      :src="imageUrl"
      :style="{
        width:imageWidth,
        height:imageHeight ,
        margin:'10px 0 0 0' ,
        border:'1px solid #57A3F3' ,
        objectFit: 'cover'
      }"
      alt="">

    <Upload
      ref="upload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :format="voiceFormat"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :show-upload-list="false"
      :action="uploadUrl">
      <Button icon="ios-cloud-upload-outline">{{buttonText}}</Button>
    </Upload>
  </div>
</template>

<script>
  import { isEmpty } from '@/utils/ValueUtils'
  import config from '@/config'
  export default {
    name: 'uploadSingleImage',
    props: {
      buttonText: {
        default: '上传图片'
      },
      imageHeight: {
        default: '125px'
      },
      imageWidth: {
        default: '250px'
      },
      title: {
        default: 'X * Y'
      },
      //图片地址
      imageUrl: ''
    },
    data () {
      return {
        uploadUrl: config.baseUrl.pro+'file/uploadFile',
        voiceFormat: ['jpg', 'jpeg', 'png'],
      }
    },
    methods: {
      handleSuccess (response, file) {
        this.$emit('on-change', response.data.urls[0])
      },

      handleError (error, file, fileList) {
        this.$Message.error(error.toString())
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '不支持的文件格式',
          desc: '所选文件‘ ' + file.name + ' ’格式不正确, 请选择 .jpg .jpeg .png 格式文件'
        })
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '文件大小过大',
          desc: '所选文件‘ ' + file.name + ' ’大小过大, 不得超过 2M.'
        })
      },
      isMyEmpty (value) {
        return isEmpty(value)
      },
    },
  }
</script>



