const { EmbedBuilder } = require("discord.js");

module.exports = (client, member) => {
    const channel = client.channels.cache.get("1191796681738567810"); // Id of the welcome channel
    const jEmbed = new EmbedBuilder()
    .setTitle("New Member Joined !")
    .setDescription(`Welcome to the server, **${member.user.username}** !`)
    .setColor("Green")
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp()
    .setFooter({
      text: "By Yggdrasil-Bot | made by _Momonga_",
      iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
    });

    channel.send({ embeds: [jEmbed] });
};
