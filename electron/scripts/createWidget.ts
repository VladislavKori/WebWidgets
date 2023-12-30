import { BrowserWindow } from "electron";
import path from "node:path";
import uniqid from 'uniqid';

import { IWidget } from "../types/widget";

export const createWidgetWindow = (widgetDir: string, config: IWidget["config"]) => {
  const widgetWindow = new BrowserWindow({
    width: Number(config.window.width),
    height: Number(config.window.height),
    transparent: true,
    frame: false,
    type: "toolbar",
    resizable: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  widgetWindow.on("blur", () => {
    widgetWindow.setBackgroundColor("#00000000");
  });

  widgetWindow.on("focus", () => {
    widgetWindow.setBackgroundColor("#00000000");
  });

  widgetWindow.loadFile(path.join(widgetDir + config.window.entryFile));

  widgetWindow.setAlwaysOnTop(false, "modal-panel", 0);

  return {
    processId: uniqid(),
    widget: {
      path: widgetDir,
      config: config
    },
    ref: widgetWindow
  };
};
