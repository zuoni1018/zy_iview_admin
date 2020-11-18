<template>
  <!--  语音播放器-->
  <Modal
    :value="isShow"
    title="语音播放"
    @on-ok="cancel"
    @on-cancel="cancel"
    :width="700"
    @on-visible-change="visibleChange">

    <Row type="flex" justify="center" align="middle" >
      <audio controls id="audio" style="width: 100%">
        <source src="http://192.168.0.202:9012/mp3Voice/4da7e2d5-574f-4ef8-9d94-aaeb9ae5292f.mp3">
      </audio>
    </Row>
    <div slot="footer">
    </div>
  </Modal>
</template>

<script>

  export default {
    name: 'voice_player',
    props: {
      isShow: {
        default: false,
      },
      playUrl: {
        default: '',
      },
    },
    data () {
      return {
        audio: null,
      }
    },
    methods: {
      visibleChange (visible) {
        if (this.audio == null) {
          this.audio = document.getElementById('audio')
        }
        if (visible) {
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
      cancel () {
        this.$emit('cancel')
      },

    },
  }
</script>


