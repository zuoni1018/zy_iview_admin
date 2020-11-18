
import routers from '@/router/routers'


/**
 * @returns Array 用于后端生成菜单数据库 进行权限管理
 */
export function getRoutersArray () {


  //vue的前端路由
  let r=routers;

  //返回给后端的路由
  let routerArray =[];

  for (let i=0;i<r.length;i++)
  {
    let pRouter=r[i];
    //是否为菜单路由
    let hideInMenu=pRouter.meta.hideInMenu;
    if(!hideInMenu){
      //为菜单路由
      let router={};
      router.name=r[i].name;
      router.title=r[i].meta.title;
      router.index=i;
      let routerChildrenArray =[];
      if(pRouter.children!==undefined){
        //遍历子菜单数据
        let childrenNum=pRouter.children.length;
        for (let j=0;j<childrenNum;j++)
        {
          let childrenRouter={};
          childrenRouter.name=pRouter.children[j].name;
          childrenRouter.title=pRouter.children[j].meta.title;
          childrenRouter.index=j;
          routerChildrenArray.push(childrenRouter)
        }
      }
      router.children=routerChildrenArray;
      routerArray.push(router)
    }
  }
  return routerArray;
}
