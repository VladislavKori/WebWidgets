import path from "path";
import { readFileSync } from "node:fs";

const configurationPath = path.join(__dirname, "../conf/app.config.json");

export function getWidgetsFolderPathsFromConfig(): string[] {
    const value: string = readFileSync(
        configurationPath,
        "utf8"
    );

    const config = JSON.parse(value);
    if (!("paths" in config)) return []; 

    return config.paths;
}