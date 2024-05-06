export async function getLanguage(): Promise<string | undefined> {
  try {
    const language = await window.ipcRenderer.invoke("get-language");
    return language.lang;
  } catch (error) {
    console.error(`getLanguage failed: ${error}`);
    return undefined;
  }
}