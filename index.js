const { app, BrowserWindow, Tray, Menu, desktopCapturer } = require('electron');
const path = require('path');
const userAgent =
    "Mozilla/5.0 (X11; CrOS x86_64 13982.82.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.157 Safari/537.36";


// Disable Menu

Menu.setApplicationMenu(false)

// Win - Icons Var
var splash
var win = '',
    appIcon = null,
    iconpath = path.join(__dirname, 'assets/icon.png');

// Create WIndow

function createWindow() {

    // New Window

    win = new BrowserWindow({
        width: 1280,
        height: 720,
        show: false,
        // frame: false, // Disable appmenu
        webPreferences: {
            nodeIntegration: true
        },
        icon: path.join(__dirname, 'assets/icon.png'),
        title: 'Discord',
    });

    // Tray

    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Open Discord', click: function () {
                win.show()
            }
        },
        {
            label: 'Quit', click: function () {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);

    appIcon = new Tray(iconpath);
    appIcon.setContextMenu(contextMenu);

    // Close Window

    win.on('close', function (event) {
        if (!app.isQuiting) {
            event.preventDefault();
            win.hide();
        }

        return false;
    });

    //Splash
    splash = new BrowserWindow({ width: 650, height: 450, transparent: true, frame: false, alwaysOnTop: true });
    splash.loadFile("boot.html");
    // Load Discord
    win.webContents.setUserAgent(userAgent);
    win.loadURL('https://discord.com/app');

    win.once('ready-to-show', () => {
        splash.destroy();
        win.show();
    });
}

app.on('ready', createWindow);