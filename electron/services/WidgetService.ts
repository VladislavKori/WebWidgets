import path from "node:path";
import uniqid from "uniqid";
import { BrowserWindow } from "electron";
import { CreateWidgetReturn, ICreateWidget } from "../../types/Process";

// @ts-ignore
import SWD from "../../packages/electron-swd";

type WidgetModes = "dev" | "default";

export function createWidget(params: ICreateWidget): CreateWidgetReturn {
  const { folderPath, config } = params;

  const widgetWindow = new BrowserWindow({
    width: Number(config.window.width),
    height: Number(config.window.height),
    transparent: true,
    frame: true,
    type: "toolbar",
    resizable: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  widgetWindow.on("blur", () => {
    widgetWindow.setBackgroundColor("#00000000");
  });

  widgetWindow.on("focus", () => {
    widgetWindow.setBackgroundColor("#00000000");
    SWD.toBottom(
      widgetWindow.getNativeWindowHandle().readUInt32LE().toString(16)
    );
  });

  widgetWindow.loadFile(path.join(folderPath + config.window.entryFile));

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
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  widgetWindow.loadFile(path.join(folderPath + config.window.entryFile));

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
  widget.ref?.close();
  return createDevWidget(widget);
};

export const disableDevModeForWidget = (
  widget: CreateWidgetReturn
): CreateWidgetReturn => {
  widget.ref?.close();
  return createWidget(widget);
};
