<template>

  <div>
    <Card style="margin-bottom: 10px">
      <Row type="flex">
        <Form inline>
          <FormItem label="角色名称">
            <label>
              <Input v-model="searchFormData.name" :maxlength=15 placeholder="请输入" clearable></Input>
            </label>
          </FormItem>
          <FormItem label="状态">
            <label>
              <Select
                v-model="searchFormData.state"
                style="width: 100px"
                placeholder="选择状态">
                <Option v-for="item in stateList"
                        :value="item.id" :key="item.id">{{ item.name }}
                </Option>
              </Select>
            </label>
          </FormItem>
        </Form>

        <div style="margin-top:34px">
          <Button @click="doSearchForm" style="margin-left: 10px" type="primary">查询</Button>
          <Button @click="resetSearchForm" style="margin-left: 10px" type="primary" ghost>重置</Button>
          <Button @click="showEditDialog(0)" style="margin-left: 10px" type="primary">新增角色</Button>

        </div>
      </Row>
    </Card>

    <my-main-table
      :table-loading="tableLoading"
      :columnsData="columnsData"
      :tableList="tableList"
      :total="total"
      :page-param="pageParam"
      @onSelectionChange="onSelectionChange"
      @changePageParam="changePageParam"
    >

      <div slot="table_top">

      </div>

    </my-main-table>

    <Save :isShow="isShowEditDialog" :id="clickId" @cancel="isShowEditDialog=false"
          @refresh="baseRefresh(false)"></Save>
  </div>
</template>

<script>

  import Save from '@/view/admin-user-manager/admin-power-list/save/index'
  import { getButtonState } from '@/view/settings/apiType'
  import { defaultTableMixin } from '@/common/DefaultTableMixin'
  import { getBaseApi } from '@/api/admin_power'
  import MyMainTable from '@/components/my-mian-table'

  export default {
    name: 'index',
    mixins: [defaultTableMixin],
    components: { MyMainTable, Save },

    data () {
      return {

        chooseData:[],

        stateList:[
          {
            id:-1,
            name:"全部",
          },
          {
            id:1,
            name:"正常",
          },
          {
            id:2,
            name:"停用",
          }
        ],

        columnsData: [
          // {
          //   type: 'selection',
          //   width: 60,
          //   align: 'center'
          // },
          { type: 'index', width: 60, align: 'center' },
          { title: 'id', key: 'id', width: 80, align: 'center' },
          { title: '角色名称', key: 'name', minWidth: 120, align: 'center' },
          { title: '备注', key: 'remark', align: 'center' },
          {
            title: '状态',
            align: 'center',
            width: 80,
            render (h, params) {
              let text
              if (params.row.state === 1) {
                text = '正常'
              } else {
                text = '停用'
              }
              return h('div', text)
            }
          },
          { title: '更新时间', key: 'updateTime', width: 180, align: 'center' },

          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 300,
            render: (h, params) => {
              let model = getButtonState(params.row.state)
              let text = model.text
              if (params.row.state === 1) {
                text = '停用'
              } else {
                text = '启用'
              }
              return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      disabled: params.row.id === 1,
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.showEditDialog(params.row.id)
                      }
                    }
                  }, '编辑'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      disabled: params.row.id === 1,
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        let param = {}
                        param.id = params.row.id
                        let text1 = '是否' + text + '该角色？'
                        this.showConfirmDialog(getBaseApi().forbiddenById(param, true), text1)
                      }
                    }
                  }, text),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small',
                      disabled: params.row.id === 1,
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        let param = {}
                        param.id = params.row.id
                        let text1 = '是否删除该角色？'
                        this.showConfirmDialog(getBaseApi().deleteById(param, true), text1)
                      }
                    }
                  }, '删除'),
                ]
              )
            }
          }
        ],
      }
    },
    methods: {

      //重置搜索
      resetSearchForm(){
        this.searchFormData.state=-1;
        this.searchFormData.name="";
        this.doSearchFormData=this.searchFormData;
        this.pageParam.pageNum=1;
        this.selectPage();
      },

      //执行搜索
      doSearchForm(){
        this.doSearchFormData=this.searchFormData;
        this.pageParam.pageNum=1;
        this.selectPage();
      },

      batchDelete(){

        if(this.chooseData.length===0){
          this.$Message.info("请先勾选数据");
          return
        }

        let ids =[]
        for (let i = 0; i < this.chooseData.length; i++) {
          ids.push(this.chooseData[i].id)
        }
        let param = {}
        param.ids =JSON.stringify(ids);
        let text1 = '是否删除？'
        this.showConfirmDialog(getBaseApi().batchDeleteById(param, true), text1)
      },

      onSelectionChange(data){
        this.chooseData=data;
      },

      selectPage () {
        let param =this.getDefaultPageParam();
        this.defaultSelectPage(getBaseApi().selectPage(param))
      },
    }
  }
</script>

<style scoped>
  .w-e-text-container{
    height: 700px !important;
  }
</style>
