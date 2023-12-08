import { app } from "electron";
import { MainApp } from "./app";
import * as fs from "fs";
import { setConfig, filePath, configPath, ConfigData, initializeConfig } from "./settings";

if (!fs.existsSync(configPath)) {
  fs.mkdirSync(configPath, { recursive: true });
}

initializeConfig();

app.whenReady().then(() => {
  // Create an instance of MainApp and start the application
  const discord = new MainApp(app);
  discord.start();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
