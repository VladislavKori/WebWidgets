import { BrowserWindow, app } from "electron";
import { createHubWindow, createTray, initHubByConfig } from "../services/HubService";

interface HubControllerConstructor {
  hubWindow: BrowserWindow;
}

export class HubController {
  private _hubWindow: BrowserWindow;

  constructor({ hubWindow }: HubControllerConstructor) {
    this._hubWindow = hubWindow;
    this.init();
  }

  public init() {
    createTray({ hubWin: this._hubWindow });
    initHubByConfig();
  }

  public static eventWindowAllClosed(): void {
    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") app.quit();
    });
  }

  public static eventSecondInstance(
    hubWindow: BrowserWindow | undefined
  ): void {
    const additionalData = { myKey: "webwidgets-key" };
    const gotTheLock = app.requestSingleInstanceLock(additionalData);

    if (!gotTheLock) {
      app.quit();
    } else {
      app.on("second-instance", () => {
        if (hubWindow) {
          if (hubWindow.isMinimized()) hubWindow.restore();
          if (!hubWindow.isVisible()) hubWindow.show();
          hubWindow.focus();
        }
      });
    }
  }

  public static eventActivate(hubWindow: BrowserWindow | undefined) {
    app.on("activate", () => {
      hubWindow = createHubWindow();
    });
  }
}
