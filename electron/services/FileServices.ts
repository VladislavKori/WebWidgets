import { getWidgetsFolderPathsFromConfig } from "./SettingsService";
import openExplorer from "open-file-explorer";
import path from "node:path";
import { dialog } from "electron";

const isProdMode: boolean = import.meta.env.MODE === "production";

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

export async function openDialogForSelectFolder(): Promise<Array<string>> {
  return await dialog
    .showOpenDialog({
      properties: ["openDirectory"],
    })
    .then((data) => data.filePaths);
}
