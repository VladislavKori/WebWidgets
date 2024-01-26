import { BrowserWindow, app } from "electron";
import { createMainWindow } from "./services/AppService";
import WidgetController from "./controllers/WidgetController";
import ProcessController from "./controllers/ProcessController";
import Store from "./controllers/StoreController";
import { createTray } from "./utils/Tray";
import SettingsController from "./controllers/SettingsController";
import { InitAppByConfig } from "./utils/InitAppByConfig";
import { ICreateWidget } from "../types/Process";
import { saveWidgetInConfig } from "./services/WidgetService";

// Init session store
const store = new Store();

// Init controllers
new WidgetController({ store }).init();
new ProcessController({ store }).init();
new SettingsController({ store }).init();

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow((win: BrowserWindow) => {
      store.mainWindow = win;
    });
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.whenReady().then((_) => {
  createMainWindow((win: BrowserWindow) => {
    store.mainWindow = win;
  });
  createTray({ store });

  // Init app settings
  InitAppByConfig({ store });
});

app.on("before-quit", () => {
  const widgets: Array<ICreateWidget> = store.widgetsInProcess.map(
    (widgetConfig) => {
      return {
        config: widgetConfig.config,
        folderPath: widgetConfig.folderPath,
        position: widgetConfig.ref?.getPosition(),
      };
    }
  );

  saveWidgetInConfig(widgets);
});
