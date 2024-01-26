export interface IAppConfig {
  widgets: {
    devMode: boolean;
  };
  autolunch: boolean;
  language: "en" | "ru";
  paths: string[];
}
