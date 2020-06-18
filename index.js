#! /usr/bin/env node
const program = require('commander');
const { init, listScaffolds, downloadFramework, listFrameworks, clone } = require('./src/command');
const chalk = require('chalk');
const pkg = require('./package.json');

program.command('download').action(() => {
  downloadFramework();
});

program.command('init <scaffoldaddress>').action((scaffoldaddress) => {
  init(scaffoldaddress);
});

program.command('list').action(() => {
  listScaffolds();
});

program.command('listframework').action(() => {
  listFrameworks();
});

program.command('clone').action(() => {
  clone();
});

program.version(`${pkg.version}`);

program.on('--help', () => {
  console.log('');
  console.log(chalk.yellowBright(
    `      ||||||||||||   |||  |||||||||||     
      |||                     |||   
      |||  |||||||   |||      |||       
      |||      |||   |||      |||       
      ||||||||||||   |||      |||       `)); 
  console.log('');
  console.log(`${pkg.version} 使用举例:`);
  console.log('');
  console.log('giant init  //通过脚手架初始化项目');
  console.log('giant download //下载公用代码');
  console.log('giant clone //联调项目进公用代码项目坞');
  
});

program.parse(process.argv);
