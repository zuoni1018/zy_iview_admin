/**
 * 默认数据状态
 * @type {*[]}
 */
export let jumpType = [
  {
    name: '全部',
    id: 'all',
  },
  {
    name: '无跳转',
    id: 'no',
  },
]
export let jumpTypeList = [
  {
    name: '无跳转',
    id: 'no',
  },
]


export function getStringByJumpType (state) {
  let text='unKnow';
  for (let value of jumpType) {
    if(value.id===state){
      text=value.name;
      return text;
    }
  }
  return text+"-"+state;
}


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
    case 'home':
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


export default {
  jumpType,
  jumpTypeList,
  getStringByJumpType,
  getBannerUiConfig
}



