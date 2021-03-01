const { app, BrowserWindow, ipcMain } = require('electron');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const isDevelopment = process.env.NODE_ENV !== 'production';

function createWindow() {
  const window = new BrowserWindow({
    width: 1280,
    height: 720,
    y: 1080,
    x: 1920,
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
    },
  });
  window.removeMenu();

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true,
      })
    );
  }

  ipcMain.on('test', async (event, message) => {
    console.log(message);
    window.webContents.send('test_2', 'B');
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

console.log('main');
