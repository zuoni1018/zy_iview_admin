<template>
  <div class="editor-wrapper">
    <div :id="editorId" ></div>
  </div>
</template>

<script>
  import Editor from 'wangeditor'
  import 'wangeditor/release/wangEditor.min.css'
  import { oneOf } from '@/libs/tools'
  import { getAliOssPolicy } from '@/api/file'

  export default {
    name: 'Editor',
    data () {
      return {
        url: '',
      }
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      /**
       * 绑定的值的类型, enum: ['html', 'text']
       */
      valueType: {
        type: String,
        default: 'html',
        validator: (val) => {
          return oneOf(val, ['html', 'text'])
        }
      },
      /**
       * @description 设置change事件触发时间间隔
       */
      changeInterval: {
        type: Number,
        default: 200
      },
      /**
       * @description 是否开启本地存储
       */
      cache: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      editorId () {
        return `editor${this._uid}`
      }
    },
    methods: {
      setHtml (val) {
        this.editor.txt.html(val)
      },

      sdo (val) {
        this.editor.cmd.do('insertHTML', val)
      },
      uploadInit () {
        console.log('sssss')
      }

    },
    mounted () {
      this.editor = new Editor(`#${this.editorId}`)
     this. editor.customConfig.zIndex = 50
      this.editor.customConfig.onchange = (html) => {
        let text = this.editor.txt.text()
        if (this.cache) localStorage.editorCache = html
        this.$emit('input', this.valueType === 'html' ? html : text)
        this.$emit('on-change', html, text)
      }
      this.editor.customConfig.onfocus = () => {
        console.log('onfocus')
        this.$emit('onfocus', true)
      }
      this.editor.customConfig.onblur = () => {
        // html 即编辑器中的内容
        console.log('onblur')
        this.$emit('onfocus', false)
      }
      // this.editor.customConfig.uploadImgHeaders = {
      //   'X-CSRF-TOKEN': $('input[name="_token"]').val()
      // }
      // this.editor.customConfig.uploadFileName = 'file'
      // this.editor.customConfig.uploadImgServer = config.baseUrl.pro + 'file/uploadFile'
      // 隐藏“网络图片”tab
      this.editor.customConfig.showLinkImg = false
      this.editor.customConfig.uploadImgHooks = {
        customInsert: function (insertImg, result, editor) {
          insertImg(result.data.url)
        }
      }
      //自定义上传图片
      this.editor.customConfig.customUploadImg = async (files, insert) => {
        this.$Spin.show()
        //获取OSS参数
        let aliOssPolicy = await getAliOssPolicy()
        aliOssPolicy.file = files[0]
        //判断是否成功
        if (aliOssPolicy.status === 200) {
          //拿到签名
          let formData = new FormData()
          let aliOssConfig = aliOssPolicy.data
          Object.keys(aliOssConfig).forEach((key) => {
            formData.append(key, aliOssConfig[key])
          })
          //添加文件
          formData.append('file', files[0])
          //保存回调地址
          this.url = aliOssConfig.url
          this.$http.post(aliOssPolicy.data.host, formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function (data) {
              return data
            }
          }).then(res => {
            this.$Spin.hide()
            this.sdo('<img src="' + this.url + '" style="height: auto; width:100%;"/>')
          }).catch(err => {
            this.$Spin.hide()
            console.log(err)
          })
        } else {
          //失败
          this.$Spin.hide()
          if (aliOssPolicy.msg !== undefined) {
            this.$Message.error(aliOssPolicy.msg)
          }
        }
      }

      this.editor.customConfig.pasteTextHandle = function (content) {
        // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
        if (content == '' && !content) return ''
        var str = content
        str = str.replace(/<xml>[\s\S]*?<\/xml>/ig, '')
        str = str.replace(/<style>[\s\S]*?<\/style>/ig, '')
        str = str.replace(/<\/?[^>]*>/g, '')
        str = str.replace(/[ | ]*\n/g, '\n')
        str = str.replace(/&nbsp;/ig, '')
        return str
      }

      this.editor.customConfig.onchangeTimeout = this.changeInterval
      // create这个方法一定要在所有配置项之后调用
      this.editor.create()
      // 如果本地有存储加载本地存储内容
      let html = this.value || localStorage.editorCache
      if (html) this.editor.txt.html(html)
    }
  }
</script>

<style lang="less">
  /*.editor-wrapper *{*/
  /*  z-index: 100 !important;*/
  /*}*/
  /*.w-e-menu{*/
  /*  z-index: 3 !important;*/
  /*}*/
  /*.w-e-text-container{*/
  /*  z-index: 2 !important;*/
  /*}*/
</style>
