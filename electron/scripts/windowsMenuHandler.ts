import { BrowserWindow, ipcMain } from "electron";

function initWindowMenuHandler(window: BrowserWindow) {
  ipcMain.on("close", (_) => {
    window.close();
  });

  ipcMain.on("maximize", (_) => {
    window.isMaximized() ? window.unmaximize() : window.maximize();
  });

  ipcMain.on("minimize", (_) => {
    window.minimize();
  });
}

export default initWindowMenuHandler;
