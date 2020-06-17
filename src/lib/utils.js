/**
 * @description 工具代码
 * 
 */
const { execSync } = require('child_process');
 
/**
   * 执行命令 1.检测命令是否是shell脚本，1.1[是] 通过子进程执行，1.2[否] 直接执行命令
   * @param {*} cmdKey
   * @param {*} 命令集
   */
const execCmd = (cmds, cmdKey) => {
  const command = cmds[cmdKey]['command'];
    
  if (typeof command === 'string') {
    execSync(command);
  } else {
    command();
  }
  console.log(cmds[cmdKey]['info']);
};
 

  /**
   * @description 从package中读取json文件
   */
const getPackageJsonFromProject = () => {
  console.log('getPackageJsonFromProject');
};

module.exports = {
  execCmd,
  getPackageJsonFromProject,
};