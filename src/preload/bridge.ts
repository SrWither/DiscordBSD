import { contextBridge, ipcRenderer } from "electron";
import { screenPicker } from "./screenshare"

contextBridge.exposeInMainWorld("discordbsd", {
  screenPicker,
  downloadFile: (fileUrl: string) => ipcRenderer.invoke('download-file', fileUrl)
});
