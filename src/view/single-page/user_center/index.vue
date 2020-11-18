<template>

  <div>
    <Card>
      <p slot="title">
        <Icon type="key"></Icon>
        个人中心
      </p>
      <Form ref="form" :model="form" :label-width="100" style="width: 500px;margin-top: 20px;">
        <FormItem label="用户头像">
<!--          <Upload-->
<!--            :on-success="handleSuccess"-->
<!--            :format="imageFormat"-->
<!--            :show-upload-list="false"-->
<!--            :on-format-error="handleFormatError"-->
<!--            :action="uploadUrl">-->
<!--            <Avatar shape="square" :src="form.headImage" size="large" />-->
<!--          </Upload>-->

          <upload-single-image
            show-image-width="100"
            original-image-height="100"
            original-image-width="100"
            :image-url="form.headImage"
            @on-change="form.headImage=$event"
          >
          </upload-single-image>

        </FormItem>
        <FormItem label="名称">
          <Input v-model="form.name" />
        </FormItem>
        <FormItem label="手机号/账号">
          <Input v-model="form.mobile" :disabled="true"/>
        </FormItem>
        <FormItem label="创建时间">
          <Input v-model="form.createTime" :disabled="true"/>
        </FormItem>
<!--        <FormItem label="密码">-->
<!--          <Input v-model="form.password"/>-->
<!--        </FormItem>-->
        <Form-item>
          <Button
            style="margin-right:5px"
            @click="setMyAdminUserInfo1"
            type="primary"
            icon="ios-create-outline">修改并保存
          </Button>

          <Button @click="cancelEditPass">取消</Button>
        </Form-item>
      </Form>
      <Spin size="large" fix v-if="showLoading"></Spin>
    </Card>


  </div>

</template>

<script>
  import { getMyAdminUserInfo, setMyAdminUserInfo } from '@/api/admin_user'
  import { mapMutations } from 'vuex'
  import { uploadImageMixin } from '@/base/UploadImageMixin'
  import OssUpload from '@/components/oss-upload/oss-upload'

  export default {
    components: { OssUpload },
    mixins: [uploadImageMixin],
    name: 'user_center_page',
    data () {
      return {
        showLoading:false,
        form: {
          headImage:"",
        }
      }
    },
    methods: {
      ...mapMutations([
        'closeTag'
      ]),
      getData(){
        this.showLoading=true;
        getMyAdminUserInfo()
          .then(response => {
            this.showLoading=false;
            if (response.status === 200) {
              this.form = response.data.entity
            } else {
              this.$Message.error(response.msg)
            }
          })
          .catch(error => {
            this.showLoading=false;
          })
      },

      cancelEditPass () {
        this.closeTag({
          name: 'user_center_page'
        })
      },

      setMyAdminUserInfo1(){
        this.showLoading=true;
        setMyAdminUserInfo(this.form)
          .then(response => {
            this.showLoading=false;
            if (response.status === 200) {
              this.$Message.success(response.msg)
              // this.form = response.data.entity
              //更新头像
              this.$store.state.user.headImage=this.form.headImage;
            } else {
              this.$Message.error(response.msg)
            }
          })
          .catch(error => {
            this.showLoading=false;
          })
      },
      handleSuccess(response, file) {
        this.form.headImage = response.data.urls[0];
      },
    },



    mounted () {
      this.getData();

    }
  }
</script>

<style lang="less">

</style>
