/// <reference types="vite-plugin-electron/electron-env" />
/// <reference path="../packages/electron-swd/index.d.ts" />

declare namespace NodeJS {
  interface ProcessEnv {
    DIST: string;
    VITE_PUBLIC: string;
  }
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer: import("electron").IpcRenderer;
}
