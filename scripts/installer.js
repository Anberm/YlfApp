#!/usr/bin/env node

const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')
const rimraf = require('rimraf')

deleteOutputFolder()
  .then(getInstallerConfig)
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  const rootPath = path.join(__dirname, '..')
  const outPath = path.join(rootPath, 'out')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'wisdomelevator-win32-x64'),
    exe: 'WisdomElevator.exe',
    iconUrl: path.join(rootPath, 'assets', 'app-icon', 'win','app.ico'),
    // loadingGif: path.join(rootPath, 'assets', 'img', 'loading.gif'),
    noMsi: true,
    authors:'Anber<shuangyan_m@hotmail.com>',
    outputDirectory: path.join(outPath, 'windows-installer'),
    setupExe: 'WisdomElevator.exe',
    setupIcon: path.join(rootPath, 'assets', 'app-icon', 'win', 'app.ico'),
    skipUpdateIcon: true
  })
}

function deleteOutputFolder () {
  return new Promise((resolve, reject) => {
    rimraf(path.join(__dirname, '..', 'out', 'windows-installer'), (error) => {
      error ? reject(error) : resolve()
    })
  })
}
