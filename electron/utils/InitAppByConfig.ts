import Store from "../controllers/StoreController";
import { initNodeJSLibs } from "../libs";
import {
  disableAutoLunch,
  enableAutoLunch,
  getConfiguration,
} from "../services/SettingsService";
import { createDevWidget, createWidget } from "../services/WidgetService";

export function InitAppByConfig({ store }: { store: Store }) {
  const config = getConfiguration();

  // Set autolunch
  if (config.autolunch) enableAutoLunch();
  else disableAutoLunch();

  config.widgets.active.map((widget) => {
    const newWidget = config.widgets.devMode
      ? createDevWidget(widget)
      : createWidget(widget);

    // Add widget in global store
    store.widgetsInProcess = [...store.widgetsInProcess, newWidget];
  });

  // Init Support for NodeJS Libs
  initNodeJSLibs();
}
