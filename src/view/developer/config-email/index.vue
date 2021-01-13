<style scoped>

</style>
<template>
  <div>
    <Card>
      <Divider orientation="left">通用配置</Divider>
      <Form :model="entity" v-if="entity!==undefined" label-position="top">
        <FormItem label="host">
          <label>
            <Input v-model="entity.mhost" style="width: 400px"></Input>
          </label>
        </FormItem>
        <FormItem label="port">
          <label>
            <Input v-model="entity.mport" style="width: 400px"></Input>
          </label>
        </FormItem>
        <FormItem label="from">
          <label>
            <Input v-model="entity.mfrom" style="width: 400px"></Input>
          </label>
        </FormItem>
        <FormItem label="user">
          <label>
            <Input v-model="entity.user" style="width: 400px"></Input>
          </label>
        </FormItem>
        <FormItem label="pass">
          <label>
            <Input v-model="entity.pass" style="width: 400px"></Input>
          </label>
        </FormItem>
        <FormItem label="remark">
          <label>
            <Input v-model="entity.remark" style="width: 400px"></Input>
          </label>
        </FormItem>
      </Form>
      <Button style="margin-top: 10px" type="primary" @click="updateById">保存</Button>
      <Divider orientation="left">测试</Divider>
      <label>
        <Input v-model="email" style="width: 300px"></Input>
      </label>
      <Button style="margin-left: 10px" type="primary" @click="sendEmailTest">发送</Button>
    </Card>
  </div>
</template>

<script>
  import { getBaseApi, sendEmailTest } from '@/api/config_email'

  export default {
    name: 'index',
    components: {},

    data () {
      return {
        entity: undefined,
        email: '767450430@qq.com',
      }
    },

    methods: {
      updateById () {
        getBaseApi().updateById(this.entity)
          .then(response => {
            if (response.status === 200) {
              this.$Message.success(response.msg)
            } else {
              this.$Message.error(response.msg)
            }
          })
      },
      sendEmailTest () {
        sendEmailTest({ email: this.email })
          .then(response => {
            if (response.status === 200) {
              this.$Message.success(response.msg)
            } else {
              this.$Message.error(response.msg)
            }
          })
      },
    },
    mounted () {
      getBaseApi().selectById({})
        .then(response => {
          if (response.status === 200) {
            this.entity = response.data.entity
          } else {
            this.$Message.error(response.msg)
          }
        })
    }
  }
</script>


