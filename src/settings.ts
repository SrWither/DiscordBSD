import {BrowserWindow, ipcMain} from "electron";
import * as fs from "fs";
import * as path from "path";

export const configPath =
    path.join(require("os").homedir(), ".config", "DiscordBSD");
export const filePath = path.join(configPath, "config.json");

export interface ConfigData {
  titlebar: boolean;
  titlebarcolor: string;
}

/**
 * Class representing DiscordBSD settings window.
 * This class is responsible for managing the window that allows users to
 * configure DiscordBSD settings.
 */
export class DiscordSettings {
  private static instance: DiscordSettings | null = null;
  private win: BrowserWindow | null = null;

  /**
   * Create a new DiscordSettings instance.
   * Initializes a BrowserWindow for DiscordBSD settings with specified
   * configurations. Also, sets up event handlers for setting and getting
   * configuration data.
   */
  constructor() {
    this.createWindow()
    // Load HTML file for settings window
    this.win.loadFile(path.join(__dirname, "assets/web/html/settings.html"));

    if (this.win) {
      this.win.on("closed", () => {
        this.unregisterIpcHandlers();
        this.win = null;
      });
    }

    // Event handler for setting configuration data
    ipcMain.on("set-config",
               (_event, config: ConfigData) => { setConfig(config); });

    // Event handler for getting configuration data
    ipcMain.handle("get-config", (_event) => {
      let config = getConfig();
      return config;
    });
  }

  private createWindow() {
    this.win = new BrowserWindow({
      title : "DiscordBSD Settings",
      width : 640,
      height : 480,
      alwaysOnTop : true,
      webPreferences : {
        sandbox : false,
        preload : path.join(__dirname, "preload/settingspl.js"),
      },
    });

    if (this.win) {
      this.win.on("closed", () => {
        this.unregisterIpcHandlers();
        this.win = null;
      });
    }
  }

  private unregisterIpcHandlers() {
    // Desvincular los event listeners para evitar pérdida de memoria
    ipcMain.removeHandler("get-config");
    ipcMain.removeHandler("set-config");
  }

  public static getInstance() {
    if (!DiscordSettings.instance || !DiscordSettings.instance.win) {
      DiscordSettings.instance = new DiscordSettings();
    }
    return DiscordSettings.instance;
  }
  /**
   * Show the DiscordBSD settings window.
   * This method displays the window that allows users to configure DiscordBSD
   * settings.
   */
  public show() {
    if (!this.win) {
      this.createWindow();
    }
    this.win?.show();
  }
  /**
   * Close and destroy the DiscordBSD settings window.
   * This method closes and destroys the window used for configuring DiscordBSD
   * settings.
   */
  public close() {
    this.win?.destroy();
  }
}

/**
 * Set configuration data for DiscordBSD to the specified file path.
 * @param data - Configuration data to be set for DiscordBSD.
 */
export const setConfig = (data: ConfigData) => {
  // Convert the configuration data to a JSON string with formatting
  const jsonData = JSON.stringify(data, null, 2);
  // Write the JSON data to the configuration file
  fs.writeFileSync(filePath, jsonData, "utf-8");
};

/**
 * Get configuration data for DiscordBSD from the specified file path.
 * @returns Configuration data if successful, otherwise null.
 */
export const getConfig = (): ConfigData|null => {
  initializeConfig()
  try {
    // Read the JSON data from the configuration file
    const jsonData = fs.readFileSync(filePath, "utf-8");
    // Parse the JSON data to obtain the configuration for DiscordBSD
    return JSON.parse(jsonData);
  } catch (error) {
    // Handle errors, such as when the configuration file is not found or is
    // invalid
    console.error("Error loading data:", error.message);
    return null;
  }
};

export const initializeConfig = () => {
  if (!fs.existsSync(filePath)) {
    const initialData: ConfigData = {
      titlebar : false,
      titlebarcolor : "#6538b9",
    };
    setConfig(initialData);
  }
}
