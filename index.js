#! /usr/bin/env node
const program = require('commander');
const { init, create, listScaffolds, release, downloadFramework, listFrameworks, clone } = require('./src/command');
const chalk = require('chalk');
const pkg = require('./package.json');

program.command('download').action(() => {
  downloadFramework();
});

program.command('init <scaffoldaddress>').action((scaffoldaddress) => {
  init(scaffoldaddress);
});

program.command('create <app-name>').action((appName, cmd) => {
  create(appName, cmd);
});

program.command('release <branch>').option('-m, --desc <descMessage>', 'Version described').action((branch, cmd) => {
  const options = cleanArgs(cmd)
  release(branch, options);
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
  console.log('giant release //发布当前项目');
  console.log('giant download //下载公用代码');
  console.log('giant clone //联调项目进公用代码项目坞');

});

program.parse(process.argv);

function camelize (str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

function cleanArgs (cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}
