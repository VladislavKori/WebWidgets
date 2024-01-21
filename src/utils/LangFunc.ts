export async function getLanguage(): Promise<string> {
  const language = await window.ipcRenderer.invoke("get-language");
  return language;
}

export function setLanguage(lang: string): void {
  window.ipcRenderer.invoke("set-language", JSON.stringify({ language: lang }));
}
