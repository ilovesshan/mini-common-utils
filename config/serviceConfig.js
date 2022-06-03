class ServiceConfig {
  // 是否是生产环境
  static IS_PRODUCTION = false;

  //  测试环境配置
  static BASE_URL_DEVELOPMENT = "https://www.wanandroid.com";
  static BASE_PORT_DEVELOPMENT = "";
  static BASE_TIME_OUT_DEVELOPMENT = 7000;

  // 生产环境配置
  static BASE_URL_PRODUCTION = "https://www.wanandroid.com";
  static BASE_PORT_PRODUCTION = "80";
  static BASE_TIME_OUT_PRODUCTION = 5000;
}

module.exports = ServiceConfig;