import { app } from "electron";
import { MainApp } from "./app";

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
