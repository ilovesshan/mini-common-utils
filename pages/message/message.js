const {
  formatTime
} = require("../../common/utils/timeUtils");

const {
  axios
} = require("../../common/utils/axios");

const {
  showToast
} = require("../../common/loading/uiLoading");

// 获取应用实例
const app = getApp()

Page({
  data: {
    values: [10, 6, 0],
    visible: false,

    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    this.setData({
      motto: formatTime(new Date())
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  showCurrentTime() {
    showToast(this.data.motto, 2000);
  },

  requestData() {

    const bannerRequestConfig = {
      url: "/banner/json",
      showLoading: true,
    };

    const loginRequestConfig = {
      url: "/user/login",
      data: {
        username: "jack",
        password: "123456"
      },
      showLoading: true,
      method: "POST"
    };

    axios(loginRequestConfig).then(res => {
      console.log("请求成功:=====>");
      console.log(res);

    }).catch(err => {
      console.log("请求失败:=====>");
      console.log(err);
    })
  },

  getUserAddress() {
    this.setData({
      visible: true
    })
  },

  handleClick() {
    this.setData({
      visible: !this.data.visible
    })
  },

  handleConfirm(e) {
    const {
      detail: {
        provinceName = '',
        provinceId = '',
        cityName,
        cityId = '',
        areaName = '',
        areaId = '',
        regionValue
      } = {}
    } = e
    showToast(provinceName + cityName + areaName);
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      });
    }
  },

})