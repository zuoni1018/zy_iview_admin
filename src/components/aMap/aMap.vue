<template>
  <div class="coord-picker">
    <div class="map-container">
      <amap
        cache-key="coord-picker-map"
        mmap-style="amap://styles/whitesmoke"
        async
        :center.sync="center"
        :zoom.sync="zoom"
        is-hotspot
        @click="onMapClick"
      >
        <amap-satellite-layer :visible="satellite"/>
        <amap-marker v-if="position" :position.sync="position" draggable/>
        <div class="result-panel">
          <div>

            <Card>
              <div v-if="position!==undefined">
                坐标：
                <InputNumber v-model="position[0] " :min="0" style="width: 120px" disabled/>
                <InputNumber v-model="position[1] " :min="0" style="margin-left: 10px;width: 120px" disabled/>
              </div>
              <div style="margin-top: 10px">
                <label>
                  <Input v-model="query" placeholder="请输入地址..."
                         style="width: 300px" clearable
                         @on-change="search"
                  />
                </label>
                <Button
                  type="primary"
                  @click="search"
                  style="margin-left: 10px;"
                >搜索
                </Button>
              </div>
              <div style="overflow-y: scroll;max-height: 400px;margin-top: 10px">
                <div v-for="(item, index) in results" @click="focus(item)"
                     class="address_item">
                  {{item.name}} ( {{item.location.lng}},{{item.location.lat}})
                </div>
              </div>
            </Card>
          </div>
        </div>
      </amap>
    </div>
  </div>
</template>

<script>
  import { loadAmap, loadPlugins } from '@amap/amap-vue'

  export default {
    name: 'aMap',
    props: {
      pPosition: {
        type: Array,
        default: () =>[0,0]
      }
    },
    data () {
      return {
        lon: 0,
        lat: 0,
        mode: 'search',
        center: null,
        zoom: 10,
        query: '',
        searching: false,
        tips: [],
        results: [],
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        satellite: false,
        position:undefined
      }
    },
    computed: {
      wrapper () {
        return this.$refs.wrapper
      },
      positionText () {
        if (!this.position) return ''
        return `${this.position[0]}, ${this.position[1]}`
      },
    },
    created () {
      this.position=this.pPosition;
      this.$ready = new Promise(async resolve => {
        const AMap = await loadAmap()
        await loadPlugins(['AMap.PlaceSearch', 'AMap.AutoComplete'])

        this.ps = new AMap.PlaceSearch({
          pageSize: this.pageSize,
        })
        this.ac = new AMap.AutoComplete()

        resolve()
      })

      if(this.position!==undefined){
        this.center =this.position
      }

    },
    methods: {
      onMapClick (e) {
        if (e.lnglat) {
          this.position = [e.lnglat.lng, e.lnglat.lat]
        } else {
          this.position = null
        }
        this.lon = this.position[0]
        this.lat = this.position[1]
        this.$emit('updatePosition', this.position)
      },
      async search () {
        this.mode = 'result'
        // await this._ready
        this.results = []
        if (this.query === '') {
          return
        }
        this.searching = true
        const { query } = this
        this.ps.search(this.query, (status, result) => {
          this.searching = false
          if (query !== this.query) return
          if (status === 'complete' && result.poiList) {
            this.results = result.poiList.pois
            this.total = result.poiList.count
            if (this.results.length === 0) {
              // this.$Message.info({
              //   content: '未搜索到数据',
              //   duration: 10
              // });
            }

          } else {
            this.results = []
            this.total = 0
            // this.$Message.info({
            //   content: '未搜索到数据',
            //   duration: 10
            // });
          }
        })
      },
      focus (poi) {
        console.log(poi)
        const pos = [poi.location.lng, poi.location.lat]
        this.position = [...pos]
        this.center = [...pos]
        this.$emit('updatePosition', this.position)
      },
      reset () {
        this.ps.setPageIndex(1)
        this.results = []
        this.tips = []
        this.total = 0
        this.mode = 'search'
      },
    },
    watch: {
      pageIndex (value) {
        this.$ready.then(() => {
          this.ps.setPageIndex(value)
          this.search(false)
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  .map-container {
    width: 100%;
    height: 600px;
  }

  .result-panel {
    position: absolute;
    left: 10px;
    top: 10px;
    /*width: 420px;*/
    /*display: flex;*/
    /*flex-direction: column;*/

    /*.search-bar {*/
    /*  display: flex;*/
    /*  align-items: center;*/

    /*  .text {*/
    /*    text-overflow: ellipsis;*/
    /*    flex: 1;*/
    /*    overflow: hidden;*/
    /*    white-space: nowrap;*/
    /*  }*/
    /*}*/

    /*.result-list.ant-list-loading {*/
    /*  min-height: 100px;*/
    /*  display: flex;*/
    /*  justify-content: center;*/
    /*  align-items: center;*/
    /*}*/
  }

  .info {
    position: absolute;
    right: 10px;
    top: 10px;
    padding-left: 24px;
  }

  .address_item {
    padding: 5px;
    line-height: 30px;
    cursor: pointer;
    margin-bottom: 5px;
    top: 5px;
    height: 40px;
  }

  .address_item:hover {
    background-color: #ccc;
  }
</style>
