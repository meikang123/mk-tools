/**
 * @description 配置文件工具类
 */
const path = require('path');
const jsonFile = require('jsonfile');
const SETTINGS_PATH = '../../settings.json';


/**
 * @description 获取系统设置的脚手架配置
 * @returns 脚手架工具配置文件
 */
const getSettings = () => {
  let settings = null;

  settings = jsonFile.readFileSync(path.join(__dirname, SETTINGS_PATH));
  return settings;
};

const getFrameworks = () => {
  const settings = getSettings();
  let { frameworks } = settings;

  return frameworks;
};

/**
 * @description 获得脚手架列表
 * @returns 脚手架列表
 */
const getScaffolds = () => {
  const settings = getSettings();
  let { scaffolds } = settings;

  return scaffolds;
};

/**
 * @description 脚手架名字
 * @param {String} name scaffoldName
 * @returns
 */
const getScaffoldByName = (name) => {
  const scaffolds = getScaffolds();
  let scaffold = null;

  scaffolds.every(item => {
    if (item.name === name) {
      scaffold = item;
      return false;
    }
  });
  return scaffold;
};

const getFrameworkByName = (name) => {
  const frameworks = getFrameworks();

  let framework = null;

  frameworks.every(item => {
    if (item.name === name) {
      framework = item;
      return false;
    }
  });
  return framework;
};


module.exports = {
  getSettings,
  getScaffolds,
  getScaffoldByName,
  getFrameworks,
  getFrameworkByName,
};

