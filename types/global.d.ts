export interface IWidgetConfig {
  name: string;
  description: string;
  author: string;
  preview: string;
  window: {
    width: string;
    height: string;
    entryFile: string;
  };
}

export interface IWidgetInProcess {
  processId: string;
  ref: any;
  lock: boolean;
  widget: {
    path: string;
    config: {
      name: string;
      description: string;
      author: string;
      preview: string;
      window: {
        width: string;
        height: string;
        entryFile: string;
      };
    };
  };
}
