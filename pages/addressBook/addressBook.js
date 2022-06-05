// pages/addressBook/addressBook.js
Page({
  data: {
    vtabs: [],
    activeTab: 0,
    keyword:"",
  },

  onLoad() {
    const titles = ['热搜推荐', '手机数码', '家用电器','生鲜果蔬', '酒水饮料', '生活美食'];
    const vtabs = titles.map(item => ({title: item}));
    this.setData({
      vtabs,
      // bindfocus: this.bindfocus.bind(this),
      // bindblur: this.bindblur.bind(this),
      // bindclear: this.bindclear.bind(this),
      // bindinput: this.bindinput.bind(this),
      // bindselectresult: this.bindselectresult.bind(this),
      bindSearch: this.bindSearch.bind(this)
    })
  },

  onTabCLick(e) {
    const index = e.detail.index
    console.log('tabClick', index)
  },

  onChange(e) {
    const index = e.detail.index
    console.log('change', index)
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      });
    }
  },

  bindfocus(){
    console.log("在输入框focus的时候触发事件");
  },

  bindblur(){
    console.log("在输入框blur的时候触发事件");
  },

  bindclear(){
    console.log("在clear按钮点击的时候触发事件");
  },

  bindinput(e){
    console.log("在输入框输入过程中触发事件");
    console.log(this.data.keyword);
    console.log(e.detail.value);
  },

  bindselectresult(e){
    console.log("在选择搜索结果的时候触发事件");
    console.log(e);
  },

  bindSearch(value){
   return new Promise((resolve, reject)=>{
     setTimeout(()=>{
      resolve([{text: '搜索结果', value: 1}, {text: '搜索结果2', value: 2}]) 
     },2000)
   })
  },
})