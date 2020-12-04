<style scoped>

</style>
<template>
  <Card>
    <Divider orientation="left">点击大图(单图)</Divider>
    <BigImg
      :image-url="testImageUrl"
      show-image-width="60">
    </BigImg>
    <Divider orientation="left">阿里云Oss单图上传</Divider>
    <UploadSingleImage
      show-image-width="100"
      original-image-height="100"
      original-image-width="100"
      :image-url="headImage"
      @on-change="headImage=$event"
    >
    </UploadSingleImage>
    <Divider orientation="left">阿里云Oss多图、视频上传(可拖动排序)+点击视频弹窗组件</Divider>
    <EditResList
      v-model="resArray">
    </EditResList>

    <Divider orientation="left">图片、视频封面 还需要再改</Divider>
    <div style="float: left;">
      <ImgVideoCover
        :cover="cover"
        show-image-width="120">
      </ImgVideoCover>
    </div>
    <Divider orientation="left">TipButton</Divider>
    <div>
      <TipButton
        content="编辑"
        icon="md-create"
        type="primary"
        style="margin-right: 10px">
      </TipButton>
      <TipButton
        content="删除"
        icon="md-trash"
        type="error">
      </TipButton>
    </div>
  </Card>
</template>
<script>

  export default {
    name: 'index',
    components: {},

    data () {
      return {
        testImageUrl: this.$config.testImageUrl,
        headImage: this.$config.testImageUrl,
        resArray: [],
        cover: {
          resType: 0,
          imageUrl: this.$config.testImageUrl,
          videoUrl: '',
          videoCoverUrl: ''
        },
      }
    },
    methods: {
    }

  }
</script>


