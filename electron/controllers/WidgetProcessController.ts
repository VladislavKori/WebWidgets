import { BrowserWindow, app, ipcMain } from "electron";
import { HubNotificate } from "../utils/HubNotificator";
import { IStore } from "../../types/Store";
import { createDevWidget, createWidget } from "../services/WidgetService";
import {
  IWidget,
  IWidgetForRenderProcess,
  WidgetParameters,
} from "../../types/Widget";
import { toBottom } from "electron-swd";

interface WidgetProcessControllerConstructor {
  hubWindow: BrowserWindow;
  store: IStore;
}

export class WidgetProcessController {
  private _hubWindow: BrowserWindow;
  private _store: IStore;

  constructor({ hubWindow, store }: WidgetProcessControllerConstructor) {
    this._hubWindow = hubWindow;
    this._store = store;
    this.init();
  }

  private init() {
    ipcMain.on("process-controller-notificate", () => {
      this.notificate();
    });

    ipcMain.on("launch-widget", (_, args: string) => {
      const { widgetId }: { widgetId: string } = JSON.parse(args);
      const results = this._store.installed.widgets.find(
        (widget) => widget.widgetId === widgetId
      );
      if (results === undefined) {
        throw new Error("Couldn't find widget");
      }
      const widgetObj: IWidget = results;
      const processWidgetObj = createWidget(widgetObj);
      this._store.process.widgets.push(processWidgetObj);

      // processWidgetObj.ref?.on("closed", () => {
      //   this._store.process.widgets = this._store.process.widgets.filter(
      //     (widget) => widget.id !== processWidgetObj.id
      //   );
      //   this.notificate();
      // });

      processWidgetObj.ref?.on("move", () => {
        const widget: IWidget = this._store.process.widgets.find(
          (widget) => widget.id === processWidgetObj.id
        );
        if (widget === undefined) return;
        const position = widget.ref?.getPosition();
        if (position && widget.parameters && widget.id) {
          widget.parameters.position.x = position[0];
          widget.parameters.position.y = position[1];
          this.notificateWidget(widget.id, widget.parameters);
        }
      });

      this.notificate();
    });

    ipcMain.on("stop-widget", (_, args: string) => {
      const { id }: { id: string } = JSON.parse(args);
      const result: IWidget = this._store.process.widgets.find(
        (widget) => widget.id === id
      );
      if (result === undefined) {
        throw new Error("Couldn't find widget");
      }

      result.ref?.close();
      this.notificate();
    });

    ipcMain.on("change-widget-position", (_, args: string) => {
      const {
        id,
        position,
      }: { id: string; position: { x: number; y: number } } = JSON.parse(args);

      const result: IWidget = this._store.process.widgets.find(
        (widget) => widget.id === id
      );
      if (result === undefined) {
        throw new Error("Couldn't find widget");
      }
      result.ref?.setPosition(position.x, position.y);
      this.notificate();
    });

    ipcMain.on("lock-widgets", (_, args: string) => {
      const { widgets }: { widgets: { id: string }[] } = JSON.parse(args);

      widgets.map((widget) => {
        const widgetId: string = widget.id;
        const findWidget: IWidget = this._store.process.widgets.find(
          (widget) => widget.id === widgetId
        );

        if (findWidget === undefined) return;
        if (findWidget.parameters === undefined) return;
        if (findWidget.ref === undefined) return;

        findWidget.parameters.locker = true;
        findWidget.ref.setMovable(false);
        this.notificateWidget(widgetId, findWidget.parameters);
      });
    });

    ipcMain.on("unlock-widgets", (_, args: string) => {
      const { widgets }: { widgets: { id: string }[] } = JSON.parse(args);
      widgets.map((widget) => {
        const widgetId: string = widget.id;
        const findWidget: IWidget = this._store.process.widgets.find(
          (widget) => widget.id === widgetId
        );

        if (findWidget === undefined) return;
        if (findWidget.parameters === undefined) return;
        if (findWidget.ref === undefined) return;

        findWidget.parameters.locker = false;
        findWidget.ref.setMovable(true);
        this.notificateWidget(widgetId, findWidget.parameters);
      });
    });

    ipcMain.on("enable-dev-mode", (_, args: string) => {
      const { widgets }: { widgets: { id: string }[] } = JSON.parse(args);
      widgets.map((widget) => {
        const widgetId: string = widget.id;
        let findWidget: IWidget = this._store.process.widgets.find(
          (widget) => widget.id === widgetId
        );

        if (findWidget === undefined) return;
        if (findWidget.parameters === undefined) return;
        if (findWidget.ref === undefined) return;

        const devWidget = createDevWidget(findWidget)
        findWidget.ref.close();
        findWidget.ref = devWidget.ref;

        this.notificateWidget(widgetId, findWidget.parameters);
      });
    });

    ipcMain.on("disable-dev-mode", (_, args: string) => {
      const { widgets }: { widgets: { id: string }[] | "all" } =
        JSON.parse(args);
      console.log(widgets);
      // find widget in process list
    });
  }

  private notificate() {
    // Convert array of object into IProcessWidget[], so we only remove "ref" field
    let processArray: IWidgetForRenderProcess[] = [
      ...this._store.process.widgets.map((item) => {
        const object: IWidget = Object.assign({}, item);
        delete object.ref;
        return object;
      }),
    ];

    HubNotificate(
      this._hubWindow,
      "listen-widgets-in-process",
      JSON.stringify(processArray)
    );
  }

  private notificateWidget(id: string, parameters: WidgetParameters) {
    HubNotificate(
      this._hubWindow,
      `listen-widget-${id}`,
      JSON.stringify({ id, ...parameters })
    );
  }
}
