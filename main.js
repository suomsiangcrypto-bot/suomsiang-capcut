// main.js — Electron main process for SUOMSIANG CAPCUT Player
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 886,            // ~ matches the device 1680:1240 aspect ratio
    minWidth: 640,
    minHeight: 472,
    icon: path.join(__dirname, 'icon.ico'),   // taskbar / window icon
    frame: false,           // no OS title bar — the device IS the window
    transparent: true,      // see-through corners, only the device shows
    backgroundColor: '#00000000',
    hasShadow: false,
    resizable: true,
    show: false,            // wait until ready to avoid a white flash
    webPreferences: {
      nodeIntegration: true,    // renderer uses require('electron') / fs directly
      contextIsolation: false,
      sandbox: false,           // required for nodeIntegration to actually work
      backgroundThrottling: false
    }
  });

  win.loadFile('index.html');

  win.once('ready-to-show', () => win.show());
  win.on('closed', () => { win = null; });
}

// --- window control buttons from the renderer (the ▢ / ✕ in the UI) ---
ipcMain.on('win-min',   () => { if (win) win.minimize(); });
ipcMain.on('win-close', () => { if (win) win.close(); });

// --- tell the renderer where to store the saved playlist (playlist.json) ---
ipcMain.on('get-userdata', (e) => { e.returnValue = app.getPath('userData'); });

// --- corner resize handles: drag a corner to scale the player (keeps shape) ---
let _resizeBounds = null;
const ASPECT = 1680 / 1240;            // device width : height
ipcMain.on('resize-start', () => { if (win) _resizeBounds = win.getBounds(); });
ipcMain.on('resize-move', (_e, { dx, dy, dir }) => {
  if (!win || !_resizeBounds) return;
  const { x, y, width, height } = _resizeBounds;
  let newW = width;
  if (dir.includes('e')) newW = width + dx;
  if (dir.includes('w')) newW = width - dx;
  newW = Math.max(480, Math.round(newW));   // don't let it get too tiny
  const newH = Math.round(newW / ASPECT);
  let newX = x, newY = y;
  if (dir.includes('w')) newX = x + (width - newW);   // anchor the opposite corner
  if (dir.includes('n')) newY = y + (height - newH);
  win.setBounds({ x: Math.round(newX), y: Math.round(newY), width: newW, height: newH });
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
