const init = require('./project/init.js');
const listScaffolds = require('./project/listScaffolds.js');
const publish = require('./project/publish.js');
const downloadFramework = require('./framework/download.js');
const listFrameworks = require('./framework/listFrameworks.js');
const clone = require('./framework/clone.js');

module.exports = {
  init,
  listScaffolds,
  publish,
  downloadFramework,
  listFrameworks,
  clone,
};
