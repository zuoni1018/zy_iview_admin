<style lang="less" scoped>
  /deep/ .ivu-tooltip-popper {
    z-index: 99999;
  }
</style>
<!--图标+提示文字-->
<template>
  <Tooltip :content="content" transfer :ref="tipId">
    <Button :icon="icon" :type="type" @click="click" :size="size" :disabled="disabled"></Button>
  </Tooltip>
</template>

<script>
  export default {
    name: 'tip-button',
    props: {
      icon: {
        type: String,
        default: 'ios-search'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'small'
      },
      type: {
        type: String,
        default: 'primary'
      },
      content: {
        type: String,
        default: '-'
      },

    },
    computed: {
      tipId () {
        return `tipId${this._uid}`
      },

    },
    data () {
      return {}
    },
    methods: {
      /**
       * 文件上传成功回调
       */
      click () {
        this.$refs[this.tipId].visible=false
        setTimeout(() => {
          this.$emit('click')
        }, 130)
      },
    }
  }
</script>



