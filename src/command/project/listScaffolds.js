const { settings } = require('../../lib');
const chalk = require('chalk');
const log = console.log;
const scaffolds = settings.getScaffolds();

/**
 * @description 输出脚手架列表至控制台
 */
function listScaffolds() {
  
  // log(chalk.blue())
  log('');
  log(chalk.gray('脚手架列表：'));
  log(chalk.gray('======'));
  log(chalk.gray(''));
  scaffolds.forEach((scaffold) => {
    log(`${chalk.blue(scaffold.name)}| ${chalk.green(scaffold.desc)}`);
    log(`${chalk.blue(scaffold.address)}`);
    log('');
  });
  log(chalk.gray('以上全部'));
}

module.exports = listScaffolds;