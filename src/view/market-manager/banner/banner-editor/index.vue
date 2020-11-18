<template>
  <Modal
    :value="isShow"
    :title="title"
    @on-ok="ok"
    :closable="false"
    @on-cancel="cancel"
    :loading="loading"
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
                    :value="item.value" :key="item.value">{{ item.name }}
            </Option>
          </Select>
        </label>
      </FormItem>
      <FormItem label="外链地址" v-if="formDetails.jumpType===2">
        <label>
          <Input v-model="formDetails.jumpUrl"></Input>
        </label>
      </FormItem>
      <FormItem label="商品id" v-if="formDetails.jumpType===1" >
<!--        <div v-if="goodsVo.id !==0">-->
<!--          <FormItem label="店铺名称">-->
<!--            <div>{{goodsVo.shopName}}</div>-->
<!--          </FormItem>-->
<!--          <FormItem label="商品名称">-->
<!--            <div>{{goodsVo.title}}</div>-->
<!--          </FormItem>-->
<!--          <FormItem label="商品图片">-->
<!--            <big-img-->
<!--              show-image-width="200"-->
<!--              original-image-height="200"-->
<!--              original-image-width="200"-->
<!--              :image-url="goodsVo.image"-->
<!--            >-->
<!--            </big-img>-->
<!--          </FormItem>-->
<!--        </div>-->
        <InputNumber  :min="0" v-model="formDetails.jumpId" :precision="0" disabled></InputNumber>
        <Button type="primary" @click="isShowChooseGoodsListDialog=true" style="margin-left: 10px">选择</Button>
      </FormItem>
      <FormItem label="排序">
        <Tooltip trigger="hover" placement="right" content="排序越小,排序越靠前">
          <InputNumber :max="1000" :min="0" v-model="formDetails.weight" :precision="0"></InputNumber>
        </Tooltip>
      </FormItem>
    </Form>
<!--    <goods-list-->
<!--      :isShow="isShowChooseGoodsListDialog"-->
<!--      @cancel="isShowChooseGoodsListDialog=false"-->
<!--      @refresh="getGoods"-->
<!--    ></goods-list>-->
  </Modal>
</template>

<script>
  import { getBaseApi } from '../../../../api/banner'
  import { editDialogMixin } from '@/base/EditDialogMixin'
  import { uploadImageMixin } from '@/base/UploadImageMixin'
  import UploadSingleImage from '@/components/upload/upload-single-image'
  import BigImg from '@/components/big-img/big-img'
  import { getBannerUiConfig } from '@/utils/DataUtils'

  export default {
    components: { BigImg, UploadSingleImage },
    mixins: [editDialogMixin, uploadImageMixin],
    name: 'banner-editor',

    props: {
      goodsClsId: {
        default: 0,
      },
      showType: {
        type:Number,
        default: 0,
      }
    },
    data () {
      return {

        isShowChooseGoodsListDialog: false,
        courseGroupList: [],

        goodVo: {
          id: 0,
          shopName: '',
          title: '',
          image: '',
        },

        jumpTypeList: [
          {
            name: '无跳转',
            value: 0,
          },
          {
            name: '跳转商品详情',
            value: 1,
          },
          {
            name: '跳转外链',
            value: 2,
          }
        ],

        formDetails: undefined
      }
    },
    computed: {
      bannerUiConfig () {
        return getBannerUiConfig(this.showType,1);
      }
    },
    methods: {

      initFormDetails () {
        this.formDetails=undefined;
      },
      changeJumpType (data) {
        this.formDetails.jumpType = data
      },
      changeCourseGroup (data) {
        this.formDetails.target = data
        // this.pageParam.pageNum = 1
        // this.selectPage()
      },

      getGoods (goods) {
        this.isShowChooseGoodsListDialog = false
        // this.goodsVo.shopName = goods.shopName
        // this.goodsVo.title = goods.title
        // this.goodsVo.image = goods.image
        // this.goodsVo.id = goods.id

        this.formDetails.jumpId=goods.id;
      },

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

              // if (response.data.goodsVo !== undefined) {
              //   this.goodsVo = response.data.goodsVo
              // }

              // this.selectType = response.data.selectType;
            } else {
              this.formDetails=undefined;
              this.$Message.error(response.msg)
            }
          })
      },

      getCommonData () {
        if (this.id === 0) {
          this.title = '添加'
          this.formDetails={
            image:'',
            weight:0,
            jumpType:0,
            showType:0,
            jumpId:0,
            jumpUrl:''
          }
        } else {
          this.title = '编辑'
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
        this.formDetails.showType = this.showType;
        this.formDetails.goodsClsId = this.goodsClsId;
        if (this.formDetails.jumpType === 1) {
          if (this.formDetails.jumpId === 0) {
            this.$Message.info('请选择商品')
            this.changeLoading()
            return
          }
          // this.formDetails.jumpId = this.goodsVo.id
        }
        //校验完成进行提交数据
        if (this.id === 0) {
          request = getBaseApi().insert(this.formDetails)
        } else {
          request = getBaseApi().updateById(this.formDetails)
        }
        this.commit(request)
      },
    },
  }
</script>


