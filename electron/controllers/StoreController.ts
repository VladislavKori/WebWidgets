import { BrowserWindow } from "electron";
import { SearchWidgetReturn } from "../../types/Installation";
import { CreateWidgetReturn } from "../../types/Process";

class Store {
  private _widgetsInProcess: CreateWidgetReturn[] = [];
  private _installedWidget: SearchWidgetReturn[] = [];
  private _mainWindow: BrowserWindow | null = null;
  private _allIsLock = false;

  public get widgetsInProcess() {
    return this._widgetsInProcess;
  }

  public set widgetsInProcess(data: CreateWidgetReturn[]) {
    this._widgetsInProcess = data;
  }

  public get installedWidget() {
    return this._installedWidget;
  }

  public set installedWidget(data: SearchWidgetReturn[]) {
    this._installedWidget = data;
  }

  public get mainWindow() {
    return this._mainWindow;
  }

  public set mainWindow(window: BrowserWindow | null) {
    this._mainWindow = window;
  }

  public get allIsLock() {
    return this._allIsLock;
  }

  public set allIsLock(lockStatus: boolean) {
    this._allIsLock = lockStatus;
  }
}

export default Store;
