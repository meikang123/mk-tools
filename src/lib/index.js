/**
 * 获取应用程序配置
 */
let initProject = require('./initProject.js');
let settings = require('./settings.js');
let releaseHandle = require('./releaseHandle.js');
let download = require('./download.js');
let cloneProject = require('./cloneProject.js');

module.exports = {
  initProject,
  settings,
  download,
  cloneProject,
  releaseHandle
};
