<style lang="less">

</style>
<!--语音文件上传-->
<template>
  <div>
    <div>
     {{fileName}}
    </div>
    <Upload
      ref="upload"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="onProgress"
      :data="{folderName:'cv'}"
      :max-size="30720"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :show-upload-list="false"
      :action="uploadUrl"
      :loading="loading"
    >
      <Button icon="ios-cloud-upload-outline" :loading="loading">{{buttonText}}</Button>
    </Upload>
  </div>
</template>

<script>
  import config from '@/config'
  export default {
    name: 'uploadFile',
    props: {
      buttonText: {
        default: '上传附件(最大30M)'
      },
      fileName: ''
    },
    data () {
      return {
        loading:false,
        uploadUrl:  config.baseUrl.dev + '/file/uploadFile',
        // voiceFormat: ['mp3'],
      }
    },
    methods: {
      handleSuccess (response, file) {
        this.loading=false;
        this.$Message.info('上传成功');
        this.$emit('on-change', response.data)
      },
      beforeUpload(){
        this.loading=true;
      },

      handleError (error, file, fileList) {
        this.loading=false;
        this.$Message.error(error.toString())
      },
      handleFormatError (file) {
        this.loading=false;
        this.$Notice.warning({
          title: '不支持的文件格式',
          desc:
            '所选文件‘ ' +
            file.name +
            ' ’格式不正确, 请选择 .mp3 格式文件'
        })
      },
      onProgress(data){
        console.log("上传进度"+data)
      },
      handleMaxSize (file) {
        this.loading=false;
        this.$Notice.warning({
          title: '文件大小过大',
          desc: '所选文件‘ ' + file.name + ' ’大小过大, 不得超过 30M.'
        })
      },
    },
  }
</script>



