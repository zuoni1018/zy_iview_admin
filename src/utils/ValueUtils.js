/**
 * 参数是否为空
 */
export function isEmpty(value) {
  return !(value === undefined || value === '' || value === null);
}

export function getIds(list) {
  let  ids="";
  for (let i = 0; i <list.length ; i++) {

    if(ids===""){
      ids=list[i].id;
    }else {
      ids =ids+","+list[i].id;
    }
  }
  return ids;
}
 export  function cleanParams(datas){
   let v_data ={};
  for(let a in datas){
    if (datas[a] != null && datas[a] instanceof Array) {
      v_data[a]=[];
    }else {
      v_data[a] = null;
    }
  }
  return v_data;
}


