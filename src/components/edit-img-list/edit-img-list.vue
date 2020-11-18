<style lang="less" scoped>
  .main {
    cursor: pointer;
    width: 100%;
    height: 80px;
    line-height: 80px;
    white-space: nowrap;
    /*overflow-x: auto;*/
    /*-webkit-overflow-scrolling: touch;*/
    /*scrollbar-width: none; !* firefox *!*/
    /*-ms-overflow-style: none; !* IE 10+ *!*/
  }

  .image-content {
    height: 80px;
    width: 80px;
    position: relative;
    display: inline-block;
  }

  .image-style {
    width: 58px;
    height: 58px;
    margin-top: 10px;
    margin-left: 10px;
    position: absolute;
    cursor: pointer;
    border-radius:10px;
    -webkit-border-radius:10px;
    -moz-border-radius:10px;
    object-fit: cover;
  }

  .delete_icon {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
</style>
<template>
  <div class="main" :id="imageList">
    <div
      class="image-content"
      v-for="(item,index) in imageUrlArray()">
      <!--      右上角x-->
      <img class="image-style" :src="item" alt="">
      <Icon class="delete_icon" type="ios-close-circle" color="#F10300" size="24"
            @click="deleteIndex(item,index)"/>
    </div>

    <div class="image-content" v-show="imageUrlArray().length<maxPicNum">
      <!--      上传图片-->
      <oss-upload
        ref="upload"
        class="image-style"
        @on-success="onSuccess"
        :format="format"
        :format-error-msg="formatErrorMsg">
        <div slot="table_center">
          <img src="../../assets/ic_141.png" alt="add" style="height: 58px;width: 58px">
        </div>
      </oss-upload>
    </div>
  </div>
</template>
<script>

  import { isEmpty } from '@/utils/ValueUtils'
  import Viewer from 'viewerjs'
  import 'viewerjs/dist/viewer.css'
  import OssUpload from '@/components/oss-upload/oss-upload'
  import Video_player from '@/components/video_player/index'

  export default {
    name: 'editImgList',
    components: { Video_player, OssUpload },
    model: {
      prop: 'imageUrl',  // 自定义prop属性
      event: 'on-change'    // 自定义它的触发方法名
    },
    props: {
      imageUrl: '',
      maxPicNum:{
        default:4
      }
    },

    data () {
      return {
        format: ['jpg', 'jpeg', 'png', 'gif'],
        formatErrorMsg: '',
        viewer:undefined
      }
    },
    computed: {
      imageList () {
        return `imageList${this._uid}`
      },

    },
    mounted () {
      const ViewerDom = document.getElementById(this.imageList)
     this.  viewer = new Viewer(ViewerDom, {
       zIndex: 9999,
       zIndexInline:9999,
        filter: function (image) {
          return image.alt !== 'add'


        },
      })
    },
    methods: {
      //删除某个节点的数据
      deleteIndex (item, index) {
        let oldArray = this.imageUrlArray()
        oldArray.splice(index, 1)
        let newImageUrl = ''
        for (let i = 0; i < oldArray.length; i++) {
          if (newImageUrl === '') {
            newImageUrl = oldArray[i]
          } else {
            newImageUrl = newImageUrl + ',' + oldArray[i]
          }
        }
        this.$emit('on-change', newImageUrl)
        this.updateViewer()
      },
      imageUrlArray () {
        if (this.imageUrl === '' || this.imageUrl === undefined) {
          return []
        }
        return this.imageUrl.split(',')
      },

      clickImage (imageUrl) {
        let image = new Image()
        image.src = imageUrl
        let viewer = new Viewer(image, {
          hidden: function () {
            viewer.destroy()
          }
        })
        viewer.show()
      },
      /**
       * 文件上传成功回调
       * @param fileUrl
       */
      onSuccess (fileUrl) {
        let newImageUrl=this.imageUrl;
        if(!this.isMyEmpty(newImageUrl)){
          newImageUrl=fileUrl;
        }else {
          newImageUrl=newImageUrl+","+fileUrl;
        }
        this.$emit('on-change', newImageUrl)
        this.updateViewer()
      },
      isMyEmpty (value) {
        return isEmpty(value)
      },
      updateViewer () {
        this.$nextTick(() => {
          this.viewer.update()

        })
      },
    },
  }
</script>



