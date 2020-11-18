<style scoped>

</style>
<template>

  <div >
    <Button type="primary" @click="clickBack" style="position: absolute;">
      <Icon type="ios-arrow-back"/>
      返回
    </Button>
  </div>
</template>

<script>

  import { defaultTableMixin } from '@/common/DefaultTableMixin'

  export default {
    name: 'page-02',
    mixins: [defaultTableMixin],
    props: {

      orderId: {
        default: 0,
      }
    },
    data () {
      return {

      }
    },
    methods: {

    }
  }
</script>


