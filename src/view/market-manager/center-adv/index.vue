<style scoped>

</style>
<template>
  <div>
    <common-banner
      :show-type="1"
    ></common-banner>
  </div>
</template>
<script>
  import CommonBanner from '@/view/market-manager/banner/common-banner/index'

  export default {
    name: 'index',
    mixins: [],
    components: { CommonBanner },
    data () {
      return {}
    },
    methods: {},
    computed: {},
  }
</script>


