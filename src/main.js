// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'view-design'
import i18n from '@/locale'
import config from '@/config'
import CommonUtils from '@/utils/CommonUtils'


import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
import VueBarcode from '@xkeshi/vue-barcode';
import axios from 'axios'
import BigImg from '@/components/big-img/big-img'
import MyMainTable from '@/components/my-mian-table'
import ImgList from '@/components/img-list/img-list'
import EditImgList from '@/components/edit-img-list/edit-img-list'
import EditResList from '@/components/edit-res-list/edit-res-list'
import UploadSingleImage from '@/components/upload/upload-single-image'
import VueLazyload from 'vue-lazyload'
import TipButton from '@/components/tip-button/tip-button'
import  ImgVideoCover from  '@/components/img-video-cover/img-video-cover'
import  EditDialogBottomButton from  '@/components/edit-dialog-bottom-button'

// 高德地图
//https://jimnox.gitee.io/amap-vue/intro/custom-extension.html?tdsourcetag=s_pctim_aiomsg
import AmapVue from '@amap/amap-vue';
import ExcelUtils from '@/utils/ExcelUtils'
AmapVue.config.version = '2.0'; // 默认2.0，这里可以不修改
AmapVue.config.key = '30f39f44bc108df282050e8200cb7263';
AmapVue.config.plugins = [
  'AMap.ToolBar',
  'AMap.MoveAnimation',
  // 在此配置你需要预加载的插件，如果不配置，在使用到的时候会自动异步加载
];
Vue.use(AmapVue);

// 打印模块
// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(TreeTable)
Vue.use(VOrgTree)
Vue.component('barcode', VueBarcode);

//自定组件↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//大图展示
Vue.component('BigImg', BigImg);
//自己封装的table
Vue.component('MyMainTable', MyMainTable);
Vue.component('ImgList', ImgList);
//图片列表编辑
Vue.component('EditImgList', EditImgList);
Vue.component('EditResList', EditResList);
Vue.component('UploadSingleImage', UploadSingleImage);
Vue.component('TipButton', TipButton);
Vue.component('ImgVideoCover', ImgVideoCover);
Vue.component('EditDialogBottomButton',EditDialogBottomButton)


//自定全局方法↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//Excel导出工具类
Vue.prototype.ExcelUtils = ExcelUtils
//公用工具类
Vue.prototype.CommonUtils = CommonUtils




Vue.use(VueLazyload)

/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
Vue.prototype.$http = axios



/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
