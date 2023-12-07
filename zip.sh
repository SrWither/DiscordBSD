#!/bin/sh

printf "DiscordBSD version: "; read version

name_zip="DiscordBSD.$version.zip"
zip -r "$name_zip" install.sh bin share

echo "done!"
