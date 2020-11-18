import CommonIcon from '_c/common-icon'
import { showTitle } from '@/libs/util'
export default {
  components: {
    CommonIcon
  },
  methods: {
    showTitle (item) {
      return showTitle(item, this)
    },
    showChildren (item) {
      return item.children && (item.children.length > 0 || (item.meta && item.meta.showAlways))

      //下面的代码 路由children为1的时候不展示2级
      // return item.children && (item.children.length > 0 || (item.meta && item.meta.showAlways))
    },
    getNameOrHref (item, children0) {
      return item.href ? `isTurnByHref_${item.href}` : (children0 ? item.children[0].name : item.name)
    }
  }
}
