/**
 * 默认数据状态
 * @type {*[]}
 */
export let stateList = [
  {
    id: 'all',
    name: '全部',
  },
  {
    id: 'normal',
    name: '正常',
  },
  {
    id: 'forbidden',
    name: '停用',
  }
]

export function getStringByState (state) {
  let text='unKnow';
  for (let value of stateList) {
    if(value.id===state){
      text=value.name;
      return text;
    }
  }
  return text;
}

export function getStringByStateAndList (state,list) {
  let text='unKnow';
  for (let value of list) {
    if(value.id===state){
      text=value.name;
      return text;
    }
  }
  return text;
}

export default {
  stateList,
  getStringByState,
  getStringByStateAndList,
}



