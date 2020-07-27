/*
* 发布
* */
const { releaseHandle } = require('../../lib');
const jsonFile = require('jsonfile');
const path = require('path');

module.exports = (branch) => {
  const currentPath = process.cwd();
  const projectPackage = jsonFile.readFileSync(path.join(currentPath, './package.json'));
  const { release, name } = projectPackage;

  if (!release) {
    console.error(`请在package.json配置release相关数据`);
    return;
  }

  if(!branch) {
    console.error(`请设置发布环境`);
    return;
  }

  const { address, dirname } = release;

  releaseHandle(address, branch, dirname, name);
};
