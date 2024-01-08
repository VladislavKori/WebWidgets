import { BrowserWindow } from "electron";
import { CreateWidgetReturn } from "../../types/Process";

/**
 * Renderer Process notificator
 *
 * @description We send widgets in the process so that the front-end is updated on time.
 *
 * @param win Main window, where we send data
 * @param data An array of widgets that are currently running
 */
export async function processNotificate(
  win: BrowserWindow | null,
  data: CreateWidgetReturn[],
  allIsLock: boolean
): Promise<void> {
  // need fix this [START]
  let newdata = data.map((item) => {
    return {
      processId: item.processId,
      config: item.config,
      lock: item.lock,
      folderPath: item.folderPath,
    };
  });
  // need fix this [END]

  try {
    await win?.webContents.postMessage(
      "widgets-in-process",
      JSON.stringify({ allIsLock, wins: newdata })
    );
  } catch (err) {
    console.log("ERROR", err);
  }
}
