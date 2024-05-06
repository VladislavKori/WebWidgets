import path, { dirname } from "path";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import type { IAppConfiguration } from "../../types/AppConfiguration";
import { app } from "electron";

const isProdMode: boolean = import.meta.env.MODE === "production";
const prodFolderPath = isProdMode ? "../../app.asar.unpacked" : "../";
const configurationPath = path.join(
  __dirname,
  prodFolderPath,
  "conf/app.config.json"
);

export function getConfiguration(): IAppConfiguration {
  let value: string;
  
  try {
    value = readFileSync(configurationPath, "utf8");
  } catch (err) {
    saveConfiguration({
      autolaunch: true,
      language: "en",
      folders: [],
    });

    value = readFileSync(configurationPath, "utf8");
  }

  return JSON.parse(value);
}

export function saveConfiguration(configuration: IAppConfiguration): void {
  const value: string = JSON.stringify(configuration);

  const confDir = dirname(configurationPath)

  if (!existsSync(confDir)) {
    mkdirSync(confDir, { recursive: true });
  }
  writeFileSync(configurationPath, value);
}

export function getWidgetsFolderPathsFromConfig(): string[] {
  const config: any = getConfiguration();

  if (!("folders" in config)) return [];

  return config.folders;
}

export function addWidgetFolderPathToConfig(path: string): void {
  const avaiblePaths: string[] = getWidgetsFolderPathsFromConfig();
  if (avaiblePaths.includes(path)) return;

  const config = getConfiguration();
  config.folders.push(path);

  saveConfiguration(config);
}

export function removeWidgetFolderPathFromConfig(path: string): void {
  const avaiblePaths: string[] = getWidgetsFolderPathsFromConfig();
  if (!avaiblePaths.includes(path)) return;

  const config = getConfiguration();
  config.folders = avaiblePaths.filter((p: string) => p !== path);

  saveConfiguration(config);
}

export function enableAutolaunch(): void {
  app.setLoginItemSettings({
    openAtLogin: true,
  });

  const config = getConfiguration();
  config.autolaunch = true;
  saveConfiguration(config);
}

export function disableAutolaunch(): void {
  app.setLoginItemSettings({
    openAtLogin: false,
  });

  const config = getConfiguration();
  config.autolaunch = false;
  saveConfiguration(config);
}
