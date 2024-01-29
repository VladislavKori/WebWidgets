import { ipcMain } from "electron";
import osConfiguration from "./os";
import pathConfiguration from "./path";
import fsConfiguration from "./fs";

export const initNodeJSLibs = () => {
  createIPCfunctions(osConfiguration);
  createIPCfunctions(pathConfiguration);
  createIPCfunctions(fsConfiguration);
};

function createIPCfunctions(module: any) {
  for (const [key, value] of Object.entries(module.functions)) {
    const ipcName = module.name + "-" + key;
    ipcMain.handle(ipcName, (_, args: string) => {
      if (args) args = JSON.parse(args);

      let res;
      if (typeof value === "function") {
        try {
          res = value(args);
        } catch (err) {
          res = err;
        }
      }

      if (res !== undefined) return JSON.stringify(res);
    });
  }
}
