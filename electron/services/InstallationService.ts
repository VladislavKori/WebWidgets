import path from "node:path";
import { searchWidgetInFolder } from "./SearchService";
import { SearchWidgetReturn } from "../../types/Installation";

/**
 * Return widgets, who installed on PC
 */
export function getInstalledWidgets(): SearchWidgetReturn[] {
  const installedWidgets: SearchWidgetReturn[] = [];
  let paths = [path.join(__dirname, "../Widgets")];

  paths.map((item: string) => {
    installedWidgets.push(...searchWidgetInFolder(item));
  });

  return installedWidgets;
}

/**
 * install widget
 */
export function installWidget() {}
