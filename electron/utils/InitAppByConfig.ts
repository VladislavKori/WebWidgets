import {
  disableAutoLunch,
  enableAutoLunch,
  getConfiguration,
} from "../services/SettingsService";

export function InitAppByConfig() {
  const config = getConfiguration();

  // Set autolunch
  if (config.autolunch) enableAutoLunch();
  else disableAutoLunch();
}
