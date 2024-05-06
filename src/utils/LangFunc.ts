export async function getLanguage(): Promise<string | undefined> {
  try {
    const language = await window.ipcRenderer.invoke("get-language");
    return language;
  } catch (error) {
    console.error(`getLanguage failed: ${error}`);
    return undefined;
  }
}

export function setLanguage(lang: string): void {
  window.ipcRenderer.invoke("set-language", JSON.stringify({ language: lang }));
}
