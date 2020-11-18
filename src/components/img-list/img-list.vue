<style lang="less" scoped>
  .main {
    cursor: pointer;
    margin-top: 5px;
    width: 100%;
    white-space: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }

  .image-style {
    flex-shrink: 0;
    list-style: none;
    display: -webkit-box;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    width: 50px;
    height: 50px;
    display: inline-block;
    margin-left: 5px;
    margin-right: 5px;
    object-fit: cover;
  }
</style>
<template>
  <div class="main" :id="imageList">
    <img class="image-style" v-for="item in getImageUrlList()" :src="item" alt="">
  </div>
</template>
<script>

  import { isEmpty } from '@/utils/ValueUtils'
  import Viewer from 'viewerjs'
  import 'viewerjs/dist/viewer.css'

  export default {
    name: 'ImgList',
    props: {
      imageUrl: ''
    },

    data () {
      return {}
    },
    computed: {
      imageList () {
        return `imageList${this._uid}`
      }
    },
    mounted () {
      const ViewerDom = document.getElementById(this.imageList)
      const viewer = new Viewer(ViewerDom, {
        // 相关配置项,详情见下面
        zIndex: 9999,
        zIndexInline:9999
      })
    },
    methods: {

      getImageUrlList () {
        if (this.imageUrl === '' || this.imageUrl === undefined) {
          return []
        }
        return this.imageUrl.split(',')
      },

      clickImage (imageUrl) {
        // document.createElement("div");
        let image = new Image()
        image.src = imageUrl
        let viewer = new Viewer(image, {
          hidden: function () {
            viewer.destroy()
          }
        })
        viewer.show()
      },
      isMyEmpty (value) {
        return isEmpty(value)
      },
    },
  }
</script>



