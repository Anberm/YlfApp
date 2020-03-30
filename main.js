/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
// require('update-electron-app')({
//     logger: require('electron-log')
//   })

const path = require('path')
const glob = require('glob')
const {
  app,
  BrowserWindow
} = require('electron')

const debug = /--debug/.test(process.argv[2])
const dev = /--dev/.test(process.argv[2])

if (process.mas) app.setName('Wisdom elevator')

let mainWindow = null

function initialize() {
  makeSingleInstance()

  loadScripts()

  function createWindow() {
    const windowOptions = {
      width: 1024,
      height: 768,
      fullscreen: true,
      center: true,
      // resizable: false,
      title: app.getName(),
      webPreferences: {
        nodeIntegration: true
      }
    }

    if (process.platform === 'linux') {
      windowOptions.icon = path.join(__dirname, '/assets/app-icon/linux/512.png')
    }

    mainWindow = new BrowserWindow(windowOptions)
    if (dev) {
      mainWindow.loadURL('http://localhost:5006')
    } else {
      mainWindow.loadURL(path.join('file://', __dirname, '/dist/index.html'))
    }

    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
      mainWindow.webContents.openDevTools()
      // mainWindow.maximize()
      require('devtron').install()
    }

    mainWindow.on('closed', () => {
      mainWindow = null
    })
  }
  app.commandLine.appendSwitch('ignore-certificate-errors');
  app.commandLine.appendSwitch('allow-running-insecure-content');
  app.commandLine.appendSwitch('autoplay-policy','no-user-gesture-required');
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
global.arguments = process.argv;
require('./main/update');
