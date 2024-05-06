const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ipcRenderer", withPrototype(ipcRenderer));

function withPrototype(obj: Record<string, any>) {
  const protos = Object.getPrototypeOf(obj);

  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) continue;

    if (typeof value === "function") {
      // Some native APIs, like `NodeJS.EventEmitter['on']`, don't work in the Renderer process. Wrapping them into a function.
      obj[key] = function (...args: any) {
        return value.call(obj, ...args);
      };
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

contextBridge.exposeInMainWorld("os", {
  arch: async () => JSON.parse(await ipcRenderer.invoke("os-arch")),
  constants: async () => JSON.parse(await ipcRenderer.invoke("os-constants")),
  cpus: async () => JSON.parse(await ipcRenderer.invoke("os-cpus")),
  freemem: async () => JSON.parse(await ipcRenderer.invoke("os-freemem")),
  homedir: async () => JSON.parse(await ipcRenderer.invoke("os-homedir")),
  hostname: async () => JSON.parse(await ipcRenderer.invoke("os-hostname")),
  machine: async () => JSON.parse(await ipcRenderer.invoke("os-machine")),
  release: async () => JSON.parse(await ipcRenderer.invoke("os-release")),
  totalmem: async () => JSON.parse(await ipcRenderer.invoke("os-totalmem")),
  type: async () => JSON.parse(await ipcRenderer.invoke("os-type")),
  uptime: async () => JSON.parse(await ipcRenderer.invoke("os-uptime")),
  userInfo: async () => JSON.parse(await ipcRenderer.invoke("os-userInfo")),
  version: async () => JSON.parse(await ipcRenderer.invoke("os-version")),
});

contextBridge.exposeInMainWorld("path", {
  basename: async (path: string, suffix?: string) =>
    JSON.parse(
      await ipcRenderer.invoke(
        "path-basename",
        JSON.stringify({ path, suffix })
      )
    ),
  delimiter: async () => JSON.parse(await ipcRenderer.invoke("path-delimiter")),
  dirname: async (path: string) =>
    JSON.parse(
      await ipcRenderer.invoke("path-dirname", JSON.stringify({ path }))
    ),
  extname: async (path: string) =>
    JSON.parse(
      await ipcRenderer.invoke("path-extname", JSON.stringify({ path }))
    ),
  isAbsolute: async (path: string) =>
    JSON.parse(
      await ipcRenderer.invoke("path-isAbsolute", JSON.stringify({ path }))
    ),
  join: async (...paths: Array<string>) =>
    JSON.parse(
      await ipcRenderer.invoke("path-join", JSON.stringify({ paths }))
    ),
  normalize: async (path: string) =>
    JSON.parse(
      await ipcRenderer.invoke("path-normalize", JSON.stringify({ path }))
    ),
  parse: async (path: string) =>
    JSON.parse(
      await ipcRenderer.invoke("path-parse", JSON.stringify({ path }))
    ),
  relative: async (from: string, to: string) =>
    JSON.parse(
      await ipcRenderer.invoke("path-relative", JSON.stringify({ from, to }))
    ),
  resolve: async (...paths: Array<string>) =>
    JSON.parse(
      await ipcRenderer.invoke("path-resolve", JSON.stringify({ paths }))
    ),
  sep: async () => JSON.parse(await ipcRenderer.invoke("path-sep")),
});

contextBridge.exposeInMainWorld("fs", {
  //  Проверка доступности, Создание папки
  readFile: async (path: string) => JSON.parse(
      await ipcRenderer.invoke(
        "fs-readFile",
        JSON.stringify({
          path
        })
      )
    ),
  writeFile: async (path: string, data: string) => {
    const result = await ipcRenderer.invoke(
      "fs-writeFile",
      JSON.stringify({
        path, data
      })
    )
    if (result !== undefined) return JSON.parse(result)
  },
  rm: async (path: string) => {
    const result = await ipcRenderer.invoke("fs-rm", JSON.stringify({ path }))
    if (result !== undefined) return JSON.parse(result)
  },
  exists: async (path: string) => JSON.parse(await ipcRenderer.invoke("fs-exists", JSON.stringify({ path }))),
  mkdir: async (path: string) => {
    const result = await ipcRenderer.invoke("fs-mkdir", JSON.stringify({ path }))
    if (result!== undefined) return JSON.parse(result)
  },
  readdir: async (path: string) => JSON.parse(await ipcRenderer.invoke("fs-readdir", JSON.stringify({ path }))),
})
