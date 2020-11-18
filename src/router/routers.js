import Main from '@/components/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: false,
          title: '首页',
          notCache: true,
          icon: 'ios-albums'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/a-test',
    name: 'a-test',
    meta: {
      icon: 'md-contact',
      title: '测试用例',
      access: ['super_admin']
    },
    component: Main,
    children: [
      {
        path: 'normal-list',
        name: 'normal-list',
        meta: {
          title: '普通列表',
          access: ['super_admin']
        },
        component: () => import('@/view/a-test/normal-list/index')
      },
      {
        path: 'current-page-jump',
        name: 'current-page-jump',
        meta: {
          title: '当前页面跳转',
          access: ['super_admin']
        },
        component: () => import('@/view/a-test/current-page-jump/page-01/index')
      },
      {
        path: 'expand-components',
        name: 'expand-components',
        meta: {
          title: '拓展组件',
          access: ['super_admin']
        },
        component: () => import('@/view/a-test/expand-components/index')
      },
      {
        path: 'coordinate-selection',
        name: 'coordinate-selection',
        meta: {
          title: '坐标拾取',
          access: ['super_admin']
        },
        component: () => import('@/view/a-test/coordinate-selection/index')
      },
    ]
  },

  {
    path: '/market-manager',
    name: 'market-manager',
    meta: {
      icon: 'md-flame',
      title: '内容管理',
      access: ['super_admin']
    },
    component: Main,
    children: [
      {
        path: 'banner',
        name: 'banner',
        meta: {
          title: '轮播图',
          access: ['super_admin']
        },
        component: () => import('@/view/market-manager/banner/index')
      },
      {
        path: 'center_adv',
        name: 'center_adv',
        meta: {
          title: '中屏广告',
          access: ['super_admin']
        },
        component: () => import('@/view/market-manager/center-adv/index')
      },
    ]
  },
  {
    path: '/admin_user_manager',
    name: 'admin_user_manager',
    meta: {
      icon: 'md-contacts',
      title: '系统用户管理',
      access: ['super_admin']
    },
    component: Main,
    children: [
      {
        path: 'admin_user_list',
        name: 'admin_user_list',
        meta: {
          title: '用户管理',
          access: ['super_admin']
        },
        component: () => import('@/view/admin-user-manager/admin-user-list/index')
      },
      {
        path: 'admin_power_list',
        name: 'admin_power_list',
        meta: {
          title: '角色管理',
          access: ['super_admin']
        },
        component: () => import('@/view/admin-user-manager/admin-power-list/index')
      },
      // {
      //   path: 'admin_menu',
      //   name: 'admin_menu',
      //   meta: {
      //     title: '菜单管理',
      //     access: ['super_admin']
      //   },
      //   component: () => import('@/view/admin-user-manager/admin-menu/index')
      // },
    ]
  },
  {
    path: '/sys-settings',
    name: 'sys-settings',
    meta: {
      icon: 'ios-settings',
      title: '系统设置',
      access: ['super_admin']
    },
    component: Main,
    children: [

      {
        path: 'proposal-list',
        name: 'proposal-list',
        meta: {
          title: '意见反馈',
          access: ['super_admin']
        },
        component: () => import('@/view/sys-settings/proposal-list/index')
      },
      {
        path: 'declare-manager',
        name: 'declare-manager',
        meta: {
          title: '声明管理',
          access: ['super_admin', 'declare-manager']
        },
        component: () => import('@/view/sys-settings/declare-manager/index')
      },
    ]
  },
  // {
  //   path: '/customer-service',
  //   name: 'customer-service',
  //   meta: {
  //     href:'http://admin.ystyk.cn:7004/',
  //     icon: 'md-people',
  //     title: '客服',
  //     access: ['super_admin','customer-service']
  //   },
  // },
  {
    path: '/user_center',
    name: 'user_center',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'user_center_page',
        name: 'user_center_page',
        meta: {
          icon: 'md-notifications',
          title: '个人中心'
        },
        component: () => import('@/view/single-page/user_center/index.vue')
      },
      {
        path: 'change-pass',
        name: 'change_pass',
        meta: {
          icon: 'md-notifications',
          title: '修改密码'
        },
        component: () => import('@/view/change-pass/change-pass.vue')
      }

    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
