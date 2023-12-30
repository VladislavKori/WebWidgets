import { modalWindows } from '../main'

export const lockAllWidgets = () => {
    modalWindows.map((item) => {
        item.ref.setIgnoreMouseEvents(true);
    });
}

export const unlockAllWidgets = () => {
    modalWindows.map((item) => {
        item.ref.setIgnoreMouseEvents(false);
    });
}