// pages/profile/profile.js
Page({
  data: {
    files: []
},

  onLoad() {
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })
  },

  selectFile(files) {
      console.log('files', files)
      // 返回false可以阻止某次文件上传
  },

  uplaodFile(files) {
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(files["tempFilePaths"][0]);
          //reject('some error')

          const uploadImagePath = [];

          files["tempFilePaths"].forEach(item =>{
            uploadImagePath.push(item);
          })

          resolve({urls:uploadImagePath})
      }, 2000)
    })
  },

  uploadError(e) {
    console.log('upload error', e.detail)
  },

  uploadSuccess(e) {
    console.log('upload success', e.detail)
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      });
    }
  },
})