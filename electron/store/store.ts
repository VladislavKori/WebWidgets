import { BrowserWindow } from "electron";

export class Store {
    private _hubWindow: BrowserWindow | undefined;

    public set hubWindow(hubWindow: BrowserWindow) {
        this._hubWindow = hubWindow;
    }

    public get hubWindow(): BrowserWindow | undefined {
        return this._hubWindow;
    }
} 