import { contextBridge, ipcRenderer } from 'electron'
import { ConfigData } from "../settings"

contextBridge.exposeInMainWorld('dbsdsettings', {
  setConfig: (config: ConfigData) => ipcRenderer.send('set-config', config),
  getConfig: () => ipcRenderer.invoke('get-config')
})
