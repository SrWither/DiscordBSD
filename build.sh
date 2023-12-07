#!/bin/sh

echo "Need to elevate permissions to pack DiscordBSD. Do you want to execute the command with doas or sudo? (1 for doas, 2 for sudo)"
read -r option

case $option in
    1)
        discordbsd_perms_command="doas"
        ;;
    2)
        discordbsd_perms_command="sudo"
        ;;
    *)
        echo "Invalid option. Please enter 1 or 2."
        exit 1
        ;;
esac

if [ -f /usr/ports/Mk/Uses/electron.mk ]; then
    echo "electron.mk checked"
else
    echo "The file /usr/ports/Mk/Uses/electron.mk does not exist. Please get it from: https://github.com/tagattie/FreeBSD-Electron/tree/master/Mk/Uses"
fi

# build discord rpc
git submodule update --init --recursive
cd RPC
npm install
cd ..

# pack discordbsd
cd freebsd
$discordbsd_perms_command make makesum
$discordbsd_perms_command make
$discordbsd_perms_command  chmod -R 755 ./work/DiscordBSD-main/out/DiscordBSD-linux-x64/
cd ..

# move files
mkdir -p share/discordbsd
cp -r RPC share/discordbsd
cp -r freebsd/work/DiscordBSD-main/out/DiscordBSD-linux-x64 share/discordbsd/discord

echo "Done!"
