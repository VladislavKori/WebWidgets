export interface IAppConfig {
  widgets: {
    devMode: boolean;
  };
  language: "en" | "ru";
  paths: string[];
}
