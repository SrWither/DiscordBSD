import { CustomTitlebar, TitlebarColor } from "../titlebar";
import { injectStyle } from "../utils"
import "./bridge";
import * as fs from "fs";
import * as path from "path";


window.addEventListener('DOMContentLoaded', () => {
  new CustomTitlebar({
    backgroundColor: TitlebarColor.fromHex('#6538b9'),
    // menuPosition: 'bottom'
  })
})

document.addEventListener('DOMContentLoaded', () => {
  const screenshareStyle = path.join(__dirname, "../assets/web/css/screenshare.css");
  injectStyle(fs.readFileSync(screenshareStyle, "utf8"));
})
