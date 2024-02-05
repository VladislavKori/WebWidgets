import { nativeImage, Tray, Menu, app } from "electron";
import path from "node:path"
import Store from "../controllers/StoreController";

export function createTray({ store }: { store: Store }) {
  const iconPath = path.join(__dirname, '../dist/logo64x64.png')

  const icon = nativeImage.createFromPath(iconPath);
  const tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open",
      click() {
        store.mainWindow?.show();
      },
    },
    {
      label: "Close",
      click() {
        app.quit();
      },
    },
  ]);

  tray.setToolTip("WebWidgets");
  tray.setContextMenu(contextMenu);
  //

  tray.on("click", () => {
    tray.popUpContextMenu();
  });
}
