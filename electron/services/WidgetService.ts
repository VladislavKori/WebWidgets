import path from "node:path";
import uniqid from "uniqid";
import openExplorer from "open-file-explorer";
import { BrowserWindow } from "electron";
import { CreateWidgetReturn, ICreateWidget } from "../../types/Process";
import { getWidgetsFolderPathsFromConfig } from "./SettingsService";

// @ts-ignore
import SWD from "../../packages/electron-swd";

const isProdMode: boolean = import.meta.env.MODE === "production";

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

  widgetWindow.on("ready-to-show", () => {
    const hwnd = widgetWindow
      .getNativeWindowHandle()
      .readUInt32LE()
      .toString(16);
    SWD.toBottom(hwnd);
    SWD.initListener(hwnd);
  });

  widgetWindow.loadFile(path.join(folderPath + config.window.entryFile));

  return {
    processId: uniqid(),
    config,
    lock: false,
    folderPath,
    ref: widgetWindow,
  };
}

export function getDefaultWidgetsFolderPath(): string {
  const prodFolderPath = isProdMode ? "../../app.asar.unpacked" : "../";
  const folder: string = path.join(__dirname, prodFolderPath, "Widgets");
  return folder;
}

export function getAllWidgetsFolderPaths(): string[] {
  const paths: string[] = getWidgetsFolderPathsFromConfig();
  const defaultFolderPath: string = getDefaultWidgetsFolderPath();
  return [defaultFolderPath, ...paths];
}

export function openFolderInFileExplorer(path: string): void {
  openExplorer(path, (err) => {
    console.error("Open folder error", err);
  });
}
