<template>
  <Modal
    :value="isShow"
    :title="title"
    :closable="false"
    :mask-closable="false"
    @on-visible-change="visibleChange">
    <Form :model="formDetails" :label-width="90" v-if="formDetails!==undefined">
      <FormItem label="图片">
        <upload-single-image
          :show-image-width="bannerUiConfig.showImageWidth"
          :original-image-height="bannerUiConfig.originalImageHeight"
          :original-image-width="bannerUiConfig.originalImageWidth"
          :image-url="formDetails.image"
          @on-change="formDetails.image=$event"
        >
        </upload-single-image>
      </FormItem>
      <FormItem label="跳转类型">
        <label>
          <Select
            v-model="formDetails.jumpType"
            style="width: 200px"
            placeholder="选择跳转类型">
            <Option v-for="item in jumpTypeList"
                    :value="item.id" :key="item.id">{{ item.name }}
            </Option>
          </Select>
        </label>
      </FormItem>
      <FormItem label="外链地址" v-if="formDetails.jumpType==='link'">
        <label>
          <Input v-model="formDetails.jumpUrl"></Input>
        </label>
      </FormItem>
      <FormItem label="商品id" v-if="formDetails.jumpType==='goods_details'">
        <InputNumber :min="0" v-model="formDetails.jumpId" :precision="0" disabled></InputNumber>
        <Button type="primary" @click="isShowChooseGoodsListDialog=true" style="margin-left: 10px">
          选择
        </Button>
      </FormItem>
      <FormItem label="排序">
        <Tooltip trigger="hover" placement="right" content="排序越小,排序越靠前">
          <InputNumber :max="1000" :min="0" v-model="formDetails.weight"
                       :precision="0"></InputNumber>
        </Tooltip>
      </FormItem>
    </Form>
    <div slot="footer">
      <EditDialogBottomButton
        :loading="loading"
        @handleCancel="cancel"
        @handleOk="ok"
      ></EditDialogBottomButton>
    </div>
  </Modal>
</template>

<script>
  import { getBaseApi } from '../../../../api/banner'
  import { editDialogMixin } from '@/base/EditDialogMixin2'
  import { uploadImageMixin } from '@/base/UploadImageMixin'
  import UploadSingleImage from '@/components/upload/upload-single-image'
  import BigImg from '@/components/big-img/big-img'
  import BannerConfig from '@/utils/BannerConfig'

  export default {
    components: { BigImg, UploadSingleImage },
    mixins: [editDialogMixin, uploadImageMixin],
    name: 'banner-editor',

    props: {
      goodsClsId: {
        default: 0,
      },
      showType: {
        type: String,
        default: 0,
      }
    },
    data () {
      return {
        isShowChooseGoodsListDialog: false,
        jumpTypeList: BannerConfig.jumpTypeList,
      }
    },
    computed: {
      bannerUiConfig () {
        return BannerConfig.getBannerUiConfig(this.showType, 1)
      }
    },
    methods: {
      /**
       * 获取表单数据
       */
      getData () {
        let param = {}
        param.id = this.id
        getBaseApi()
          .selectById(param)
          .then((response) => {
            if (response.status === 200) {
              this.formDetails = response.data.entity
            } else {
              this.formDetails = undefined
              this.$Message.error(response.msg)
            }
          })
      },

      getDefaultForm () {
        return {
          image: '',
          weight: 0,
          jumpType: 'no',
          showType: 'no',
          jumpId: 0,
          jumpUrl: ''
        }
      },

      ok () {
        this.loading = true
        let request
        //校验表单数据
        let form = this.formDetails
        if (this.valueValidatorString(form.image, '请上传图片')) {
          return
        }
        if (this.valueValidatorString(form.weight, '请输入排序')) {
          return
        }
        //跳转类型为
        this.formDetails.showType = this.showType
        this.formDetails.goodsClsId = this.goodsClsId
        if (this.formDetails.jumpType === 1) {
          if (this.formDetails.jumpId === 0) {
            this.$Message.info('请选择商品')
            this.changeLoading()
            return
          }
          // this.formDetails.jumpId = this.goodsVo.id
        }
        //校验完成进行提交数据
        request = getBaseApi().insert(this.formDetails)
        this.commit(request)
      },
    },
  }
</script>


