import type { LanguageType } from "./global";

export interface IAppConfiguration {
	language: LanguageType;
	autolaunch: boolean;
	folders: string[]; 
}