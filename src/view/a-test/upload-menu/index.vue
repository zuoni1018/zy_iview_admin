<style scoped>

</style>
<template>
  <Card>
    <Divider orientation="left">菜单</Divider>
    <Button type="primary" @click="uploadMenuData" :loading="loading">更新</Button>
    <pre v-html="menuData"></pre>
  </Card>
</template>
<script>
  import routers from '@/router/routers'
  import { updateAdminMenu } from '@/api/admin_menu'

  export default {
    name: 'index',
    components: {},

    data () {
      return {
        loading: false,
        menuData:[],
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
          developer: listData.developer,
          children: mChildren,
          superAdmin: listData.superAdmin
        }
        if (hideInMenu !== undefined && hideInMenu === true) {
          return null
        }
        return mData
      },
      uploadMenuData () {
        this.loading = true
        updateAdminMenu({ menuJson: JSON.stringify(this.menuData) })
          .then(response => {
            this.loading = false
            if (response.status === 200) {
              this.$Message.success(response.msg)
            } else {
              this.$Message.error(response.msg)
            }
          })
          .catch(e => {
            this.loading = false
          })
      }
    }

  }
</script>


