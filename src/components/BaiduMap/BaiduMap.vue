<template>
  <!--百度地图-->
  <div style="height: 500px ;width: 100%; position: relative">

    <!--用于绘制地图-->
    <div id="boxMap" style="float: left"></div>
    <!-- 搜索框-->
    <Input v-model="searchText" style="position: absolute ;width: 300px ;left: 50%;
     margin-left: -150px;margin-top: 20px"
           search enter-button placeholder="请输入地址" @on-search="searchChange()"/>

    <div
      style="width: 300px ;background: #efefef ;position: absolute ;margin-left: 370px;margin-top: 60px">
      <p>当前选择的点</p>
      <p style="margin-top: 10px ;margin-bottom: 10px">选取的坐标：
        {{clickLocationInfo.longitude}},{{clickLocationInfo.latitude}}</p>
      <p>{{clickLocationInfo.address}}</p>

    </div>

  </div>
</template>

<script>
  export default {
    name: "bMap",
    props: {
      label: {
        type: Object,
        required: false,
        default: () => {
          return null;
        }
      },
      title: {
        type: String,
        required: false,
      }
    },
    created: function () {
      this.$on('clearData', function () {
        this.clickLocationInfo = {
          //地理坐标
          longitude: 0.00,
          latitude: 0.00,
          //描述
          address: '',
        }
      });
    },
    data() {
      return {
        // 输入框
        searchText: "",
        map: null,
        meta: {
          longitude: 116.404,
          latitude: 39.915
        },
        search: '',
        window: null,
        // 获取点的信息
        clickLocationInfo: {
          //地理坐标
          longitude: 0.00,
          latitude: 0.00,
          //描述
          address: '',

        }
      }
    },
    methods: {
      initMap() {
        let self = this;
        let map = new BMap.Map("boxMap");  // 创建Map实例
        this.map = map;
        //设置地图中心点坐标
        let point = new BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 12);
        map.enableScrollWheelZoom(true);  //开启鼠标滚轮缩放
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
        map.addControl(new BMap.OverviewMapControl());
        map.addControl(new BMap.MapTypeControl());
        map.enableDragging();
        map.enableInertialDragging()

        var geoc = new BMap.Geocoder();
        //地图点击事件监听
        map.addEventListener("click", function (e) {
          var pt = e.point;
          geoc.getLocation(pt, function (rs) {
            var addComp = rs.addressComponents;
            console.log("获取坐标" + JSON.stringify(addComp))
            let address = addComp.province + " " + addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;

            self.clickLocationInfo.longitude = e.point.lng;
            self.clickLocationInfo.latitude = e.point.lat;
            self.clickLocationInfo.address = address;
            //把内容传递给父布局
            self.$emit("change", self.clickLocationInfo);

            let content = "坐标：" + self.clickLocationInfo.longitude + "," + self.clickLocationInfo.latitude;
            content = content + "<br>" + address;

            //显示弹窗
            var opts = {
              width: 250,     // 信息窗口宽度
              height: 100,     // 信息窗口高度
            }

            //把地图中心点移动到点击的地方
            let addr = {longitude: e.point.lng, latitude: e.point.lat};

            let point = new BMap.Point(addr.longitude, addr.latitude);
            // 创建点坐标
            // map.panTo(point);

            var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
            map.openInfoWindow(infoWindow, point);      // 打开信息窗口

          });
        });


        // window.map = map;//将map变量储存在全局
        //****将map变量存储在全局，只有将地图储存在全局，别的方法才能取到

      },
      searchChange() {
        let map = this.map;
        if (!map) {
          return
        }
        var local = new BMap.LocalSearch(map, {
          renderOptions: {map: map}
        });
        local.search(this.searchText);
      },
    },
    mounted() {
      this.initMap();
    },
    destroyed() {
    }
  }
</script>

<style scoped>
  #boxMap {
    width: 100%;
    height: 100%;
  }
</style>
