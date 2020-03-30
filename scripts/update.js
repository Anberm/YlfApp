const electron = require('electron');
const { dialog, ipcMain } = electron;
const log = require('electron-log');
const { autoUpdater } = require('electron-updater');

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = false;
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

ipcMain.on('check-updates', (event, options) => {
  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on('update-available', () => {
    event.sender.send('update-available');
  });

  autoUpdater.on('update-downloaded', () => {
    event.sender.send('update-downloaded');
  });
});

ipcMain.on('show-update-available-dialog', (event, options) => {
  dialog.showMessageBox(options, (index) => {
      if (index === 0) {
          autoUpdater.downloadUpdate();
      }
  });
});

ipcMain.on('show-update-downloaded-dialog', (event, options) => {
  let installed = false;
  dialog.showMessageBox(options, index => {
    if (index === 0) {
      installed = true;
      autoUpdater.quitAndInstall();
    }
  });
});
