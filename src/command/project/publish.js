/*
* 发布
* */
const { publishHandle } = require('../../lib');
const jsonFile = require('jsonfile');
const path = require('path');

module.exports = (branch) => {
  const currentPath = process.cwd();
  const projectPackage = jsonFile.readFileSync(path.join(currentPath, './package.json'));
  const { publish, name } = projectPackage;

  if (!publish) {
    console.error(`请在package.json配置publish相关数据`);
    return;
  }

  if(!branch) {
    console.error(`请设置发布环境`);
    return;
  }

  const { address, dirname } = publish;

  publishHandle(address, branch, dirname, name);
};
