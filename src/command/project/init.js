const inquirer = require('inquirer');
const { initProject } = require('../../lib');
let { getScaffoldByName, getScaffolds } = require('../../lib/settings');

/**
 * @description 根据用户选择的脚手架初始化项目
 * @returns
 */
function init(address) {

  // let scaffolds = getScaffolds();

  // if (!scaffolds) {
  //   return;
  // }

  // let scaffoldChoices = scaffolds.map((item) => {
  //   return item.name;
  // });

  // scaffoldChoices = scaffoldChoices.concat(['exit']);
  
  // const questions = [
  //   {
  //     type: 'list',
  //     message: 'your scaffold: ',
  //     name: 'scaffold',
  //     choices: scaffoldChoices,
  //   },
  // ];

  // inquirer.prompt(questions).then((answers) => {
   
  //   if (answers.scaffold === 'exit') {
  //     console.log('bye');
  //     process.exit();
  //   }
  //   let scaffold = getScaffoldByName(answers.scaffold);
    
  //   initProject(scaffold.address); 
  // });
  initProject(address); 
}

module.exports = init;