Page({
  data: {
    currentIndex: 0,
    currentData: 0,

    tabList: [{
        id: 1,
        title: "推荐"
      }, {
        id: 2,
        title: "新款"
      },
      {
        id: 3,
        title: "热门"
      }, {
        id: 4,
        title: "销量"
      }
    ]
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },

  tabChange(e) {
    this.setData({
      currentIndex: e.detail.index
    })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      });
    }
  },
})