/**
 * int 转性别
 */
export function getGenderText (gender) {
  let renderText
  switch (gender) {
    case 1:
      renderText = '男'
      break
    case 2:
      renderText = '女'
      break
    default:
      renderText = '未知'
      break
  }
  return renderText
}

/**
 * 选择性别
 */
export let genderList = [
  {
    value: 1,
    label: '男'
  },
  {
    value: 2,
    label: '女'
  },
  {
    value: 0,
    label: '未知'
  }
]

//商户端开通状态 0 未开通 1审核中 2已开通 3未通过  4注销申请中  5已注销 6禁用

export function getOpenMerchantStateText (state) {
  let text
  switch (state) {
    case 0:
      text = '未开通'
      break
    case 1:
      text = '审核中'
      break
    case 2:
      text = '已开通'
      break
    case 3:
      text = '未通过'
      break
    case 4:
      text = '注销申请中'
      break
    case 5:
      text = '已注销'
      break
    case 6:
      text = '禁用'
      break
    default:
      text = '未知'
      break
  }



  return text
}
export let distributionState = [
  {
    name: '全部',
    id: -1,
  },
  {
    name: '审核中',
    id: 1,
  },
  {
    name: '已开通',
    id: 2,
  },
  {
    name: '未通过',
    id: 3,
  },
]

export let distributionState2 = [
  {
    name: '审核中',
    id: 1,
  },
  {
    name: '已开通',
    id: 2,
  },
  {
    name: '未通过',
    id: 3,
  },
]

//商户端开通状态 0 未开通 1审核中 2已开通 3未通过  4注销申请中  5已注销 6禁用
export let openMerchantStateList = [
  {
    name: '全部',
    id: -1,
  },
  {
    name: '审核中',
    id: 1,
  },
  {
    name: '已开通',
    id: 2,
  },
  {
    name: '未通过',
    id: 3,
  },
  // {
  //   name: '注销申请中',
  //   id: 4,
  // },
  // {
  //   name: '已注销',
  //   id: 5,
  // },
  {
    name: '禁用',
    id: 6,
  },
]
export let openMerchantStateList2 = [

  {
    name: '审核中',
    id: 1,
  },
  {
    name: '已开通',
    id: 2,
  },
  {
    name: '未通过',
    id: 3,
  },
  {
    name: '注销申请中',
    id: 4,
  },
  {
    name: '已注销',
    id: 5,
  },
  {
    name: '禁用',
    id: 6,
  },
]
export let bannerJumTypeList = [
  {
    name: '全部',
    value: -1,
  },
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
]

export function getBannerUiConfig (showType, isDetails) {
  let config = {
    showImageWidth: 0,
    originalImageHeight: 0,
    originalImageWidth: 0
  }
  if (isDetails === 1) {
    config.showImageWidth = 200
  } else {
    config.showImageWidth = 150
  }

  switch (showType) {
    case 0:
      config.originalImageHeight = 282
      config.originalImageWidth = 662
      break
    case 1:
      config.originalImageHeight = 200
      config.originalImageWidth = 200
      break
    case 2:
      config.originalImageHeight = 109
      config.originalImageWidth = 352
      break
    case 3:
      config.originalImageHeight = 102
      config.originalImageWidth = 326
      break
    case 8:
      config.originalImageHeight = 74
      config.originalImageWidth = 354
      break
  }
  return config
}

export function getGoodsUiConfig (showType, isDetails) {
  let config = {
    showImageWidth: 0,
    originalImageHeight: 0,
    originalImageWidth: 0
  }
  if (isDetails === 1) {
    config.showImageWidth = 100
  } else {
    config.showImageWidth = 100
  }

  switch (showType) {
    case 0:
      config.originalImageHeight = 100
      config.originalImageWidth = 100
      break
    case 1:
      config.originalImageHeight = 100
      config.originalImageWidth = 100
      break
    case 2:
      config.originalImageHeight = 100
      config.originalImageWidth = 100
      break
    case 3:
      config.originalImageHeight = 100
      config.originalImageWidth = 100
      break
    case 8:
      config.originalImageHeight = 100
      config.originalImageWidth = 100
      break
  }
  return config
}

export function getOrderStateList () {
  let stateList = [
    {
      id: -1,
      name: '全部'
    },
    {
      id: 0,
      name: '未支付'
    },
    {
      id: 1,
      name: '已取消'
    },
    {
      id: 2,
      name: '待发货'
    },
    {
      id: 3,
      name: '待收货'
    },
    {
      id: 4,
      name: '待评价'
    },
    {
      id: 5,
      name: '已评价'
    },
    {
      id: 10,
      name: '售后处理中'
    },

  ]
  return stateList
}

export function getOrderStateText (value) {
  let text
  switch (value) {
    case 0:
      text = '未支付'
      break
    case 1:
      text = '已取消'
      break
    case 2:
      text = '待发货'
      break
    case 3:
      text = '待收货'
      break
    case 4:
      text = '待评价'
      break
    case 5:
      text = '已评价'
      break
    case 10:
      text = '售后处理中'
      break
    default:
      text = '未知'
      break
  }
  return text
}

export let userPowerList = [
  {
    value: 10,
    label: '用户'
  },
  {
    value: 11,
    label: '商户'
  },
  {
    value: 12,
    label: '门店技师'
  },
  {
    value: 13,
    label: '平台技师'
  }
]

export let questionType = [
  {
    value: 50,
    label: '全部题型'
  },
  {
    value: 0,
    label: '单选题'
  },
  {
    value: 1,
    label: '多选题'
  },
  {
    value: 2,
    label: '判断题'
  },
  {
    value: 3,
    label: '填空题'
  },
]

export function getQuestionType (value) {
  let text
  switch (value) {
    case 0:
      text = '单选题'
      break
    case 1:
      text = '多选题'
      break
    case 2:
      text = '判断题'
      break
    case 3:
      text = '填空题'
      break
    default:
      text = '未知'
      break
  }
  return text
}

export function getPowerText (value) {
  let text
  switch (value) {
    case 100:
      text = '超级管理员'
      break
    case 50:
      text = '管理员'
      break
    case 10:
      text = '用户'
      break
    case 11:
      text = '商户'
      break
    case 12:
      text = '门店技师'
      break
    case 13:
      text = '平台技师'
      break
    case 14:
      text = 'COURIER'
      break
    default:
      text = '未知'
      break
  }
  return text
}

export function getOrderState (value) {
  let text

  switch (value) {
    case 0:
      text = '未受理'
      break
    case 1:
      text = '进行中'
      break
    case 2:
      text = '已发货'
      break
    case 10:
      text = '已完成'
      break
    case 50:
      text = '已取消'
      break
    default:
      text = '未知'
      break
  }
  return text
}

export function getCouponType (value) {
  let text
  switch (value) {
    case 0:
      text = '通用抵用券'
      break
    case 1:
      text = '定点免费券'
      break
    case 2:
      text = '定点抵用券'
      break
    default:
      text = '未知'
      break
  }
  return text
}

export let bigTypeList = [
  {
    id: 1,
    name: '修改'
  },
  {
    id: 2,
    name: '修补'
  },
  {
    id: 3,
    name: '洗护'
  },
  {
    id: 4,
    name: '定制'
  },
  {
    id: 5,
    name: '品牌'
  }
]

export let couponTypeList = [
  {
    value: 0,
    label: '通用抵用券'
  },
  {
    value: 1,
    label: '定点免费券（某项服务免费）'
  },
  {
    value: 2,
    label: '定点抵用券（某门店专用抵用券）'
  }
]

export function getPayType (value) {
  let text
  switch (value) {
    case 0:
      text = '支付宝'
      break
    case 1:
      text = '微信支付'
      break
    case 2:
      text = '钱包支付'
      break
    case 3:
      text = '月结支付'
      break
    case 4:
      text = '线下支付'
      break
    default:
      text = '未知'
      break
  }
  return text
}

export function getPickCodeState (value) {
  let text
  switch (value) {
    case 0:
      text = '未取件'
      break
    case 1:
      text = '已取件'
      break
    default:
      text = '未知'
      break
  }
  return text
}

export function getBigType (value) {
  let text
  switch (value) {
    case 1:
      text = '修改'
      break
    case 2:
      text = '修补'
      break
    case 3:
      text = '洗护'
      break
    case 4:
      text = '定制'
      break
    case 5:
      text = '品牌'
      break
    default :
      text = '未知'
      break
  }
  return text
}

export function getPayState (value) {
  let text
  switch (value) {
    case 0:
      text = '待支付'
      break
    case 1:
      text = '已支付'
      break
    case 2:
      text = '已取消'
      break
    default:
      text = '未知'
      break
  }
  return text
}

export function getOrderType (value) {
  let text
  switch (value) {
    case 10:
      text = '预约单'
      break
    case 20:
      text = '寄修订单'
      break
    case 30:
      text = '门店送修'
      break
    case 40:
      text = '自助柜送修'
      break
    case 2:
      text = '已支付'
      break
    default:
      text = '未知'
      break
  }
  return text
}

export function getCouponUseState (value) {
  let text
  switch (value) {
    case 0:
      text = '正常'
      break
    case 1:
      text = '已使用'
      break
    case 2:
      text = '已过期'
      break
    default:
      text = '未知'
      break
  }
  return text
}
