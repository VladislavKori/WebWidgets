import { CreateWidgetReturn } from "../../types/Process";

// @ts-ignore
import SWD from "../../packages/electron-swd";

export function changeLockStatusById(widget: CreateWidgetReturn): void {
  const state = widget.lock;

  widget.lock = !state;

  widget.ref?.setMovable(state);
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
    item.ref?.setMovable(!allIsLock);
  });
}
