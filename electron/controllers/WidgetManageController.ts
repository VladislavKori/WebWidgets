import { BrowserWindow, ipcMain } from "electron";
import { getInstalledWidgets } from "../services/InstallationService";
import { HubNotificate } from "../utils/HubNotificator";
import { IStore } from "../../types/Store";

interface WidgetManageControllerConstructor {
  hubWindow: BrowserWindow;
  store: IStore;
}

export class WidgetManageController {
  private _hubWindow: BrowserWindow;
  private _store: IStore;

  constructor({ hubWindow, store }: WidgetManageControllerConstructor) {
    this._hubWindow = hubWindow;
    this._store = store;
    this.init();
  }

  public init() {
    ipcMain.on("manage-controller-notificate", () => {
      this.notificate();
    });

    ipcMain.on("install-remote-widget", (_, args: string): void => {
      const { link }: { link: string } = JSON.parse(args);

      this.notificate();
    });

    ipcMain.on("delete-widget", (_, args: string): void => {
      const { widgetId }: { widgetId: string } = JSON.parse(args);

      this.notificate();
    });
  }

  private notificate(): void {
    const widgets = getInstalledWidgets();
    this._store.installed.widgets = widgets;
    HubNotificate(this._hubWindow, "listen-installed-widgets", JSON.stringify(widgets))
  }
}
