// 接口类型
export let api_type = [
  {
    value: '1',
    label: '新增'
  },
  {
    value: '2',
    label: '删除'
  },
  {
    value: '3',
    label: '更新'
  },
  {
    value: '4',
    label: '查询'
  },
  {
    value: '0',
    label: '未知'
  }
]

export let pay_state = [
  {
    value: '0',
    label: '待支付'
  },
  {
    value: '1',
    label: '已支付'
  }
]

// 设置按钮颜色
export function getTypeColor (type) {
  let model = {}
  let text
  let color
  switch (type) {
    case 1:
      text = '新增'
      color = 'success'
      break
    case 2:
      text = '删除'
      color = 'error'
      break
    case 3:
      text = '更新'
      color = 'warning'
      break
    case 4:
      text = '查询'
      color = 'primary'
      break
    default:
      text = '未知'
      color = 'default'
      break
  }
  model.text = text
  model.color = color
  return model
}

export function getButtonState (value) {
  let model = {}
  let text
  let color
  switch (value) {
    case 1:
      text = '正常'
      color = 'primary'
      break
    default :
      text = '禁用'
      color = 'error'
      break
  }
  model.text = text
  model.color = color
  return model
}
