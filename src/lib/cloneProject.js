/**
 * @description 将参与联调的项目引进公用代码的项目坞
 * @param {string} address 脚手架仓库地址
 * @param {string} branch 对应项目的分支
 */
const fs = require('fs-extra');
const { execCmd } = require('./utils');

module.exports = (address, branch) => {

  const cmds = {

    clearProject: {
      command: () => fs.removeSync('./project'),
      info: '> Delete project dir',
    },

    createProjectDir: {
      command: () => fs.mkdirSync('project'),
      info: '> Create dir project, 耗时较长请耐心等待...',
    },

    cloneProject: {
      command: `git clone -b ${branch} ${address} project`,
      info: '> Clone project codes success!',
    },

  };

  /*
* 初始化
*/
  const init = () => {
    if (fs.existsSync('./project')) {
      execCmd(cmds, 'clearProject'); 
    }
  };

  const done = () => {
  // 启动服务
  };

  // =============================================
  // ============= START
  // =============================================

  // 初始化
  init();

  // 创建 project 目录
  execCmd(cmds, 'createProjectDir');

  // 克隆 project 仓库代码到 project 目录
  execCmd(cmds, 'cloneProject');

  // done
  done();

};