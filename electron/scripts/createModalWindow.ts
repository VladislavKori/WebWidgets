import { BrowserWindow } from "electron";

export const createModalWindow = () => {
  const widgetWindow = new BrowserWindow({
    width: 155,
    height: 155,
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

  widgetWindow.loadFile("./AppleTV/index.html");

  widgetWindow.setAlwaysOnTop(false, "modal-panel", 0);

  return widgetWindow;
};
