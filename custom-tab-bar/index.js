// custom-tab-bar/custom-tab-bar.js
Component({

  /**
   * 准备的数据
   */
  data: {
    selected: 0,
    tabList: [{
        pagePath: "/pages/message/message",
        text: "消息",
        iconPath: "/assets/images/tabbar/message.png",
        selectedIconPath: "/assets/images/tabbar/message-active.png"
      },
      {
        pagePath: "/pages/addressBook/addressBook",
        text: "通讯录",
        iconPath: "/assets/images/tabbar/address-book.png",
        selectedIconPath: "/assets/images/tabbar/address-book-active.png"
      },
      {
        pagePath: "/pages/find/find",
        text: "发现",
        iconPath: "/assets/images/tabbar/find.png",
        selectedIconPath: "/assets/images/tabbar/find-active.png"
      },
      {
        pagePath: "/pages/profile/profile",
        text: "我的",
        iconPath: "/assets/images/tabbar/profile.png",
        selectedIconPath: "/assets/images/tabbar/profile-active.png"
      }
    ]
  },

  methods: {
    /**
     * tab切换
     */

    onTap: function (e) {
      const { index} = e.currentTarget.dataset;

      // 切换界面
      wx.switchTab({
        url: this.data.tabList[index].pagePath
      });

      // 更新selected
      //  this.setData({ selected: index});
    }
  }
})