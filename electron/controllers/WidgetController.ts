import { ipcMain } from "electron";
import { getInstalledWidgets } from "../services/InstallationService";
import Store from "./StoreController";
import { SearchWidgetReturn } from "../../types/Installation";

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
