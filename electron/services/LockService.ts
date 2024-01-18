import { CreateWidgetReturn } from "../../types/Process";

// @ts-ignore
import LWS from "../../packages/electron-lws";

export function changeLockStatusById(widget: CreateWidgetReturn): void {
  const state = widget.lock;

  widget.lock = !state;

  // widget.ref?.setIgnoreMouseEvents(!state);
  const hwnd = widget.ref?.getNativeWindowHandle().readUInt32LE().toString(16);
  console.log(hwnd);
  LWS.lockWindow(hwnd);
}

/**
 * Change lock status for all widgets
 *
 * @param widgets Array of process widgets
 * @param allIsLock boolean value to change the status to
 */
export function changeLockStatusForAll(
  widgets: CreateWidgetReturn[],
  allIsLock: boolean
): void {
  widgets.map((item) => {
    item.lock = allIsLock;
    let hwnd = item.ref?.getNativeWindowHandle().readUInt32LE().toString(16);
    LWS.lockWindow(hwnd);
  });
}
