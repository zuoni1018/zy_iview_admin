export default {

  /**
   * @description 项目名称
   */
  appName:'zy_iview_admin',

  testImageUrl:'https://images.ystyk.cn/image/b5b43ef8-3396-494f-b1ba-2c371bd8b3b6?m_w=100&m_h=100',


  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'zy_iview_admin-系统管理后台',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 2,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,

  //再次打包就可以看到项目文件中已经没有map文件
  productionSourceMap:false,
  productionGzip: true,
  /**
   * @description api请求基础路径
   */
  // dev: 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/',
  // pro: 'https://produce.com'
  // baseUrl: {
  //   dev: 'http://47.104.187.103:8080/',
  //   pro: 'http://47.104.187.103:8080/'
  // },
  baseUrl: {
    // 本地地址
    dev: 'http://192.168.0.188:9101/',
    // dev: 'http://47.104.187.103:9101/',
    // 服务器地址
    pro: 'http://47.104.187.103:9101/'
    // pro: 'http://103.120.82.49:7001/'
  },

  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: false, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }
}
