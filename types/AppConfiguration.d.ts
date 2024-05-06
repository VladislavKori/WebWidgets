import type { LanguageType } from "./global";

export interface IAppConfiguration {
	language: LanguageType;
	autolunch: boolean;
	folders: string[]; 
}