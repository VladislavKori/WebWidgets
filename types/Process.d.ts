import { BrowserWindow } from "electron";
import { IWidgetConfig } from "./global";

export interface ICreateWidget {
  config: IWidgetConfig;
  folderPath: string;
  position?: number[];
}

export interface CreateWidgetReturn {
  processId: string;
  config: IWidgetConfig;
  lock: boolean;
  folderPath: string;
  isDevMode: boolean;
  ref: BrowserWindow | undefined;
}

export type IProcessWidget = Omit<CreateWidgetReturn, "ref">;
