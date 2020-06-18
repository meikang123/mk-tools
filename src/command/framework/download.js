/**
 * @module framework/downloadFramework
 * @description 更新公用代码的到业务仓库
 */
const { settings, downloadFramework } = require('../../lib');
const jsonFile = require('jsonfile');
const path = require('path');

module.exports = () => {
  const currentPath = process.cwd();
  const projectPackage = jsonFile.readFileSync(path.join(currentPath, './package.json'));
  const { framework } = projectPackage;

  if (!framework) {
    console.error(`没找到公用代码`);
    return;
  }

  
  // const framework = settings.getFrameworkByName(name);
  downloadFramework(address, branch, tag);
};             