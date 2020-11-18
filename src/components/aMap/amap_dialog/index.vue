<style scoped lang="less">

</style>
<template>
  <Modal
    width="1000"
    :closable="false"
    :value="isShow"
    title="拾取坐标"
    @on-ok="ok"
    class-name="vertical-center-modal"
    @on-cancel="cancel"
    :loading="loading"
    @on-visible-change="visibleChange">

    <a-map v-if="isShow"
           @updatePosition="updatePosition"
           :p-position="position"
    ></a-map>
  </Modal>
</template>

<script>

  import { editDialogMixin } from '@/base/EditDialogMixin'
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
        doPosition:undefined,

      }
    },
    computed: {
      // 计算属性的 getter
      position() {
        // `this` 指向 vm 实例
        return [
          this.lon,
          this.lat
        ]
      }
    },
    methods: {
      initFormDetails () {
        // console.log("@22222")
        // this.position = [
        //   this.lon,
        //   this.lat
        // ]
        // console.log( this.position)
      },
      updatePosition (position) {
        this.doPosition = position
        // console.log('切换坐标--->' + position)
      },
      //确认按钮点击事件
      ok () {
        this.loading = true
        //校验完成进行提交数据
        this.$emit('updatePosition', this.doPosition)
      },

    },
  }
</script>


