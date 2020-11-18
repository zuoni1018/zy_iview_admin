<style scoped>

</style>
<template>
  <div>
    <div v-if="nowShowUi==='page-02'">
      <page-02
        @back="back">
      </page-02>
    </div>
    <div v-show="nowShowUi==='main'">
      <Card style="margin-bottom: 10px">
        <div>page1</div>
        <Button type="primary" @click="nowShowUi='page-02'">
          page02>>
        </Button>
      </Card>
    </div>
  </div>
</template>
<script>

  import { defaultTableMixin } from '@/common/DefaultTableMixin'
  import Page02 from '@/view/a-test/current-page-jump/page-02/index'

  export default {
    name: 'index',
    mixins: [defaultTableMixin],
    components: { Page02 },

    data () {
      return {}
    },
    methods: {}
  }
</script>


