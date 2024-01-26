import { ICreateWidget } from "./Process";

export interface IAppConfig {
  widgets: {
    devMode: boolean;
    active: Array<ICreateWidget>;
  };
  autolunch: boolean;
  language: "en" | "ru";
  paths: string[];
}
