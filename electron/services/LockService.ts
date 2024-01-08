import { CreateWidgetReturn } from "../../types/Process";

export function changeLockStatusById(widget: CreateWidgetReturn): void {
  const state = widget.lock;

  widget.lock = !state;
  widget.ref.setIgnoreMouseEvents(!state);
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
    console.log("locker ", item.ref, allIsLock);
    console.log("locker1 ", widgets);
    item.ref.setIgnoreMouseEvents(allIsLock);
  });
}
