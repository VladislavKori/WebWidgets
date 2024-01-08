import path from "node:path";
import uniqid from "uniqid";
import { BrowserWindow } from "electron";
import { CreateWidgetReturn, ICreateWidget } from "../../types/Process";

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

  widgetWindow.loadFile(path.join(folderPath + config.window.entryFile));

  widgetWindow.setAlwaysOnTop(false, "modal-panel", 0);

  return {
    processId: uniqid(),
    config,
    lock: false,
    folderPath,
    ref: widgetWindow,
  };
}
