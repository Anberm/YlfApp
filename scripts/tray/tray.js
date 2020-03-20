const path = require('path')
const {ipcMain, app, Menu, Tray} = require('electron')

let appIcon = null

ipcMain.on('put-in-tray', (event) => {
  const iconName = 'AR-06_32x32.png'//process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
  const iconPath = path.join(__dirname, iconName)
  appIcon = new Tray(iconPath)

  const contextMenu = Menu.buildFromTemplate([{
    label: '移除',
    click: () => {
      event.sender.send('tray-removed')
    }
  }])

  appIcon.setToolTip('智慧电梯')
  appIcon.setContextMenu(contextMenu)
})

ipcMain.on('remove-tray', () => {
  appIcon.destroy()
})

app.on('window-all-closed', () => {
  if (appIcon) appIcon.destroy()
})
