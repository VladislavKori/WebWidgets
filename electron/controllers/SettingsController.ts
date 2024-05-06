import { BrowserWindow, ipcMain } from "electron";
import {
  openDialogForSelectFolder,
  openFolderInFileExplorer,
} from "../services/FileServices";
import {
  addWidgetFolderPathToConfig,
  disableAutoLunch,
  enableAutoLunch,
  getConfiguration,
  removeWidgetFolderPathFromConfig,
  saveConfiguration,
} from "../services/SettingsService";

export class SettingsController {
  private hubWin: BrowserWindow;

  constructor(hubWin: BrowserWindow) {
    this.hubWin = hubWin;
    this.init();
  }

  private init() {
    // Initial notification
    this.notificate();

    // AutoLunch Handlers
    ipcMain.handle("enable-autolunch", () => {
      enableAutoLunch();
      this.notificate()
    });
    ipcMain.handle("disable-autolunch", () => {
      disableAutoLunch();
      this.notificate()
    });

    // Set Language
    ipcMain.handle("set-language", (_, args) => {
      const config = getConfiguration();
      config.language = JSON.parse(args).language;
      saveConfiguration(config);
      this.notificate()
    });

    // Open Windows File Manager
    ipcMain.handle("open-folder", (_, args) => {
      const path: string = JSON.parse(args);
      openFolderInFileExplorer(path);
      this.notificate()
    });

    // Add new folder path
    ipcMain.handle("add-folder", async (): Promise<void> => {
      const paths: Array<string> = await openDialogForSelectFolder();
      paths.map((path) => addWidgetFolderPathToConfig(path));
      this.notificate()
    });

    // Remove folder path
    ipcMain.handle("remove-folder", (_, args): void => {
      const path: string = JSON.parse(args);
      removeWidgetFolderPathFromConfig(path);
      this.notificate()
    });
  }

  private notificate() {
    this.hubWin.webContents.postMessage("listen-app-config", (): string => {
      const config = getConfiguration();
      return JSON.stringify(config)
    });
  }
}