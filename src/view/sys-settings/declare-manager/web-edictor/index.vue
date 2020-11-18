<template>
  <div style="height: 700px">
    <Button type="primary" style="margin-bottom: 10px" @click="save">保存</Button>
    <Editor ref="editor" :value="content" STYLE="margin: 10px 40px 40px 0px;"
            @on-change="handleChange"/>
  </div>
</template>

<script>
  import Editor from '@/components/editor/editor'
  import { getBaseApi } from '@/api/web_editor'
  import { defaultTableMixin } from '@/common/DefaultTableMixin'
  import { DialogTabMixin } from '@/base/TabMixin'

  export default {
    mixins: [DialogTabMixin, defaultTableMixin],
    components: { Editor },
    props: {
      id: {
        default: 0,
      },
    },
    name: 'web-editor',
    data () {
      return {
        content: ''
      }
    },
    methods: {
      getUiData () {
        getBaseApi().selectById({ id: this.id })
          .then((response) => {
            if (response.status === 200) {
              this.content = response.data.entity.content
              this.initContent(this.content)
            } else {
              this.$Message.error(response.msg)
            }
          })
      },
      initContent (content) {
        this.$refs.editor.setHtml(content)
      },
      handleChange (html, text) {
        this.content = html
      },
      /**
       * 获取表单数据
       */
      save () {
        let param = {}
        param.id = this.id
        getBaseApi()
          .updateById({ id: this.id, content: this.content })
          .then((response) => {
            if (response.status === 200) {
              this.$Message.success(response.msg)
            } else {
              this.$Message.error(response.msg)
            }
          })
      },
    },
  }
</script>
<style >
  .w-e-text-container{
    height: 600px !important;
  }
</style>


