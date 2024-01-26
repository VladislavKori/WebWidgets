import path from "path";
import { readFileSync, writeFileSync } from "node:fs";
import { IAppConfig } from "../../types/Configuration";
import { app } from "electron";

const isProdMode: boolean = import.meta.env.MODE === "production";
const prodFolderPath = isProdMode ? "../../app.asar.unpacked" : "../";
const configurationPath = path.join(
  __dirname,
  prodFolderPath,
  "conf/app.config.json"
);

export function getConfiguration(): IAppConfig {
  let value: string;

  try {
    value = readFileSync(configurationPath, "utf8");
  } catch (err) {
    saveConfiguration({
      widgets: {
        devMode: false,
        active: [],
      },
      autolunch: true,
      language: "en",
      paths: [],
    });

    value = readFileSync(configurationPath, "utf8");
  }

  return JSON.parse(value);
}

export function saveConfiguration(configuration: IAppConfig): void {
  const value: string = JSON.stringify(configuration);
  writeFileSync(configurationPath, value);
}

export function getWidgetsFolderPathsFromConfig(): string[] {
  const config: any = getConfiguration();

  if (!("paths" in config)) return [];

  return config.paths;
}

export function addWidgetFolderPathToConfig(path: string): void {
  const avaiblePaths: string[] = getWidgetsFolderPathsFromConfig();
  if (avaiblePaths.includes(path)) return;

  const config = getConfiguration();
  config.paths.push(path);

  saveConfiguration(config);
}

export function removeWidgetFolderPathFromConfig(path: string): void {
  const avaiblePaths: string[] = getWidgetsFolderPathsFromConfig();
  if (!avaiblePaths.includes(path)) return;

  const config = getConfiguration();
  config.paths = avaiblePaths.filter((p: string) => p !== path);

  saveConfiguration(config);
}

export function enableAutoLunch(): void {
  app.setLoginItemSettings({
    openAtLogin: true,
  });

  const config = getConfiguration();
  config.autolunch = true;
  saveConfiguration(config);
}

export function disableAutoLunch(): void {
  app.setLoginItemSettings({
    openAtLogin: false,
  });

  const config = getConfiguration();
  config.autolunch = false;
  saveConfiguration(config);
}

export function getAutoLunchMode(): boolean {
  const config = getConfiguration();
  return config.autolunch;
}
