import { BrowserWindow, Menu, Tray, nativeImage, shell, ipcMain, desktopCapturer } from "electron";
import { Splash } from "./splash";
import { DiscordSettings, getConfig } from "./settings";
import { setupTitlebar, attachTitlebarToWindow } from "./titlebar/main";
import { screenshareScript } from "./preload/screenshare"
import * as path from "path";
import * as fs from "fs";
import * as os from "os";

const titlebarIsEnabled = getConfig().titlebar

Menu.setApplicationMenu(null);
if(titlebarIsEnabled) {
  setupTitlebar();
}

export class MainApp {
  private win: BrowserWindow;
  private app: Electron.App;
  private userAgent: string;
  private icons: { [key: string]: string };
  private systemTray: Tray;
  private rpc: string;
  private splash: Splash;

  /**
   * Constructs the main application.
   * @param app The Electron app instance.
   */
  constructor(app: Electron.App) {
    this.app = app;
    this.userAgent = `Mozilla/5.0 (X11; ${
      os.type
    } ${os.arch()}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36`;
    this.icons = {
      main: path.join(__dirname, "assets/icons/main.png"),
      tray: path.join(__dirname, "assets/icons/tray.png"),
    };
    this.rpc = fs
      .readFileSync(path.join(__dirname, "assets/web/js/rpc.js"))
      .toString();
    this.splash = new Splash();
  }

  /**
   * Creates the tray menu.
   */
  private createTrayMenu() {
    const menu = Menu.buildFromTemplate([
      {
        label: "Open Discord",
        click: () => {
          this.win.show();
        },
      },
      {
        label: "Settings",
        click: () => {
          new DiscordSettings().show();
        },
      },
      {
        label: "Quit",
        click: () => {
          this.win.destroy();
          this.app.quit();
        },
      },
    ]);

    const trayIcon = nativeImage.createFromPath(this.icons.tray);
    this.systemTray = new Tray(trayIcon);
    this.systemTray.setContextMenu(menu);
    this.systemTray.setIgnoreDoubleClickEvents(true);
  }

  /**
   * Creates the main browser window.
   */
  private createWindow() {
    this.win = new BrowserWindow({
      title: "Discord",
      width: 1280,
      height: 720,
      show: false,
      icon: this.icons.main,
      titleBarStyle: titlebarIsEnabled ? "hidden" : "default",
      frame: !titlebarIsEnabled,
      webPreferences: {
        sandbox: false,
        preload: path.join(__dirname, "preload/preload.js"),
      },
    });
    this.win.webContents.setUserAgent(this.userAgent);
    this.win.loadURL("https://discord.com/app");
    if(titlebarIsEnabled) {
      attachTitlebarToWindow(this.win);
    }
  }

  /**
   * Handles the window close event.
   */
  private windowEvents() {
    // hide window
    this.win.on("close", (event: Event) => {
      event.preventDefault();
      this.win.hide();
    });

    // Open links in the browser.
    this.win.webContents.setWindowOpenHandler(
      ({ url }) => {
        shell.openExternal(url);
        return { action: "deny" };
      }
    );
  }

  /**
   * Handles tray click events.
   */
  private trayEvents() {
    this.systemTray.on("click", () => {
      if (!this.win.isVisible()) {
        this.win.show();
      }
      this.win.focus();
    });
  }

  private ipcEvents() {
    ipcMain.handle("screenshare-get-sources", (_event, opts) => desktopCapturer.getSources(opts));
  }

  /**
   * Starts the main application.
   */
  public start() {
    // Show the splash screen.
    this.splash.show();

    // Create window
    this.createWindow();

    // Close splash screen and setup events.
    this.win.once("ready-to-show", () => {
      this.splash.close();
      this.ipcEvents();
      this.createTrayMenu();
      this.windowEvents();
      this.trayEvents();
      this.win.show();
      this.win.webContents.executeJavaScript(this.rpc);
      this.win.webContents.executeJavaScript(screenshareScript);
    });

    // Handle the activate event to recreate the main window if all windows are closed.
    this.app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow();
      }
    });
  }
}
