<style lang="less" scoped>
  .main {
    cursor: pointer;
    width: 100%;
    height: auto;
    line-height: 80px;
    white-space: nowrap;
    display: flex;
    flex-wrap: wrap;
  }

  .image-content {
    height: 80px;
    width: 80px;
    position: relative;
    display: inline-block;
  }

  .aaaa {
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
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    object-fit: cover;
  }

  .player_icon {
    position: absolute;
    top: 28px;
    left: 28px;
  }

  .delete_icon {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
</style>
<!--组件功能描述-->
<!--1、图片、视频选取直接上传阿里云 已实现-->
<!--2、可查看上传的图片与视频 已实现-->
<!--3、item 可拖动排序-->
<!--4、可多选资源文件-->
<template>

  <div :id="imageList">
    <draggable
      class="main"
      :options="options"
      :value="resArray"
      @input="handleListChange($event)"
    >
      <div
        class="image-content"
        v-for="(item,index) in resArray" :key="`drag_li1_${index}`">
        <img class="image-style" :src="item.imageUrl" v-lazy="item.imageUrl" alt="showBigImage"
             v-if="item.resType==='image'">
        <img class="image-style" :src="item.videoCoverUrl" v-lazy="item.videoCoverUrl" alt="" v-if="item.resType==='video'"
             @click="clickRes(item)">
        <!--      右上角x-->
        <Icon class="player_icon" color="#001BB0" size="24" type="md-arrow-dropright-circle"
              v-if="item.resType==='video' " @click="clickRes(item)"/>

        <Icon class="delete_icon" type="ios-close-circle" color="#F10300" size="24"
              @click="deleteIndex(item,index)" v-if="!onlyShow"/>
      </div>

      <div class="aaaa" v-show="resArray.length<maxPicNum" v-if="!onlyShow">
        <!--      上传图片-->
        <oss-upload
          ref="upload"
          class="image-style"
          @onSuccessWithExtension="onSuccessWithExtension"
          :format="format"
          :format-error-msg="formatErrorMsg">
          <div slot="table_center">
            <img src="../../assets/ic_141.png" alt="add" style="height: 58px;width: 58px">
          </div>
        </oss-upload>
      </div>
    </draggable>
    <video_player
      :isShow="isShowVideoDialog"
      :play-url="videoPlayUrl"
      @cancel="isShowVideoDialog=false"
    ></video_player>
  </div>
</template>
<script>
  import draggable from 'vuedraggable'
  import Viewer from 'viewerjs'
  import 'viewerjs/dist/viewer.css'
  import OssUpload from '@/components/oss-upload/oss-upload'
  import Video_player from '@/components/video_player/index'

  export default {
    name: 'editResList',
    components: { Video_player, OssUpload, draggable },
    model: {
      prop: 'resArray',
      event: 'on-change'
    },
    props: {
      imageUrl: '',
      format: {
        type: Array,
        default: () => ['jpg', 'jpeg', 'png', 'gif', 'mp4'],
      },
      //资源列表
      resArray: {
        type: Array,
        default: () => []
      },
      //是否只用作展示
      onlyShow: {
        type: Boolean,
        default: () => false
      },
      maxPicNum: {
        default: 4
      },
      onLineNum: {
        default: 3
      }
    },

    data () {
      return {
        options: { group: this.imageList, draggable: '.image-content' },
        videoPlayUrl: '',
        isShowVideoDialog: false,
        formatErrorMsg: '',
        viewer: undefined,
      }
    },
    computed: {
      imageList () {
        return `imageList${this._uid}`
      },

    },
    mounted () {
      const ViewerDom = document.getElementById(this.imageList)
      this.viewer = undefined
      this.viewer = new Viewer(ViewerDom, {
        zIndex: 9999,
        zIndexInline:9999,
        filter: function (image) {
          return image.alt === 'showBigImage'
        },
      })
    },
    methods: {
      updateViewer () {
        this.$nextTick(() => {
          this.viewer.update()
        })
      },
      //删除某个节点的数据
      deleteIndex (item, index) {
        let newResArray = this.resArray
        newResArray.splice(index, 1)
        this.$emit('on-change', newResArray)
        this.updateViewer()
      },
      clickRes (res) {
        if (res.resType === 'video') {
          this.videoPlayUrl = res.videoUrl
          this.isShowVideoDialog = true
        }
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
      onSuccessWithExtension (uploadRes) {
        let newResArray = this.resArray
        let res = {}
        if (uploadRes.fileExtension === 'mp4') {
          res.resType = 'video'
          res.videoUrl = uploadRes.fileUrl
          res.videoCoverUrl = uploadRes.fileUrl + '?x-oss-process=video/snapshot,t_10000,m_fast'
        } else {
          res.resType = 'image'
          res.imageUrl = uploadRes.fileUrl
        }
        newResArray.push(res)
        this.$emit('on-change', newResArray)
        this.updateViewer()
      },

      handleListChange (value) {
        this.$nextTick(() => {
          this.$emit('on-change', value)
          this.updateViewer()
        })
      },

    },
  }
</script>



