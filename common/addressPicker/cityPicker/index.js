var address = require('./city.js')

Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    values: {
      type: Array,
      value: [0, 0, 0],
      observer(val) {
        let provinces = address.provinces
        let id = provinces[val[0]].id
        let citys = address.citys[id]
        this.setData({
          provinces, // 34省
          citys,
          areas: address.areas[citys[val[2]].id],
          value: val,
          regionValue: val,
        })
      }
    },
    column: {
      type: Number,
      value: 3
    }
  },
  data: {
    address: '', //详细收货地址（四级）
    value: [0, 0, 0], // 地址选择器省市区 暂存 currentIndex
    region: '', //所在地区
    regionValue: [0, 0, 0], // 地址选择器省市区 最终 currentIndex
    provinces: [], // 一级地址
    citys: [], // 二级地址
    areas: [], // 三级地址
    visible: false,
    isCanConfirm: true //是否禁止在第一列滚动期间点击确定提交数据
  },
  methods: {
    closePopUp() {
      this.triggerEvent('close')
    },
    // 处理省市县联动逻辑 并保存 value
    cityChange(e) {
      var value = e.detail.value
      let {
        provinces,
        citys
      } = this.data
      var provinceNum = value[0]
      var cityNum = value[1]
      var areaNum = value[2]

      if (this.data.value[0] !== provinceNum) {
        var id = provinces[provinceNum].id
        this.setData({
          value: [provinceNum, 0, 0],
          citys: address.citys[id],
          areas: address.areas[address.citys[id][0].id]
        })
      } else if (this.data.value[1] !== cityNum) {
        var id = citys[cityNum].id
        this.setData({
          value: [provinceNum, cityNum, 0],
          areas: address.areas[citys[cityNum].id]
        })
      } else {
        this.setData({
          value: [provinceNum, cityNum, areaNum]
        })
      }
    },
    preventTouchmove() {},
    // 城市选择器
    // 点击地区选择取消按钮
    cityCancel(e) {
      var id = address.provinces[0].id
      this.setData({
        citys: this.data.lastCitys || address.citys[id], //默认北京市辖区,
        areas: this.data.lastAreas || address.areas[address.citys[id][0].id],
        value: [...this.data.regionValue],
      })
      this.triggerEvent('close')
    },
    // 提交时由序号获取省市区id
    getRegionId(type) {
      let value = this.data.regionValue
      let provinceId = address.provinces[value[0]].id
      let townId = address.citys[provinceId][value[1]].id
      let areaId = ''
      if (address.areas[townId][value[2]].id) {
        areaId = address.areas[townId][value[2]].id
      } else {
        areaId = 0
      }

      if (type === 'provinceId') {
        return provinceId
      } else if (type === 'townId') {
        return townId
      } else {
        return areaId
      }
    },
    chooseStart(e) {
      this.setData({
        isCanConfirm: false
      })
    },
    chooseEnd(e) {
      this.setData({
        isCanConfirm: true
      })
    },
    // 点击地区选择确定按钮
    citySure(e) {
      if (this.data.isCanConfirm) {
        var value = this.data.value
        this.triggerEvent('close')
        // 将选择的城市信息显示到输入框
        try {
          var region = (this.data.provinces[value[0]].name || '') + (this.data.citys[value[1]].name || '')
          if (this.data.areas.length > 0) {
            region = region + this.data.areas[value[2]].name || ''
          } else {
            this.data.value[2] = 0
          }
        } catch (error) {
          console.log('adress select something error')
        }

        this.setData({
          region,
          lastCitys: this.data.citys,
          lastAreas: this.data.areas,
          regionValue: [...this.data.value]
        }, () => {
          console.log(`省份ID：${this.getRegionId('provinceId')}，市区ID：${this.getRegionId('townId')}，城区ID：${this.getRegionId('areas')}`)
        })
        this.triggerEvent('confirm', {
          provinceName: this.data.provinces[value[0]].name,
          provinceId: this.getRegionId('provinceId'),
          cityName: this.properties.column >= 2 ? this.data.citys[value[1]].name : '',
          cityId: this.properties.column >= 2 ? this.getRegionId('townId') : '',
          areaName: this.properties.column >= 3 ? this.data.areas[value[2]].name : '',
          areaId: this.properties.column >= 3 ? this.getRegionId('areas') : '',
          regionValue: value
        })
      }
    }
  },
  //   created() {
  //        // 默认联动显示北京
  //       var id = address.provinces[0].id
  //       this.setData({
  //         provinces: address.provinces, // 34省
  //         citys: address.citys[id], //默认北京市辖区
  //         areas: address.areas[address.citys[id][0].id]
  //       })
  //   }
})