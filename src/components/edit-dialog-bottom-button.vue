<template>
  <div>
    <Button @click="handleCancel">取消</Button>
    <Button type="primary" @click="handleOk" :loading="loading">确定</Button>
  </div>
</template>
<script>
  export default {
    name: 'EditDialogBottomButton',
    props:{
      loading:{
        type: [Boolean],
        default: false,
      },
    },
    methods: {
      //排序选择修改
      handleCancel () {
        this.$emit('handleCancel')
      },
      handleOk () {
        this.$emit('handleOk')
      },
    },
  }
</script>



