const fs = require('fs-extra');
const { execSync } = require('child_process')
const { execCmd } = require('./utils')
const path = require('path')
const jsonFile = require('jsonfile')

let _hasYarn

const hasYarn = () => {
  if (_hasYarn != null) {
    return _hasYarn
  }
  try {
    execSync('yarn --version', { stdio: 'ignore' })
    return (_hasYarn = true)
  } catch (e) {
    return (_hasYarn = false)
  }
}

module.exports = async (name, targetDir) => {

  const _cmd = hasYarn() ? 'yarn' : 'npm';

  const step = {
    make_dir: {
      command: () => fs.mkdirSync(targetDir),
      info: `> create dir ${targetDir}`,
    },
    clone: {
      command: `git clone -b master qqdz@192.168.39.184:frontend/giant-spa-vue-admin-scaffold.git ${targetDir}/___project`,
      info: '> clone Project success!',
    },
    rm_repo_git: {
      command: () => fs.removeSync(`${targetDir}/___project/.git`),
      info: '> remove ___project/.git success!',
    },
    copy_to_project: {
      command: () => fs.copySync(`${targetDir}/___project/`, targetDir),
      info: `> copy ___project/* to ${targetDir} success!`,
    },
    rm_dir: {
      command: () => fs.removeSync(`${targetDir}/___project`),
      info: `> remove ${targetDir}/___project success!`,
    },
    add_project_name: {
      command: () => {
        const json = path.join(targetDir, './package.json');
        const jsonData = jsonFile.readFileSync(json);
        jsonData.name = name;
        jsonFile.writeFileSync(json, jsonData, { spaces: 2 });
      },
      info: `> add project name success!`,
    },
    init_project: {
      command: [
        () => process.chdir(targetDir),
        'giant download',
        `${_cmd} install --non-interactive`
      ],
      info: '> init project success!',
    }

  };

  if (!fs.existsSync(targetDir)) {
    execCmd(step, 'make_dir');
  }

  execCmd(step, 'clone');

  execCmd(step, 'rm_repo_git');

  execCmd(step, 'copy_to_project');

  execCmd(step, 'rm_dir');

  execCmd(step, 'add_project_name');

  execCmd(step, 'init_project')

}
