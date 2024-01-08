import { BrowserWindow, app } from "electron";
import { createMainWindow } from "./services/AppService";
import WidgetController from "./controllers/WidgetController";
import ProcessController from "./controllers/ProcessController";
import Store from "./controllers/StoreController";
import { createTray } from "./utils/Tray";

// Init session store
const store = new Store();

// Init controllers
new WidgetController({ store }).init();
new ProcessController({ store }).init();

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
});
