/**
 * @module framework/clone
 * @description clone 需要联调的项目到公用代码的项目坞中
 */
const { cloneProject } = require('../../lib');
const jsonFile = require('jsonfile');
const path = require('path');
const chalk = require('chalk');
const log = console.log;

module.exports = () => {
  const currentPath = process.cwd();
  const settingFilePath = path.join(currentPath, './settings.json');
  let frameworksettings = {};

  try {
    frameworksettings = jsonFile.readFileSync(settingFilePath);
  } catch (e) {
    //TODO 暂不处理
    // console.log(e);
  }

  if (!frameworksettings.address) {
    log(chalk.red('*: 没找到联调项目配置 !'));
    const settings = {
      address: '# 联调项目git地址，SSH模式',
      branch: '# 联调项目代码分支',
    };

    log('');
    jsonFile.writeFileSync(settingFilePath, settings, { spaces: 2, EOL: '\r\n' });
    log(chalk.green('*: 已为您生成 ./settings.json 文件，请编辑该文件补充相关信息。'));
    return;
  }

  if (/^#/.test(frameworksettings.address)) {
    log(chalk.red('*: 请编辑./settings.json文件，配置需要联调项目的GIT地址/GIT分支 !'));
    return;
  }

  const {address, branch} = frameworksettings;

  cloneProject(address, branch);

};