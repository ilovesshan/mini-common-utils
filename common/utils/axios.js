const {
  IS_PRODUCTION,

  BASE_URL_DEVELOPMENT,
  BASE_PORT_DEVELOPMENT,
  BASE_TIME_OUT_DEVELOPMENT,

  BASE_URL_PRODUCTION,
  BASE_PORT_PRODUCTION,
  BASE_TIME_OUT_PRODUCTION,
} = require("../../config/serviceConfig");


const {
  showToast,

  showLoading,
  hideLoading
} = require("../loading/uiLoading");


// 根据环境 配置(默认开发环境)
let basePath = BASE_URL_DEVELOPMENT + "" + BASE_PORT_DEVELOPMENT;
let baseTimeOut = BASE_TIME_OUT_DEVELOPMENT;

if (IS_PRODUCTION) {
  basePath = BASE_URL_PRODUCTION + ":" + BASE_PORT_PRODUCTION;
  baseTimeOut = BASE_TIME_OUT_PRODUCTION;
}

/**
 * 使用Promise 对wx.request()封装
 * 
 * @param requestConfig requestConfig 主要包括一些请求的配置
 * 
 * 请求方式
 * 请求地址
 * 请求数据
 * 请求头信息
 * 请求是否需要添加Loading效果
 * 请求是否需要添加Token
 */

function axios(requestConfig) {
  return new Promise((resolve, reject) => {
    // 否需要添加Loading效果
    if (requestConfig.showLoading) {
      showLoading(requestConfig.message ? requestConfig.message : '加载中...');
    }

    // 请求数据
    let data = {};
    if (requestConfig.data) {
      data = requestConfig.data;
    }

    // 请求头信息
    let contentType = 'application/json';
    if (requestConfig.contentType) {
      contentType = requestConfig.contentType;
    }

    // 请求方式
    let method = 'GET';
    if (requestConfig.method) {
      method = requestConfig.method;
    }

    // 使用wx.request() 发送请求
    setTimeout(() => {
      wx.request({
        url: basePath + requestConfig.url,
        timeout: baseTimeOut,
        method: method,
        header: {
          'Content-Type': contentType,
          'token': "xxxxxxxxxx" // 获取保存的token
        },

        // 成功回调
        success: function (result) {
          console.log('===============================================================================================')
          console.log('接口地址：' + basePath + requestConfig.url);
          console.log('接口参数：' + JSON.stringify(data));
          console.log('请求类型：' + method);
          console.log("接口状态：" + result.statusCode);
          console.log("接口数据：");
          console.log(result.data);

          console.log('===============================================================================================')

          if (result.statusCode == 200) {
            resolve(result.data);
            // 根据实际情况 后端返回的状态码 来进行对应的逻辑处理
          } else if (result.statusCode == 401) {
            reject("登录已过期");
          } else if (result.statusCode == 405) {
            reject("方法不被允许");
          } else {
            reject(result.statusCode)
          }
        },

        // 失败回调
        fail: function (error) {
          //服务器连接异常
          console.log('===============================================================================================')
          console.log('接口地址：' + basePath + requestConfig.url)
          console.log('接口参数：' + JSON.stringify(data))
          console.log('请求类型：' + method)
          console.log('异常信息: ')
          console.log(error)
          console.log('===============================================================================================')
          reject("服务器连接异常，请稍后再试");
        },

        // 本次回调
        complete: function () {
          hideLoading()
        }
      })
    }, 3000)
  });
}

module.exports = {
  axios
}