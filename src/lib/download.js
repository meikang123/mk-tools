/**
 * @module lib/downloadFramework
 * @description 同步公用代码到项目中
 */
'use strict';
const fs = require('fs-extra');
const { execCmd } = require('./utils');
const jsonFile = require('jsonfile');
const path = require('path');

/**
 * @description 根据脚手架仓库地址初始化项目
 * @param {String} address 脚手架仓库地址
 */
module.exports = (address, branch) => {

  const GIT_FRAMEWORK_ADDRESS = address;
  const GIT_VERSION = branch;

  const cmds = {
    rm_dir: {
      command: () => fs.removeSync('./framework_temp_'),
      info: '> delete dir framework_temp_',
    },
    make_dir: {
      command: () => fs.mkdirSync('framework_temp_'),
      info: '> create dir framework_temp_',
    },
    clone_repo: {
      command: `git clone -b ${GIT_VERSION} ${GIT_FRAMEWORK_ADDRESS} framework_temp_`,
      info: '> clone framework codes success!',
    },
    rm_repo_git: {
      command: () => fs.removeSync('./framework_temp_/.git'),
      info: '> remove framework_temp_/.git success!',
    },
    rm_repo_frame: {
      command: () => fs.removeSync('./src/framework/*'),
      info: '> remove src/framework/ success!',
    },
    copy_to_framework: {
      command: () => fs.copySync('./framework_temp_/framework/', './src/framework/'),
      info: '> copy framework_temp_/* to src/framework/ success!',
    },
    merge_dependencies: {
      command: () => {
        const packageJsonPath = path.join(process.cwd(), './package.json');
        const packageJson = jsonFile.readFileSync(packageJsonPath);
        const frameWorkDependencies = jsonFile.readFileSync(path.join(process.cwd(), './src/framework/dependencies.json'));
        packageJson.dependencies = {
          ...packageJson.dependencies,
          ...frameWorkDependencies
        }
        jsonFile.writeFileSync(packageJsonPath, packageJson, { spaces: 2 });
      },
      info: '> merge dependencies'
    }
  };

  // () => fs.copySync('./scaffold_temp_/.', './'),
  /*
  * 初始化
  */
  const init = () => {
    if (!fs.existsSync('./src/framework')) {
      fs.mkdirSync('./src/framework'); 
    }
    if (fs.existsSync('./framework_temp_')) {
      execCmd(cmds, 'rm_dir'); 
    }
  };

  const done = () => {
    if (fs.existsSync('./framework_temp_')) {
      execCmd(cmds, 'rm_dir'); 
    }
  };

  async function copyFrameworkPublic () {
    try {
      console.log('> copy frameworkpublic');
      await fs.copy('./src/framework/public/static/framework', './public/static/framework');
    }catch(e){
      console.error(e);
    }
  }



  // =============================================
  // ============= START
  // =============================================

  // 初始化
  init();

  // 删除 framework_temp_ 目录

  // 创建 framework_temp_ 目录
  execCmd(cmds, 'make_dir');

  // 克隆 framework 仓库代码到 framework_temp_ 目录
  execCmd(cmds, 'clone_repo');

  // 删除 framework_temp_ 下的 .git 目录
  execCmd(cmds, 'rm_repo_git');

  // 删除旧的framework 代码
  execCmd(cmds, 'rm_repo_frame');

  // 复制 framework_temp_/framework/ 内容到 src/framework 目录
  execCmd(cmds, 'copy_to_framework');

  execCmd(cmds, 'merge_dependencies');

  copyFrameworkPublic();
  // done
  done();

};
