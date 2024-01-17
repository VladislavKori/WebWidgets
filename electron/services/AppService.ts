import { BrowserWindow, app, ipcMain } from "electron";
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
    titleBarStyle: isProdMode ? "default" : "default",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
    },
  });

  //  The platform-specific handle of the window.
  // console.log("this", win.getNativeWindowHandle());

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
