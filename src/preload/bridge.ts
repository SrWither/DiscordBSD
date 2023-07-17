import { contextBridge } from "electron";
import { screenPicker } from "./screenshare"

contextBridge.exposeInMainWorld("discordbsd", {
  screenPicker
});
