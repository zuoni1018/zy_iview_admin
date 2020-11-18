<template>
  <!--  语音播放器-->
  <Modal
    :value="isShow"
    title="视频播放"
    @on-ok="cancel"
    @on-cancel="cancel"
    :width="700"
    @on-visible-change="visibleChange">
    <Row type="flex" justify="center" align="middle">
      <video ref="video" controls :id="videoId" style="width: 100%;max-height: 500px" >
      </video>
    </Row>
    <div slot="footer">
    </div>
  </Modal>
</template>

<script>

  export default {
    name: 'video_player',
    props: {
      isShow: {
        default: false,
      },
      playUrl: {
        default: '',
      },
    },
    data() {
      return {
        audio: null,
      }
    },
    computed: {
      videoId () {
        return `video${this._uid}`
      }
    },
    methods: {
      visibleChange(visible) {
        if (this.audio == null) {
          this.audio = document.getElementById(this.videoId)
        }
        if (visible) {
          if(this.playUrl===''){
            return
          }
          if (this.audio.src === this.playUrl) {
            this.audio.play()
          } else {
            this.audio.src = this.playUrl
            this.audio.load()
            this.audio.play()
          }
        } else {
          // console.log("弹窗消失")
          this.audio.pause()
        }
      },
      cancel() {
        this.$emit('cancel')
      },

    },
  }
</script>


