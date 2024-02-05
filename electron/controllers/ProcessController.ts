import { ipcMain } from "electron";
import {
  createDevWidget,
  createWidget,
  getMode,
} from "../services/WidgetService";
import { CreateWidgetReturn, ICreateWidget } from "../../types/Process";
import Store from "./StoreController";
import { processNotificate } from "../utils/ProcessNotificator";
import {
  changeLockStatusById,
  changeLockStatusForAll,
} from "../services/LockService";

class ProcessController {
  private store: Store;

  constructor({ store }: { store: Store }) {
    this.store = store;
  }

  public init() {
    ipcMain.on("createWidget", (_, args: string) => {
      const config: ICreateWidget = JSON.parse(args);

      const isDevMode = getMode();

      // create new widget with config
      const newWidget: CreateWidgetReturn = isDevMode
        ? createDevWidget(config)
        : createWidget(config);

      // Add widget in global store
      this.store.widgetsInProcess = [...this.store.widgetsInProcess, newWidget];

      // controll widget lock status
      changeLockStatusForAll(this.store.widgetsInProcess, this.store.allIsLock);

      this.checkClose(newWidget);

      //  Notificate front-end that process changed
      processNotificate(
        this.store.mainWindow,
        this.store.widgetsInProcess,
        this.store.allIsLock
      );
    });

    ipcMain.on("getWidgetsInProcess", (_) => {
      //  Notificate front-end about process
      processNotificate(
        this.store.mainWindow,
        this.store.widgetsInProcess,
        this.store.allIsLock
      );
    });

    ipcMain.on("closeWidget", (_, args: string) => {
      // transform and validate params
      const { processId }: { processId: string } = JSON.parse(args);
      if (processId === undefined) return null;

      // find, close and delete widget by ID from store
      const item = this.store.widgetsInProcess.filter(
        (item) => item.processId === processId
      );

      item[0].ref?.close();

      this.store.widgetsInProcess = this.store.widgetsInProcess.filter(
        (item) => item.processId !== processId
      );

      //  Notificate front-end that process changed
      processNotificate(
        this.store.mainWindow,
        this.store.widgetsInProcess,
        this.store.allIsLock
      );
    });

    ipcMain.on("change-lock-widget-status", (_, args: string) => {
      // transform and validate params
      const { processId }: { processId: string } = JSON.parse(args);
      if (processId === undefined) return null;

      // find widget by ID from store
      const item = this.store.widgetsInProcess.filter(
        (item) => item.processId === processId
      )[0];

      if (item !== undefined) {
        changeLockStatusById(item);

        // changing the allIsLock status if all variables are equal to the same value
        this.store.allIsLock = this.store.widgetsInProcess.every(
          (item) => item.lock === true
        );

        //  Notificate front-end that process changed
        processNotificate(
          this.store.mainWindow,
          this.store.widgetsInProcess,
          this.store.allIsLock
        );
      }
    });

    ipcMain.on("change-lock-status-for-all-widgets", (_) => {
      this.store.allIsLock = !this.store.allIsLock;
      changeLockStatusForAll(this.store.widgetsInProcess, this.store.allIsLock);

      //  Notificate front-end that process changed
      processNotificate(
        this.store.mainWindow,
        this.store.widgetsInProcess,
        this.store.allIsLock
      );
    });
  }

  // Notificate fron-end if some widget was closed
  private checkClose(widget: CreateWidgetReturn) {
    widget.ref?.on("close", () => {
      console.log("widget closed");
      this.store.widgetsInProcess = this.store.widgetsInProcess.filter(
        (win) => win.processId !== widget.processId
      );

      processNotificate(
        this.store.mainWindow,
        this.store.widgetsInProcess,
        this.store.allIsLock
      );
    });
  }
}

export default ProcessController;
