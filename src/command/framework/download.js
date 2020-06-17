/**
 * @module framework/downloadFramework
 * @description 更新公用代码的到业务仓库
 */
const { settings, downloadFramework } = require('../../lib');
const jsonFile = require('jsonfile');
const path = require('path');
// const packageConfig = require('./package.json');

module.exports = () => {
  const currentPath = process.cwd();
  const projectPackage = jsonFile.readFileSync(path.join(currentPath, './package.json'));
  const { framework: {name, branch, tag, address} } = projectPackage;
  
  const framework = settings.getFrameworkByName(name);

  if (!framework) {
    console.error(`---framework 未找到，请检查 ${name} 是否存在 !`);
    return;
  }
  
  downloadFramework(address, branch, tag);
};             