#!/usr/bin/env bash

echo "Need to elevate permissions to pack DiscordBSD. Do you want to execute the command with doas or sudo?"
select option in "doas" "sudo"; do
    case $option in
        doas)
            discordbsd_perms_command="doas"
            break
            ;;
        sudo)
            discordbsd_perms_command="sudo"
            break
            ;;
        *)
            echo "Invalid option. Please select 1 or 2."
            ;;
    esac
done

if [[ -f /usr/ports/Mk/Uses/electron.mk ]]; then
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
cd ..

# move files
mkdir -p share/discordbsd
cp -r RPC share/discordbsd
cp -r freebsd/work/DiscordBSD-main/dist/linux-unpacked share/discordbsd/discord

echo "Done!"
