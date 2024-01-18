import { ipcMain } from "electron";
// import Store from "./StoreController";
import { getAllWidgetsFolderPaths, openFolderInFileExplorer } from "../services/FileServices";
import { addWidgetFolderPathToConfig, removeWidgetFolderPathFromConfig } from "../services/SettingsService";

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
        ipcMain.handle("add-widget-folder", (_, args) => {
            const path: string = JSON.parse(args);
            addWidgetFolderPathToConfig(path);
        })

        // handle - remove folder path
        ipcMain.handle("remove-folder-path", (_, args) => {
            const path: string = JSON.parse(args);
            removeWidgetFolderPathFromConfig(path);
        })
    }
}

export default SettingsController;