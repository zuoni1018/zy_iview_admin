<style lang="less" scoped>
  /*.demo-spin-icon-load {*/
  /*  animation: ani-demo-spin 1s linear infinite;*/
  /*}*/
  /deep/ .ivu-modal-footer {
    border-top: 0;
    padding: 12px 18px 12px 18px;
    text-align: right;
  }

  /deep/ .ivu-modal-footer {
    padding: 0;
  }

  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .demo-spin-col {
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }
</style>
<template>

  <div>
    <Modal
      width="110"
      :closable="false"
      :mask-closable="false"
      v-model="loading"
    >

      <div style="width: auto;height: 80px;">
        <Icon type="ios-loading" style="margin-top: 10px;margin-left: 16px"
              class="demo-spin-icon-load" size="50"/>
      </div>

      <div slot="footer">
      </div>
    </Modal>
    <!--  oss上传组件-->
    <Upload
      ref="upload"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="onProgress"
      :max-size="maxSize"
      :data='uploadData'
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :show-upload-list="false"
      :action="uploadHost"
      :loading="loading"
      :format="format"
    >
      <slot name="table_center"></slot>

    </Upload>
  </div>

</template>

<script>
  import { getAliOssPolicy } from '@/api/file'

  export default {
    name: 'ossUpload',
    props: {
      format: {
        type: Array,
        default: []
      },
      formatErrorMsg: {
        type: String,
        default: ''
      },
      maxSize: {
        type: Number,
        default: 30 * 1024
      },
    },

    data () {
      return {
        loading: false,
        // 附件上传携带参数
        uploadData: {},
        uploadHost: '',
        fileUrl: '',
      }
    },
    methods: {
      /**
       * 文件上传成功回调
       */
      handleSuccess (response, file) {
        this.hideSpin()
        let fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1)
        console.log(response)
        if(response!==undefined){
          if(response.data!==undefined){
            let mimeType=response.data.mimeType;
            if(mimeType.indexOf("image") !== -1){
              this.fileUrl=this.fileUrl+"?m_w="+response.data.width+"&m_h="+response.data.height
            }
          }
        }
        // this.loading = false
        this.$Message.info('上传成功')
        this.$emit('onSuccessWithExtension', {
          fileUrl: this.fileUrl,
          fileExtension: fileExtension
        })
        this.$emit('on-success', this.fileUrl)
      },
      /**
       * 上传文件之间获取OSS参数
       * @param file
       * @returns {boolean}
       */
      async beforeUpload () {
        this.showSpin()
        //获取OSS参数
        let aliOssPolicy = await getAliOssPolicy()
        //判断是否成功
        if (aliOssPolicy.status === 200) {
          this.uploadHost = aliOssPolicy.data.host
          this.uploadData = aliOssPolicy.data
          this.fileUrl = aliOssPolicy.data.url
          return true
        } else {
          //失败
          this.hideSpin()
          if (aliOssPolicy.msg !== undefined) {
            this.$Message.error(aliOssPolicy.msg)
          }
          return new Promise.reject()
        }
      },
      /**
       * 文件上传失败
       * @param error
       * @param file
       * @param fileList
       */
      handleError (error, file, fileList) {
        this.hideSpin()
        this.$Message.error(error.toString())
      },

      handleFormatError (file) {
        this.hideSpin()
        this.$Notice.warning({
          title: '不支持的文件格式',
          desc:
            '所选文件‘ ' +
            file.name +
            ' ’格式不正确, 请选择 ' + this.formatErrorMsg + ' 格式文件'
        })
      },
      onProgress (data) {
        console.log('上传进度' + data)
      },
      handleMaxSize (file) {
        this.hideSpin()
        this.$Notice.warning({
          title: '文件大小过大',
          desc: '所选文件‘ ' + file.name + ' ’大小过大, 不得超过 30M.'
        })
      },

      showSpin () {
        this.loading = true
        // this.$Spin.show({
        //   render: (h) => {
        //     return h('div', [
        //       h('Icon', {
        //         'class': 'demo-spin-icon-load',
        //         props: {
        //           type: 'ios-loading',
        //           size: 18
        //         }
        //       }),
        //       h('div', '文件上传中')
        //     ])
        //   }
        // })
      },
      hideSpin (isDelay) {
        let delayTime
        if (isDelay) {
          delayTime = 200
        } else {
          delayTime = 100
        }
        setTimeout(() => {
          this.loading = false
          // this.$Spin.hide()
        }, delayTime)

      }
    },
  }
</script>



