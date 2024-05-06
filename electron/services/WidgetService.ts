import path from "node:path";
import uniqid from "uniqid";
import { BrowserWindow, ipcMain } from "electron";

// @ts-ignore
import { toBottom } from "electron-swd";
import { IWidget } from "../../types/Widget";

export function createWidget(params: IWidget): IWidget {
  const { folderPath, config, widgetId, parameters } = params;

  const widgetWindow = new BrowserWindow({
    width: Number(config.window.width),
    height: Number(config.window.height),
    transparent: true,
    frame: false,
    type: "toolbar",
    resizable: false,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, "widget-preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  widgetWindow.on("blur", () => {
    widgetWindow.setBackgroundColor("#00000000");
  });

  widgetWindow.on("focus", () => {
    widgetWindow.setBackgroundColor("#00000000");
    toBottom(widgetWindow.getNativeWindowHandle());
  });

  widgetWindow.loadFile(path.join(folderPath + config.window.entryFile));

  if (parameters && parameters.position) {
    widgetWindow.setPosition(parameters.position.x, parameters.position.y);
  }

  return {
    id: uniqid(),
    widgetId: widgetId,
    folderPath: folderPath,
    ref: widgetWindow,
    config: config,
    parameters: {
      locker: false,
      mode: "production",
      position: {
        x: widgetWindow.getPosition()[0],
        y: widgetWindow.getPosition()[1],
      },
    },
  };
}

export const createDevWidget = (params: IWidget): IWidget => {
  const { folderPath, config, widgetId, parameters, id } = params;

  const widgetWindow = new BrowserWindow({
    width: Number(config.window.width),
    height: Number(config.window.height),
    webPreferences: {
      preload: path.join(__dirname, "widget-preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      devTools: true,
    },
  });

  widgetWindow.loadFile(path.join(folderPath + config.window.entryFile));

  // if (params.position !== undefined) {
  //   widgetWindow.setPosition(params.position[0], params.position[1]);
  // }

  widgetWindow.maximize();

  widgetWindow.on("ready-to-show", () => {
    widgetWindow.webContents.openDevTools();
  });

  return {
    id: uniqid(),
    widgetId: widgetId,
    folderPath: folderPath,
    ref: widgetWindow,
    config: config,
    parameters: {
      locker: false,
      mode: "dev",
      position: {
        x: widgetWindow.getPosition()[0],
        y: widgetWindow.getPosition()[1],
      },
    },
  };
};

// export function saveWidgetInConfig(widgets: Array<ICreateWidget>) {
//   const appConfig = getConfiguration();
//   appConfig.widgets.active = widgets;
//   saveConfiguration(appConfig);
// }
1;
