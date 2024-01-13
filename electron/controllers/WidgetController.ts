import { ipcMain } from "electron";
import { getInstalledWidgets } from "../services/InstallationService";
import Store from "./StoreController";
import { SearchWidgetReturn } from "../../types/Installation";
import {
  getWidgetsFolder,
  openFolderInFileExplorer,
} from "../services/WidgetService";

class WidgetController {
  private store: Store;

  constructor({ store }: { store: Store }) {
    this.store = store;
  }

  public init(): void {
    ipcMain.handle("getInstalled", (_) => {
      const installedWidgets: SearchWidgetReturn[] = getInstalledWidgets();

      // Update installed widgets in global store
      this.store.installedWidget = installedWidgets;

      // send installed widgets on front-end
      return installedWidgets;
    });

    // handle - getWidgetsFolder
    ipcMain.handle("get-widgets-folder", (_) => {
      return getWidgetsFolder();
    });

    // handle - openWidgetsFolder
    ipcMain.handle("open-widget-folder", (_) => {
      openFolderInFileExplorer(getWidgetsFolder());
    });

    // handle - installWidget
    // ipcMain.handle("getInstalled", async (_) => {
    //   return await getInstalledWidgets();
    // });

    // handle - removeWidget
    // ipcMain.handle("getInstalled", async (_) => {
    //   return await getInstalledWidgets();
    // });
  }

  public async recheckInstalledWidgets() {
    return await getInstalledWidgets();
  }
}

export default WidgetController;
