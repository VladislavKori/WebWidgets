import { scanhWidgetFolders } from "./Scanner";
import type { IWidget } from "../../types/Widget";
import { getAllWidgetsFolderPaths } from "./FileServices";

/**
 * Return widgets, who installed on PC
 */
export function getInstalledWidgets(): IWidget[] {
  const installedWidgets: IWidget[] = [];
  let paths: string[] = getAllWidgetsFolderPaths();

  paths.map((item: string) => {
    installedWidgets.push(...scanhWidgetFolders(item));
  });

  return installedWidgets;
}

/**
 * install widget
 */
export function installWidget() {}
