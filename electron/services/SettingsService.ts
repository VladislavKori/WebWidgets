import path from "path";
import { readFileSync } from "node:fs";

const isProdMode: boolean = import.meta.env.MODE === "production";
const prodFolderPath = isProdMode ? "../../app.asar.unpacked" : "../";
const configurationPath = path.join(__dirname,  prodFolderPath, "conf/app.config.json");

export function getWidgetsFolderPathsFromConfig(): string[] {
    const value: string = readFileSync(
        configurationPath,
        "utf8"
    );

    const config = JSON.parse(value);
    if (!("paths" in config)) return []; 

    return config.paths;
}