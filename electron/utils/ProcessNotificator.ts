import { BrowserWindow } from "electron";
import { CreateWidgetReturn, IProcessWidget } from "../../types/Process";

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

  // Convert array of object into IProcessWidget[], so we only remove "ref" field
  let processedData: IProcessWidget[] = [...data.map(item => {
    const object: CreateWidgetReturn = Object.assign({}, item)
    delete object.ref;
    return object
  })]

  try {
    await win?.webContents.postMessage(
      "widgets-in-process",
      JSON.stringify({ allIsLock, wins: processedData })
    );
  } catch (err) {
    console.log("ERROR", err);
  }
}
