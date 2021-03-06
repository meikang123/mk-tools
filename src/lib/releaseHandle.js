/**
 * @module lib/publishHandle
 * @description 发布项目
 */
'use strict';
const { resolve } = require('path');
const fs = require('fs-extra');
const compressing = require('compressing');
const moment = require('moment');
const { execCmd } = require('./utils');

/**
 * @description 根据发布仓库地址发布项目
 * @param {String} address 发布仓库地址
 * @param {String} branch 发布分支
 * @param {String} dirname 压缩文件地址
 * @param {String} name 项目名称
 * @param {Object} options 额外描述
 */
module.exports = async (address, branch, dirname, name, options = {}) => {

  const cmds = {
    rm_dir: {
      command: () => fs.removeSync('./publish_temp_'),
      info: '> delete dir publish_temp_',
    },
    make_dir: {
      command: () => fs.mkdirSync('publish_temp_'),
      info: '> create dir publish_temp_',
    },
    clone_repo: {
      command: `git clone -b ${branch} ${address} publish_temp_`,
      info: '> clone publish codes success!',
    },
    clear_file: {
      command: () => {
        let files = fs.readdirSync(`./publish_temp_/${name}/`);
        files.splice(-10);
        files.forEach(file => {
          /*const time = file.split(' ')[0];
          if(time && new Date(time).getTime() < Date.now() - 1000 * 3600 * 24 * 10)*/
          fs.removeSync(`./publish_temp_/${name}/${file}`);
        })
      },
      info: '> clear file success!',
    },
    pro_build: {
      command: `npm run build:${branch}`,
      info: '> npm run build success!',
    },
    commit_repo: {
      command: [
        () => process.chdir(resolve('./publish_temp_')),
        'git add .',
        `git commit -m '发布${branch}分支的${name}项目包'`,
        'git push',
        () => process.chdir(resolve('./../'))
      ],
      info: '> push publish codes success!',
    }
  };


  // =============================================
  // ============= START
  // =============================================

  const delFile = () => {
    if (fs.existsSync('./publish_temp_')) {
      execCmd(cmds, 'rm_dir');
    }
  }

  const zipName = (() => {
    let versionName = name;
    if(branch === 'master') versionName = moment().format("YYYY-MM-DD HH_mm_ss");
    const desc = options.desc ? `-${options.desc}` : '';
    return `./publish_temp_/${name}/${versionName}${desc}.zip`
  })();

  const zipFile = () => {
    if (!fs.existsSync(`./publish_temp_/${name}`)) {
      fs.mkdirSync(`./publish_temp_/${name}`);
    }

    return new Promise((suc) => {
      compressing.zip.compressDir(`./${dirname || 'dist'}`, zipName)
        .then(() => {
          console.log('file zip success');
          suc(true);
        })
        .catch(err => {
          console.error(err);
        });
    });
  }

  // 初始化
  delFile();

  // 创建 publish_temp_ 目录
  execCmd(cmds, 'make_dir');

  // 克隆 release_package 仓库代码到 publish_temp_ 目录
  execCmd(cmds, 'clone_repo');

  // 清理历史文件
  if(branch === 'master' && fs.existsSync(`./publish_temp_/${name}`)) execCmd(cmds, 'clear_file');

  // 打包项目
  execCmd(cmds, 'pro_build');

  // 压缩项目文件到 publish_temp_ 项目目录下
  await zipFile();

  // 发布版本
  execCmd(cmds, 'commit_repo');

  // 删除 publish_temp_ 代码
  delFile();

};
