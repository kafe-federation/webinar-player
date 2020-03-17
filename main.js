const { app, BrowserWindow, ipcMain } = require('electron')

function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('www/main.html')

  // win.webContents.openDevTools()
  ipcMain.on('synchronous-message', (event, arg) => {
    event.returnValue = require('path').join(app.getPath('home'), ".kafe", "webinar");
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
