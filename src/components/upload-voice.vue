<style lang="less">

</style>
<!--语音文件上传-->
<template>
  <div>
    <div>
      音频地址 {{voiceUrl}}
    </div>
    <Upload
      ref="upload"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="onProgress"
      :format="voiceFormat"
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
    name: 'uploadVoice',
    props: {
      buttonText: {
        default: '上传音频(最大30M)'
      },
      voiceUrl: ''
    },
    data () {
      return {
        loading:false,
        uploadUrl:  config.baseUrl.pro + '/file/uploadVoice',
        voiceFormat: ['mp3'],
      }
    },
    methods: {
      handleSuccess (response, file) {
        this.loading=false;
        this.$Message.info('上传成功');
        // console.log('文件上传成功')
        this.$emit('on-change', response.data.entity.url)
        this.$emit('on-change-duration', response.data.entity.duration)
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



