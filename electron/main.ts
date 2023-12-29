import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { getInstalledWidgets } from "./scripts/getInstalledWidgets";
import { createWidgetWindow } from "./scripts/createWidget";

process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
let modalWindows: Array<BrowserWindow> = [];
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    width: 1200,
    height: 800,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

ipcMain.on("createWidget", (e, args) => {
  const widgetConfig = JSON.parse(args);
  // console.log(widgetConfig);
  createWidgetWindow({
    width: widgetConfig.window.width,
    height: widgetConfig.window.height,
    entryFile: path.join(widgetConfig.path + widgetConfig.window.entryFile),
  });
});

ipcMain.handle("getInstalled", async (e) => {
  return await getInstalledWidgets();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
