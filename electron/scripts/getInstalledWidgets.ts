import path from "node:path";
import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";

export const getInstalledWidgets = async () => {
  // while we use this path for widgets folder
  const widgetsFolder = path.join(__dirname, "../Widgets");

  const returnedWidgets = [];

  const dirs: Array<string> = await readdir(widgetsFolder);
  if (dirs.length === 0) return [];

  for (const dirName of dirs) {
    const widgetFolder = path.join(widgetsFolder, dirName);
    const widgetStartFile = path.join(widgetFolder, "index.json");
    const isExist = existsSync(widgetStartFile);
    if (!isExist) continue;

    const fileContent: string = await readFile(widgetStartFile, "utf8");
    if (!validateWidgetEntryFile(fileContent)) continue;

    returnedWidgets.push({
      path: widgetFolder,
      config: JSON.parse(fileContent),
    });
  }

  return returnedWidgets;
};

const validateWidgetEntryFile = (file: string): boolean => {
  return true;
};
