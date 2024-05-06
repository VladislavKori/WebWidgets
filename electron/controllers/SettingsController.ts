import { BrowserWindow, ipcMain } from "electron";
import {
  getAllWidgetsFolderPaths,
  openDialogForSelectFolder,
  openFolderInFileExplorer,
} from "../services/FileServices";
import {
  addWidgetFolderPathToConfig,
  disableAutolaunch,
  enableAutolaunch,
  getConfiguration,
  removeWidgetFolderPathFromConfig,
  saveConfiguration,
} from "../services/SettingsService";
import { HubNotificate } from "../utils/HubNotificator";

interface SettingsControllerConstructor {
  hubWindow: BrowserWindow;
}

export class SettingsController {
  private hubWindow: BrowserWindow;

  constructor({ hubWindow }: SettingsControllerConstructor) {
    this.hubWindow = hubWindow;
    this.init();
  }

  private init() {
    ipcMain.on("settings-controller-notificate", () => {
      this.notificate();
    })

    // AutoLunch Handlers
    ipcMain.on("enable-autolaunch", () => {
      enableAutolaunch();
      this.notificate()
    });
    ipcMain.on("disable-autolaunch", () => {
      disableAutolaunch();
      this.notificate()
    });

    // Set Language
    ipcMain.on("set-language", (_, args) => {
      const config = getConfiguration();
      config.language = JSON.parse(args).language;
      saveConfiguration(config);
      this.notificate()
    });
    ipcMain.handle("get-language", () => {
      const config = getConfiguration();
      return { lang: config.language };
    });

    // Open Windows File Manager
    ipcMain.on("open-folder", (_, args) => {
      const path: string = JSON.parse(args);
      openFolderInFileExplorer(path);
      this.notificate()
    });

    // Add new folder path
    ipcMain.on("add-folder", async (): Promise<void> => {
      const paths: Array<string> = await openDialogForSelectFolder();
      paths.map((path) => addWidgetFolderPathToConfig(path));
      this.notificate()
    });

    // Remove folder path
    ipcMain.on("remove-folder", (_, args): void => {
      const path: string = JSON.parse(args);
      removeWidgetFolderPathFromConfig(path);
      this.notificate()
    });
  }

  private notificate() {
    const config = getConfiguration();
    config.folders = getAllWidgetsFolderPaths();
    HubNotificate(this.hubWindow, "listen-app-config", JSON.stringify(config));
  }
}