import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { getInstalledWidgets } from "./scripts/getInstalledWidgets";
import { createWidgetWindow } from "./scripts/createWidget";
import { IWidget } from "./types/widget";
import { lockAllWidgets, unlockAllWidgets } from "./scripts/locker";

process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
export let modalWindows: Array<{ processId: string, widget: IWidget, ref: BrowserWindow }> = [];
let allWidgetIsLock = false;

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
  const widgetConfig: IWidget = JSON.parse(args);
  const newWidget = createWidgetWindow(widgetConfig.path, widgetConfig.config);
  modalWindows.push(newWidget)

  if (allWidgetIsLock) lockAllWidgets()
  else unlockAllWidgets()
});

ipcMain.handle("getInstalled", async (e) => {
  return await getInstalledWidgets();
});

ipcMain.handle("getWidgetsInProcess", e => {
  return modalWindows.map(item => {
    return { ...item.widget, processId: item.processId }
  })
})

ipcMain.on("closeWidget", (e, args) => {
  const { processId } = JSON.parse(args)
  const item = modalWindows.filter(item => item.processId == processId)
  item[0].ref.close()

  // remove from array
  modalWindows = modalWindows.filter(item => item.processId !== processId)
})

ipcMain.on("changeLockMod", (e, args) => {
  allWidgetIsLock = !allWidgetIsLock;

  if (allWidgetIsLock) lockAllWidgets()
  else unlockAllWidgets()
})

ipcMain.handle("getLockMod", (e, args) => {
  return allWidgetIsLock
})

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
