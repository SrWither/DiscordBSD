import { BrowserWindow } from "electron";
import * as path from "path";

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
    this.win.loadFile(path.join(__dirname, "assets/web/html/splash.html"));
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
