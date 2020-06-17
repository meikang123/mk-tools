const { settings } = require('../../lib');
const chalk = require('chalk');
const log = console.log;
const frameworks = settings.getFrameworks();

/**
 * @description 输出脚手架列表至控制台
 */
function listFrameworks() {
  // log(chalk.blue())
  log('');
  log(chalk.gray('公用代码库列表：'));
  log(chalk.gray('======'));
  log(chalk.gray(''));
  frameworks.forEach((scaffold) => {
    log(`${chalk.blue(scaffold.name)}| ${chalk.green(scaffold.desc)}`);
    log(`${chalk.blue(scaffold.address)}`);
    log('');
  });
  log(chalk.gray('以上全部'));
}

module.exports = listFrameworks;