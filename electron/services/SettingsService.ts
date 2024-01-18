import path from "path";
import { readFileSync, writeFileSync } from "node:fs";
import { IAppConfig } from "../../types/Configuration";

const isProdMode: boolean = import.meta.env.MODE === "production";
const prodFolderPath = isProdMode ? "../../app.asar.unpacked" : "../";
const configurationPath = path.join(__dirname,  prodFolderPath, "conf/app.config.json");

export function getConfiguration(): IAppConfig {
    const value: string = readFileSync(
        configurationPath,
        "utf8"
    );

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
    config.paths = avaiblePaths.filter((p: string) => p!== path);
    
    saveConfiguration(config);
}