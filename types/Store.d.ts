export interface IStore {
    installed: {
        widgets: IWidget[];
    };
    process: {
        widgets: IWidget[];
    }
}