import { app, BrowserWindow } from "electron";
import { createHubWindow } from "./services/HubService";
import { HubController } from "./controllers/HubController";
import { WidgetManageController } from "./controllers/WidgetManageController";
import { WidgetProcessController } from "./controllers/WidgetProcessController";
import { IStore } from "../types/Store";

class WebWidgetsApp {
  private _hubWindow: BrowserWindow | undefined;
  private _store: IStore = {
    installed: {
      widgets: [],
    },
    process: {
      widgets: [],
    },
  };

  constructor() {
    this.start();
  }

  private start(): void {
    app.whenReady().then(() => {
      this._hubWindow = createHubWindow();

      // controllers
      new HubController({ hubWindow: this._hubWindow });
      new WidgetManageController({
        hubWindow: this._hubWindow,
        store: this._store,
      });
      new WidgetProcessController({
        hubWindow: this._hubWindow,
        store: this._store,
      });
      

      HubController.eventSecondInstance(this._hubWindow);

      // for macos
      HubController.eventWindowAllClosed();

      // for macos
      HubController.eventActivate(this._hubWindow);
    });
  }
}

const appInstance = new WebWidgetsApp();
