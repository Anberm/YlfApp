const {app, dialog} = require('electron')
const path = require('path')

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('ylf-wisdom-elevator', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('ylf-wisdom-elevator')
}

app.on('open-url', (event, url) => {
  dialog.showErrorBox('欢迎回来', `您来自: ${url}`)
})
