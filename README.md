# DiscordBSD
An attempt at a native discord client for FreeBSD.

### Build Dependencies:
```
pkg install electron25
pkg install node20
pkg install npm-node20
electron.mk (/usr/ports/Mk/Uses/electron.mk)
```
get `electron.mk` here: https://github.com/tagattie/FreeBSD-Electron/tree/master/Mk/Uses

### Download:
you can download DiscordBSD from the releases: https://github.com/SrWither/DiscordBSD/releases/

### Build and install:
clone the repository:
```
git clone https://github.com/SrWither/DiscordBSD
```

first you need to run the `build.sh` script.
the script will ask you to elevate permissions to be able to package the application in a binary, the permissions are due to the use of `bsd.mk`.

if everything compiled without errors, run the `install.sh` script.

# Preview
### Overview and custom titlebar
![image](https://github.com/SrWither/DiscordBSD/assets/59105868/d4934fc8-e169-4e6c-8a1e-01b1f90dc203)
_the color scheme is from discord nitro_

#### You can customize the titlebar
![image](https://github.com/SrWither/DiscordBSD/assets/59105868/dd67be06-11fd-4004-b2d8-455d548a6977)

### System tray
![image](https://github.com/SrWither/DiscordBSD/assets/59105868/dcd3c999-4321-452c-bb8d-1ed7aadfa620)

_if you click on the icon, it will focus on the window_

### Discord Rich Presence
![image](https://github.com/SrWither/DiscordBSD/assets/59105868/7f097273-7e21-4e66-b1f0-5cd33768b397)

### Screenshare
![image](https://github.com/SrWither/DiscordBSD/assets/59105868/e9124e61-dbc3-416f-812a-10ac5257738d)
_no sound for now_

### Desktop Notifications
![image](https://github.com/SrWither/DiscordBSD/assets/59105868/18fc3cb0-2223-49c4-a1ce-a997e12b3f8c)
_you have to activate them there_

### Splash Screen
![Boot](https://user-images.githubusercontent.com/59105868/133003303-f491b628-0c66-4449-94f6-ed9d7f8d4f8a.gif)
