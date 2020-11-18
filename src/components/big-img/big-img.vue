<style lang="less">

</style>
<template>
  <div style="cursor: pointer">
    <img
      v-show="isMyEmpty(imageUrl)"
      v-lazy="imageUrl"
      @click="clickImage(imageUrl)"
      :style="{
        width:showImageWidth+'px',
        height:showImageHeight+'px' ,
        margin:'10px 0 0 0' ,
        border:'1px solid #57A3F3' ,
        objectFit: 'cover',

      }"
      alt="">
  </div>
</template>
<script>
  import { isEmpty } from '@/utils/ValueUtils'
  import Viewer from 'viewerjs'
  import 'viewerjs/dist/viewer.css'

  export default {
    name: 'bigImg',
    props: {
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
    computed: {
      showImageHeight () {
        //计算原图比例
        return this.showImageWidth / (this.originalImageWidth / this.originalImageHeight)
      }
    },
    data () {
      return {
        isShowBigImage: false,
      }
    },
    methods: {
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
      isMyEmpty (value) {
        return isEmpty(value)
      },
    },
  }
</script>



