import { BrowserWindow } from "electron";

export async function HubNotificate(hubWin: BrowserWindow, route: string, data: string): Promise<void> {
    try {
      await hubWin.webContents.postMessage(route, data);
    } catch (error) {
      console.log(`notificate: HubNotificator: ${route}`, error);
    }
}
