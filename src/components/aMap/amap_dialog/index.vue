<style scoped lang="less">

</style>
<template>
  <Modal
    width="1000"
    :closable="false"
    :mask-closable="false"
    :value="isShow"
    title="拾取坐标"
    class-name="vertical-center-modal"
    @on-visible-change="visibleChange">
    <a-map v-if="isShow"
           @updatePosition="updatePosition"
           :p-position="position"
    ></a-map>
    <div slot="footer">
      <EditDialogBottomButton
        :loading="loading"
        @handleCancel="cancel"
        @handleOk="ok"
      ></EditDialogBottomButton>
    </div>
  </Modal>
</template>

<script>

  import { editDialogMixin } from '@/base/EditDialogMixin2'
  import AMap from '@/components/aMap/aMap'

  export default {
    components: { AMap },
    mixins: [editDialogMixin],
    name: 'amap_dialog',
    props: {
      lon: {
        default: 0,
      },
      lat: {
        default: 0,
      }
    },
    data () {
      return {
        doPosition: undefined,
      }
    },
    computed: {
      position () {
        return [
          this.lon,
          this.lat
        ]
      }
    },
    methods: {
      initFormDetails () {

      },
      updatePosition (position) {
        this.doPosition = position
      },
      //确认按钮点击事件
      ok () {
        let position=this.doPosition;
        if (position !== undefined) {
          this.dismissDialog()
          this.$emit('update:lon',position[0])
          this.$emit('update:lat',position[1])
        }else {
          this.$Message.info('请选择坐标')
        }
      },
    },
  }
</script>


