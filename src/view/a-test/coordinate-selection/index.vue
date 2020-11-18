<style scoped>

</style>
<template>
  <Card>
    <Divider orientation="left">坐标拾取>>>高德地图</Divider>

    <div>
      <InputNumber
        v-model="coordinate.lon "
        :min="0"
        style="width: 100px"
        maxlength="11"/>
      <InputNumber
        v-model="coordinate.lat "
        :min="0"
        style="margin-left: 10px;width: 100px"
        maxlength="11"/>
      <Button
        type="primary"
        size="small"
        style="margin-left: 10px"
        icon="md-pin" @click="isShowAmapDialog=true">

      </Button>
    </div>

    <amap_dialog
      @cancel="isShowAmapDialog=false"
      :isShow="isShowAmapDialog"
      @updatePosition="updatePosition"
      :lon="coordinate.lon"
      :lat="coordinate.lat"
    >
    </amap_dialog>
  </Card>
</template>

<script>
  import Amap_dialog from '@/components/aMap/amap_dialog/index'

  export default {
    name: 'index',
    components: { Amap_dialog },
    data () {
      return {
        isShowAmapDialog: false,
        coordinate: {
          lon:120,
          lat: 30,
        },
      }
    },
    methods: {
      updatePosition (position) {
        this.isShowAmapDialog = false
        if (position === undefined) {
          return
        }
        this.coordinate.lon = position[0]
        this.coordinate.lat = position[1]
      },
    }
  }
</script>


