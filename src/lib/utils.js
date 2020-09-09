/**
 * @description 工具代码
 *
 */
const { execSync } = require('child_process');
/**
* 获取数据类型
* */
const getType = obj => Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');

/**
   * 执行命令 1.检测命令是否是shell脚本，1.1[是] 通过子进程执行，1.2[否] 直接执行命令
   * @param {*} cmdKey
   * @param {*} 命令集
   */
const execCmd = (cmds, cmdKey) => {
  const command = cmds[cmdKey]['command'];
  const type = getType(command);

  switch (type) {
    case 'String':
      execSync(command);
      break;

    case 'Array':
      command.forEach(item => {
        if(typeof item === 'string') execSync(item);
        else item();
      });
      break;

    default:
      command();

  }
  console.log(cmds[cmdKey]['info']);
};


module.exports = {
  execCmd,
};
