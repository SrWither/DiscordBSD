import { BrowserWindow, shell } from "electron";
import * as path from "path";
import { getConfig } from './settings'

const oldSplash = getConfig().oldSplashScreen


export class Splash {
  private win: BrowserWindow;

  constructor() {
    // Create a new browser window for the splash screen.
    this.win = new BrowserWindow({
      title: "Discord",
      width: 650,
      height: 450,
      transparent: true,
      frame: false,
      alwaysOnTop: true,
    });

    // Load the HTML file for the splash screen.
    if(!oldSplash){
      this.win.loadFile(path.join(__dirname, "assets/web/html/splash.html"));
    } else {
      this.win.loadFile(path.join(__dirname, "assets/web/html/oldsplash.html"));
    }
    this.win.webContents.setWindowOpenHandler(
      ({ url }) => {
        shell.openExternal(url);
        return { action: "deny" };
      }
    );
  }

  /**
   * Show splash screen.
   */
  public show() {
    this.win.show();
  }

  /**
   * Close splash screen.
   */
  public close() {
    this.win.destroy();
  }
}
