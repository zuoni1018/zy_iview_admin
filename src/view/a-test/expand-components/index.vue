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
    <Divider orientation="left">导出菜单</Divider>
    <div>{{menuData}}</div>
  </Card>
</template>
<script>
  import routers from '@/router/routers'

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
        menuData: '',
      }
    },

    mounted () {
      let list = routers
      let mList = []
      for (let j = 0, len = list.length; j < len; j++) {
        let d = this.getData(list[j])
        if (d !== null) {
          mList.push(d)
        }
      }
      this.menuData = mList
    },

    methods: {
      getData (listData) {
        let mData
        let pChildren = listData.children
        let mChildren = []
        if (pChildren !== undefined) {
          for (let j = 0, len = pChildren.length; j < len; j++) {
            let d = this.getData(pChildren[j])
            if (d !== null) {
              mChildren.push(d)
            }
          }
        }
        let name = listData.name
        let meta = listData.meta
        let title = meta.title
        let hideInMenu = meta.hideInMenu
        mData = {
          name: name,
          title: title,
          children: mChildren
        }
        //console.log(hideInMenu)
        if (hideInMenu !== undefined && hideInMenu === true) {
          return null
        }
        return mData
      },
    }

  }
</script>


