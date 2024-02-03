import { BrowserWindow, app, ipcMain, screen } from "electron";
import path from "node:path";

const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");
const isProdMode: boolean = import.meta.env.MODE === "production";

/**
 * Create main window for app
 *
 * @param callback inside callback param you can get window ref
 * @returns {BrowserWindow} ref on window
 */
export function createMainWindow(callback?: Function | undefined) {
  const win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "logo64x64.png"),
    minWidth: 1200,
    minHeight: 800,
    titleBarStyle: isProdMode ? "hidden" : "default",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
    },
  });

  // Manual centering of the window at startup
  let { width, height } = screen.getPrimaryDisplay().workAreaSize;
  let { width: winWidth, height: winHeight } = win.getBounds();
  let x = Math.round(width / 2 - winWidth / 1.5);
  let y = Math.round(height / 2 - winHeight / 1.5);
  win.setPosition(x, y);

  // Window event handling
  ipcMain.on("close", (_) => {
    win.hide();
  });

  ipcMain.on("maximize", (_) => {
    win.isMaximized() ? win.unmaximize() : win.maximize();
  });

  ipcMain.on("minimize", (_) => {
    win.minimize();
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }

  if (callback !== undefined) {
    callback(win);
  } else {
    return win;
  }
}
