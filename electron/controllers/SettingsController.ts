import { ipcMain } from "electron";
// import Store from "./StoreController";
import {
  getAllWidgetsFolderPaths,
  openDialogForSelectFolder,
  openFolderInFileExplorer,
} from "../services/FileServices";
import {
  addWidgetFolderPathToConfig,
  disableAutoLunch,
  enableAutoLunch,
  getAutoLunchMode,
  getConfiguration,
  removeWidgetFolderPathFromConfig,
  saveConfiguration,
} from "../services/SettingsService";
import Store from "./StoreController";
import {
  disableDevModeForWidget,
  enableDevModeForWidget,
  getMode,
  setDevMode,
} from "../services/WidgetService";
import { processNotificate } from "../utils/ProcessNotificator";

class SettingsController {
  private store: Store;

  constructor({ store }: { store: Store }) {
    this.store = store;
  }

  public init() {
    // handle - return folders path, where you save your widgets
    ipcMain.handle("get-widget-folders", (_): string[] => {
      return getAllWidgetsFolderPaths();
    });

    // handle - openWidgetsFolder
    ipcMain.handle("open-widget-folder", (_, args) => {
      const path: string = JSON.parse(args);
      openFolderInFileExplorer(path);
    });

    // handle - set new path
    ipcMain.handle("add-widget-folder", async (): Promise<string[]> => {
      const paths: Array<string> = await openDialogForSelectFolder();
      paths.map((path) => addWidgetFolderPathToConfig(path));

      return getAllWidgetsFolderPaths();
    });

    // handle - remove folder path
    ipcMain.handle("remove-widget-folder", (_, args): string[] => {
      const path: string = JSON.parse(args);
      removeWidgetFolderPathFromConfig(path);
      return getAllWidgetsFolderPaths();
    });

    // handle - set language
    ipcMain.handle("set-language", (_, args) => {
      const config = getConfiguration();
      config.language = JSON.parse(args).language;
      saveConfiguration(config);
    });

    // handle - get language
    ipcMain.handle("get-language", (_) => {
      const config = getConfiguration();
      return config.language;
    });

    // handle - enable dev mode for modal windows
    ipcMain.handle("enable-dev-mode", () => {
      const widgets = this.store.widgetsInProcess;

      // clear process widgets
      this.store.widgetsInProcess = [];

      widgets.map((item) => {
        this.store.widgetsInProcess = [
          ...this.store.widgetsInProcess,
          enableDevModeForWidget(item),
        ];
      });

      setDevMode(true);

      processNotificate(
        this.store.mainWindow,
        this.store.widgetsInProcess,
        this.store.allIsLock
      );
    });

    // handle - disable dev mode for modal windows
    ipcMain.handle("disable-dev-mode", () => {
      const widgets = this.store.widgetsInProcess;

      // clear process widgets
      this.store.widgetsInProcess = [];

      widgets.map((item) => {
        this.store.widgetsInProcess.push(disableDevModeForWidget(item));
      });

      setDevMode(false);

      processNotificate(
        this.store.mainWindow,
        this.store.widgetsInProcess,
        this.store.allIsLock
      );
    });

    // handle - get mode
    ipcMain.handle("get-mode", () => {
      return getMode();
    });

    // handle
    ipcMain.handle("enable-auto-lunch", () => {
      enableAutoLunch();
    });

    // handle
    ipcMain.handle("disable-auto-lunch", () => {
      disableAutoLunch();
    });

    ipcMain.handle("get-lunch-mode", () => {
      return getAutoLunchMode();
    });
  }
}

export default SettingsController;
