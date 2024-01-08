import { BrowserWindow } from "electron";
import { IWidgetConfig } from "./global";

export interface ICreateWidget {
  config: IWidgetConfig;
  folderPath: string;
}

export interface CreateWidgetReturn {
  processId: string;
  config: IWidgetConfig;
  lock: boolean;
  folderPath: string;
  ref: BrowserWindow;
}

export type IProcessWidget = Omit<CreateWidgetReturn, "ref">;
