<style lang="less">

  .play_icon {
    width: 30px;
    height: 30px;
    position: absolute;
  }

</style>


<template>
  <div>
    <div>
      <div
        style="position: relative;margin-bottom: 10px;cursor: pointer"
        :style="{
        textAlign:'center',
        width:showImageWidth+'px',
        height:showImageHeight+'px' ,
        margin:'10px 0 0 0' ,
        border:'1px solid #57A3F3' ,
      }"
        v-if="isMyEmpty(videoUrl)"
        @click=" isShowVideoDialog=true"
      >
        <img
          style="width: 100%;height: 100%;object-fit: cover"
          :src="videoCoverUrl"
        >
        </img>

        <img
          class="play_icon"
          :style="{
          left:(showImageWidth/2-15)+'px',
            top:(showImageHeight/2-15)+'px' ,
          }"
          src="../../../src/assets/play.png"
        >
      </div>
      <oss-upload

        ref="upload"
        @on-success="onSuccess"
        :format="format"
        :format-error-msg="formatErrorMsg">
        <div slot="table_center">
          <Button icon="ios-cloud-upload-outline">{{buttonText}}</Button>
        </div>
      </oss-upload>

    </div>

    <video_player
      :isShow="isShowVideoDialog"
      :play-url="videoUrl"
      @cancel="isShowVideoDialog=false"
    ></video_player>
  </div>


</template>

<script>
  import { isEmpty } from '@/utils/ValueUtils'
  import OssUpload from '@/components/oss-upload/oss-upload'
  import Video_player from '@/components/video_player/index'

  export default {
    name: 'uploadVideo',
    components: { Video_player, OssUpload },
    props: {
      buttonText: {
        default: '上传视频'
      },
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
      //视频地址
      videoUrl: '',
      videoCoverUrl:'',
    },
    data () {
      return {
        isShowVideoDialog: false,
        format: ['mp4'],
        formatErrorMsg: '',
      }
    },
    computed: {
      showImageHeight () {
        //计算原图比例
        return this.showImageWidth / (this.originalImageWidth / this.originalImageHeight)
      }
    },
    watch: {},
    methods: {
      /**
       * 文件上传成功回调
       * @param fileUrl
       */
      onSuccess (fileUrl) {
        this.$emit('on-change', fileUrl)
      },
      isMyEmpty (value) {
        console.log(value)
        return isEmpty(value)
      },
    },
  }
</script>



