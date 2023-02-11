echo "Installing DiscordBSD"

mkdir -p ~/.local/bin
mkdir -p ~/.local/share/discordbsd
mkdir -p ~/.local/share/applications
mkdir -p ~/.local/share/icons

chmod +x bin/discord

cp -r RPC ~/.local/share/discordbsd
cp -r src ~/.local/share/discordbsd/discord
cp package.json ~/.local/share/discordbsd
cp bin/* ~/.local/bin
cp share/applications/* ~/.local/share/applications
cp share/icons/* ~/.local/share/icons

cd ~/.local/share/discordbsd
npm install
cd RPC
npm install

sed -i '' "s/Icon=discicon/Icon=\/home\/$USER\/.local\/share\/icons\/Discord.png/" ~/.local/share/applications/Discord.desktop

sed -i '' "s/Exec=executable/Exec=\/home\/$USER\/.local\/bin\/discord/" ~/.local/share/applications/Discord.desktop

echo "Done!"
