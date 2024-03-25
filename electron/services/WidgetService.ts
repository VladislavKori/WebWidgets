import path from "node:path";
import uniqid from "uniqid";
import { BrowserWindow } from "electron";
import { CreateWidgetReturn, ICreateWidget } from "../../types/Process";

// @ts-ignore
import { toBottom } from "electron-swd";
import { getConfiguration, saveConfiguration } from "./SettingsService";

export function createWidget(params: ICreateWidget): CreateWidgetReturn {
  const { folderPath, config } = params;

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

  if (params.position !== undefined) {
    widgetWindow.setPosition(params.position[0], params.position[1]);
  }

  return {
    processId: uniqid(),
    config,
    lock: false,
    folderPath,
    isDevMode: false,
    ref: widgetWindow,
  };
}

export const createDevWidget = (params: ICreateWidget): CreateWidgetReturn => {
  const { folderPath, config } = params;

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

  if (params.position !== undefined) {
    widgetWindow.setPosition(params.position[0], params.position[1]);
  }

  widgetWindow.maximize();

  widgetWindow.on("ready-to-show", () => {
    widgetWindow.webContents.openDevTools();
  });

  return {
    processId: uniqid(),
    config,
    lock: false,
    folderPath,
    isDevMode: true,
    ref: widgetWindow,
  };
};

export const enableDevModeForWidget = (
  widget: CreateWidgetReturn
): CreateWidgetReturn => {
  const position = widget.ref?.getPosition();
  widget.ref?.close();
  return createDevWidget({ ...widget, position });
};

export const disableDevModeForWidget = (
  widget: CreateWidgetReturn
): CreateWidgetReturn => {
  const position = widget.ref?.getPosition();
  widget.ref?.close();
  return createWidget({ ...widget, position });
};

export function setDevMode(devMode: boolean) {
  const config = getConfiguration();
  config.widgets.devMode = devMode;
  saveConfiguration(config);
}

export function getMode(): boolean {
  const config = getConfiguration();
  return config.widgets.devMode;
}

export function saveWidgetInConfig(widgets: Array<ICreateWidget>) {
  const appConfig = getConfiguration();
  appConfig.widgets.active = widgets;
  saveConfiguration(appConfig);
}
