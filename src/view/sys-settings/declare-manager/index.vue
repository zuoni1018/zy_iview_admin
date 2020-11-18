<style scoped>

</style>
<template>
  <div>
    <Card style="height: 100%">
      <Tabs :animated="false" style="height: 100%" v-model="nowTabName">
        <TabPane label="用户协议" name="tab1">
          <web-editor
            is-show-dialog="true"
            :is-show-tab="nowTabName==='tab1'"
            id="1">
          </web-editor>
        </TabPane>
<!--        <TabPane label="cookie政策" name="tab2">-->
<!--          <web-editor-->
<!--            is-show-dialog="true"-->
<!--            :is-show-tab="nowTabName==='tab2'"-->
<!--            id="3">-->
<!--          </web-editor>-->
<!--        </TabPane>-->
<!--        <TabPane label="法律声明" name="tab3">-->
<!--          <web-editor-->
<!--            is-show-dialog="true"-->
<!--            :is-show-tab="nowTabName==='tab3'"-->
<!--            id="5">-->
<!--          </web-editor>-->
<!--        </TabPane>-->
        <TabPane label="关于我们" name="tab4">
          <web-editor
            is-show-dialog="true"
            :is-show-tab="nowTabName==='tab4'"
            id="4">
          </web-editor>
        </TabPane>
      </Tabs>
    </Card>

  </div>
</template>

<script>
  import WebEditor from '@/view/sys-settings/declare-manager/web-edictor/index'

  export default {
    name: 'index',
    components: { WebEditor },
    data () {
      return {
        nowTabName: '',
      }
    },
    methods: {
      getData () {

      },
    },
    mounted () {
      this.nowTabName = 'tab1'
    }
  }
</script>


