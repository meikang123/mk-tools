const init = require('./project/init.js');
const create = require('./project/create.js');
const listScaffolds = require('./project/listScaffolds.js');
const release = require('./project/release.js');
const downloadFramework = require('./framework/download.js');
const listFrameworks = require('./framework/listFrameworks.js');
const clone = require('./framework/clone.js');

module.exports = {
  init,
  create,
  listScaffolds,
  release,
  downloadFramework,
  listFrameworks,
  clone,
};
