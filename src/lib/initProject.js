'use strict';
const fs = require('fs-extra');
const { execCmd } = require('./utils');

/**
 * @description 根据脚手架仓库地址初始化项目
 * @param {String} address 脚手架仓库地址
 */

module.exports = (address) => {
  const GIT_SCAFFOLD_ADDRESS = address;
  const GIT_VERSION = 'dev';
 
  const cmds = {
   
    rm_temp_folder: {
      command: () => fs.removeSync('./scaffold_temp_'),
      info: '> delete dir scaffold_temp_',
    },

    make_temp_folder: {
      command: () => fs.mkdirSync('scaffold_temp_'),
      info: '> create dir scaffold_temp_',
    },

    clone_repo: {
      command: `git clone -b ${GIT_VERSION} ${GIT_SCAFFOLD_ADDRESS} scaffold_temp_`,
      info: '> clone framework codes success!',
    },

    rm_repo_git: {
      command: () => fs.removeSync('./scaffold_temp_/.git'),
      info: '> remove scaffold_temp_/.git success!',
    },

    copy_to_project: {
      command: () => fs.copySync('./scaffold_temp_/.', './'),
      info: '> copy scaffold_temp_/ to project success!',
    },
  };

  /*
  * 初始化
  */
  const init = () => {
    if (fs.existsSync('./src')) {
      console.log('当前目录下有/src 目录, 认为不是空项目。初始化中止！ 不建议删除 src 目录后强制初始化');
      return false;
    }
    if (fs.existsSync('./scaffold_temp_')) {
      execCmd(cmds, 'rm_temp_folder'); 
    }
    return true;
  };

  const done = () => {
    if (fs.existsSync('./scaffold_temp_')) {
      execCmd(cmds, 'rm_temp_folder'); 
    }
  };

  // =============================================
  // ============= START
  // =============================================

  // 初始化
  if (init()) {
    // 创建 scaffold_temp_ 目录
    execCmd(cmds, 'make_temp_folder');

    // 克隆 scaffold 仓库代码到 scaffold_temp_ 目录
    execCmd(cmds, 'clone_repo');

    // 删除 scaffold_temp_ 下的 .git 目录
    execCmd(cmds, 'rm_repo_git');

    // 复制 scaffold_temp_/ 内容到 根 目录
    execCmd(cmds, 'copy_to_project');

    // done
    done();
  }

};
