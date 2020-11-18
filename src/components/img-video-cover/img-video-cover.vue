<style lang="less">

</style>
<!--图片视频封面组件-->
<template>
  <div style="cursor: pointer;text-align: center;">

    <div v-if="cover.resType===0">
      <img
        :src="cover.imageUrl"
        @click="clickImage(cover.imageUrl)"
        :style="{
        width:showImageWidth+'px',
        height:showImageHeight+'px' ,
        margin:'10px 0 0 0' ,
        border:'1px solid #57A3F3' ,
        objectFit: 'cover',

      }"
        alt="">
    </div>

    <div v-if="cover.resType===1"   :style="{
        width:showImageWidth+'px',
        height:showImageHeight+'px' ,
        border:'1px solid #57A3F3' ,
        position:'relative',
        margin:'0 auto',
                marginBottom:'5px',
      marginTop:'5px',
      }"  @click=" isShowVideoDialog =true">
      <img
        :src="cover.videoCoverUrl"
        style="width: 100%;height: 100%;object-fit: cover"
        alt="">

      <img
        :style="{
        width:'30px',
        height:'30px',
        position: 'absolute',
        top:(showImageHeight/2-15)+'px',
        left :(showImageWidth/2-15)+'px'
        }"
        src="../../../src/assets/play.png"
      >

    </div>



    <video_player
      :isShow="isShowVideoDialog"
      :play-url="cover.videoUrl"
      @cancel="isShowVideoDialog=false"
    ></video_player>

    <!--    <Modal-->
    <!--      width="800"-->
    <!--      v-model="isShowBigImage">-->
    <!--      <img-->
    <!--        style=" margin: 0 auto; display: block; max-width: 100%;max-height: 800px"-->
    <!--        :src="imageUrl" alt="">-->
    <!--      <div slot="footer">-->
    <!--      </div>-->
    <!--    </Modal>-->
  </div>
</template>
<script>

  import { isEmpty } from '@/utils/ValueUtils'
  import Viewer from 'viewerjs'
  import 'viewerjs/dist/viewer.css'
  import Video_player from '@/components/video_player/index'
  export default {
    name: 'img-video-cover',
    components: { Video_player },
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
      cover:{
        resType:0,imageUrl:'',videoUrl:'',videoCoverUrl:'',
      }

    },
    computed: {
      showImageHeight () {
        //计算原图比例
        return this.showImageWidth / (this.originalImageWidth / this.originalImageHeight)
      }
    },
    data () {
      return {
        isShowVideoDialog:false,

        isShowBigImage: false,
      }
    },
    methods: {
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



