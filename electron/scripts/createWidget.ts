import { BrowserWindow } from "electron";

interface WidgetWindowProps {
  width: string;
  height: string;
  entryFile: string;
}

export const createWidgetWindow = (props: WidgetWindowProps) => {
  const widgetWindow = new BrowserWindow({
    width: Number(props.width),
    height: Number(props.height),
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

  widgetWindow.loadFile(props.entryFile);

  widgetWindow.setAlwaysOnTop(false, "modal-panel", 0);

  return widgetWindow;
};
