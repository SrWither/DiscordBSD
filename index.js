const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

// Disable Menu

Menu.setApplicationMenu(false)

// Win - Icons Var

var win = '',
    appIcon = null,
    iconpath = path.join(__dirname, 'assets/icon.png');

// Create WIndow

function createWindow() {

    // New Window

    win = new BrowserWindow({
        width: 1280,
        height: 720,
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

    // Load Discord

    win.loadURL('https://discord.com/app');
}

app.on('ready', createWindow);