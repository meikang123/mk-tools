const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const validateProjectName = require('validate-npm-package-name')
const creator = require('./../../lib/Creator')

async function create(projectName, options) {
  const cwd = options.cwd || process.cwd();
  const inCurrent = projectName === '.'
  const name = inCurrent ? path.relative('../', cwd) : projectName
  const targetDir = path.resolve(cwd, projectName || '.')

  const result = validateProjectName(name)
  if(!result.validForNewPackages) {
    console.error(`Invalid project name: "${name}"`);
    process.exit(1);
  }

  if (fs.existsSync(targetDir)) {
    if(inCurrent) {
      const { ok } = await inquirer.prompt([
        {
          name: 'ok',
          type: 'confirm',
          message: `Generate project in current directory?`
        }
      ])
      if (!ok) {
        return
      }
    } else {
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: `Target directory ${targetDir} already exists. Pick an action:`,
          choices: [
            { name: 'Overwrite', value: 'overwrite' },
            { name: 'Merge', value: 'merge' },
            { name: 'Cancel', value: false }
          ]
        }
      ])
      if (!action) {
        return
      } else if (action === 'overwrite') {
        console.log(`\nRemoving ${targetDir}...`)
        await fs.remove(targetDir)
      }
    }
  }
  await creator(name, targetDir);
}

module.exports = (...arg) => {
  return create(...arg).catch(err => {
    console.log(err);
    process.exit(1);
  })
}
