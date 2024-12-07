import { CustomTitlebar, TitlebarColor } from "../titlebar";
import { getConfig } from "../settings"
import { injectStyle } from "../utils"
import "./bridge";
import * as fs from "fs";
import * as path from "path";

const titlebarcolor = getConfig().titlebarcolor
const titlebar = getConfig().titlebar

if(titlebar) {
  window.addEventListener('DOMContentLoaded', () => {
    new CustomTitlebar({
      backgroundColor: TitlebarColor.fromHex(titlebarcolor),
      // menuPosition: 'bottom'
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const screenshareStyle = path.join(__dirname, "../assets/web/css/screenshare.css");
  injectStyle(fs.readFileSync(screenshareStyle, "utf8"));

  const contextmenuStyle = path.join(__dirname, "../assets/web/css/contextmenu.css")

  injectStyle(fs.readFileSync(contextmenuStyle, 'utf8'))
})
