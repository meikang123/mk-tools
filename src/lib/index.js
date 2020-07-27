/**
 * 获取应用程序配置
 */
let initProject = require('./initProject.js');
let settings = require('./settings.js');
let publishHandle = require('./publishHandle.js');
let downloadFramework = require('./downloadFramework.js');
let cloneProject = require('./cloneProject.js');

module.exports = {
  initProject,
  settings,
  downloadFramework,
  cloneProject,
  publishHandle
};
