import {
  BrowserWindow,
  app,
  ipcMain,
  screen,
  nativeImage,
  Tray,
  Menu,
} from "electron";
import path from "node:path";
import {
  disableAutolaunch,
  enableAutolaunch,
  getConfiguration,
} from "./SettingsService";
import { initNodeJSLibs } from "../libs";

const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");
const isProdMode: boolean = import.meta.env.MODE === "production";

/**
 * Create main window for app
 *
 * @returns {BrowserWindow} ref on window
 */
export function createHubWindow(): BrowserWindow {
  const win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "logo64x64.png"),
    minWidth: 1200,
    minHeight: 700,
    frame: !isProdMode,
    titleBarStyle: isProdMode ? "hidden" : "default",
    webPreferences: {
      devTools: !isProdMode,
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
  ipcMain.on("hub-close", (_) => {
    win.hide();
  });

  ipcMain.on("hub-maximize", (_) => {
    win.isMaximized() ? win.unmaximize() : win.maximize();
  });

  ipcMain.on("hub-minimize", (_) => {
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

  return win;
}

export function createTray({ hubWin }: { hubWin: BrowserWindow }) {
  const iconPath = path.join(__dirname, "../dist/logo64x64.png");

  const icon = nativeImage.createFromPath(iconPath);
  const tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open",
      click() {
        hubWin.show();
      },
    },
    {
      label: "Close",
      click() {
        app.quit();
      },
    },
  ]);

  tray.setToolTip("WebWidgets");
  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    tray.popUpContextMenu();
  });
}

export function initHubByConfig() {
  const config = getConfiguration();

  // Set autolunch
  if (config.autolaunch) enableAutolaunch();
  else disableAutolaunch();

  // Init Support for NodeJS Libs
  initNodeJSLibs();

  // config.widgets.active.map((widget) => {
  //   const newWidget = config.widgets.devMode
  //     ? createDevWidget(widget)
  //     : createWidget(widget);

  //   // Add widget in global store
  //   store.widgetsInProcess = [...store.widgetsInProcess, newWidget];
  // });
}
