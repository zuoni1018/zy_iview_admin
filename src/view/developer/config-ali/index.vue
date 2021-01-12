<style scoped>

</style>
<template>
  <div>
    <Card>
      <Form :model="entity" v-if="entity!==undefined" label-position="top">
        <Divider orientation="left">通用配置</Divider>
        <FormItem label="accessKeyId">
          <label>
            <Input v-model="entity.accessKeyId" style="width: 300px"></Input>
          </label>
        </FormItem>
        <FormItem label="accessKeySecret">
          <label>
            <Input v-model="entity.accessKeySecret" style="width: 300px" ></Input>
          </label>
        </FormItem>
        <Divider orientation="left">Oss配置</Divider>
        <FormItem label="ossBucketName">
          <label>
            <Input v-model="entity.ossBucketName" style="width: 300px"></Input>
          </label>
        </FormItem>

        <FormItem label="ossPrefixUrl">
          <label>
            <Input v-model="entity.ossPrefixUrl" style="width: 300px"></Input>
          </label>
        </FormItem>
        <FormItem label="ossEndpoint">
          <label>
            <Input v-model="entity.ossEndpoint" style="width: 300px"></Input>
          </label>
        </FormItem>
        <FormItem label="ossEndpoint2">
          <label>
            <Input v-model="entity.ossEndpoint2" style="width: 300px"></Input>
          </label>
        </FormItem>
        <FormItem label="ossCallBackUrl">
          <label>
            <Input v-model="entity.ossCallBackUrl" style="width: 300px"></Input>
          </label>
        </FormItem>
      </Form>
      <Button style="margin-top: 10px" type="primary" @click="updateById">保存</Button>
    </Card>
  </div>
</template>

<script>
  import {getBaseApi} from "@/api/config_ali";

  export default {
    name: 'index',
    components: {},

    data() {
      return {
        entity:undefined
      }
    },

    methods: {
      updateById(){
        getBaseApi().updateById(this.entity)
          .then(response => {
            if (response.status === 200) {
              this.$Message.success(response.msg)
            } else {
              this.$Message.error(response.msg)
            }
          })
          .catch(error => {

          })
      },


    },
    mounted() {
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


