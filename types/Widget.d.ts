import type { BrowserWindow } from "electron";
import type { Modes, Position } from "./global";

export interface IWidget {
	id?: string; // process id
	widgetId: string;
	folderPath: string;
	ref?: BrowserWindow;
	config: IWidgetConfig;
	parameters?: WidgetParameters
}

export type WidgetParameters = {
	locker: boolean;
	mode: Modes;
	position: Position;
}

export type IWidgetForRenderProcess = Omit<IWidget, "ref">

export interface IWidgetConfig {
	name: string;
	description?: string;
	author?: IAuthor;
	preview?: string;
	screenshots?: string[];
	window : IWindow; 
}

export interface IAuthor {
	name?: string;
	surname?: string;
	link?: string;
	avatar?: string;
}

export interface IWindow {
	width: number;
	height: number;
	entryFile: string; 
}