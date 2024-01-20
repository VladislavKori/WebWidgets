import { searchWidgetInFolder } from "./SearchService";
import { SearchWidgetReturn } from "../../types/Installation";
import { getAllWidgetsFolderPaths } from "./FileServices";

/**
 * Return widgets, who installed on PC
 */
export function getInstalledWidgets(): SearchWidgetReturn[] {
  const installedWidgets: SearchWidgetReturn[] = [];
  let paths: string[] = getAllWidgetsFolderPaths();

  paths.map((item: string) => {
    installedWidgets.push(...searchWidgetInFolder(item));
  });

  return installedWidgets;
}

/**
 * install widget
 */
export function installWidget() {}
