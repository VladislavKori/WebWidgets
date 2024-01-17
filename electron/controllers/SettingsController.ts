import { ipcMain } from "electron";
// import Store from "./StoreController";
import { getAllWidgetsFolderPaths, openFolderInFileExplorer } from "../services/WidgetService";

class SettingsController {
    // private store: Store;

    // constructor({ store }: { store: Store }) {
    //     this.store = store;
    // }

    public init() {
        // handle - return folders path, where you save your widgets
        ipcMain.handle("get-widget-folders", (_) => {
            return getAllWidgetsFolderPaths();
        });

        // handle - openWidgetsFolder
        ipcMain.handle("open-widget-folder", (_, args) => {
            const path: string = JSON.parse(args);
            openFolderInFileExplorer(path);
        });

        // handle - set new path
        ipcMain.handle("add-widget-folder", (_) => {

        })

        // handle - remove folder path
        ipcMain.handle("remove-folder-path", (_) => {

        })
    }
}

export default SettingsController;