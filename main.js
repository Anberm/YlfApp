/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-unused-vars */
const electron = require('electron')

const {
  app,
  BrowserWindow,
  ipcMain
} = electron
const path = require('path')
const glob = require('glob')
const AutoLaunch = require('auto-launch')
const log = require('electron-log');

const args = process.argv.slice(1)
const debug = args.some(val => val === '--debug')
const dev = args.some(val => val === '--dev')

if (process.mas) app.setName('Wisdom elevator')


let mainWindow = null

function initialize() {
  makeSingleInstance()

  loadScripts()

  function createWindow() {
    const windowOptions = {
      icon: path.join(__dirname, '/resources/icons/512.png'),
      width: 1024,
      height: 768,
      maxWidth: 1024,
      minWidth: 1024,
      maxHeight: 768,
      minHeight: 768,
      fullscreen: false,
      center: true,
      // resizable: false,
      webPreferences: {
        nodeIntegration: true
      }
    }

    mainWindow = new BrowserWindow(windowOptions)
    mainWindow.setMenu(null)

    if (dev) {
      mainWindow.loadURL('http://localhost:5006')
    } else {
      mainWindow.loadURL(path.join('file://', __dirname, '/dist/index.html'))
    }
    if (dev) {
      mainWindow.webContents.openDevTools();
    }

    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
      require('electron-debug')();
    }

    mainWindow.on('closed', () => {
      mainWindow = null
    })
  }

  function autoStart() {
    const ylfAutoLaunch = new AutoLaunch({
      name: 'YlfWisdomelEvator'
    })
    ylfAutoLaunch.enable() // 开机自启
    // ylfAutoLaunch.disable()// 禁用自启
    ylfAutoLaunch.isEnabled()
      .then((isEnabled) => {
        if (isEnabled) {
          return;
        }
        ylfAutoLaunch.enable();
      })
      .catch((err) => {
        // handle error
        log.error('YlfWisdomelEvator err:',err)
      });
  }
  app.commandLine.appendSwitch('ignore-certificate-errors');
  app.commandLine.appendSwitch('allow-running-insecure-content');
  app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
  app.on('ready', () => {
    createWindow()

  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
  if (process.mas) return

  app.requestSingleInstanceLock()

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

// Require each JS file in the script dir
function loadScripts() {
  const files = glob.sync(path.join(__dirname, 'scripts/**/*.js'))
  files.forEach((file) => {
    require(file)
  })
}

initialize()
// Share process arguments
global.arguments = process.argv

