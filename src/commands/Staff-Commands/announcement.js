const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "announcement",
  description: "Sends a message to the announcements channel.",
  options: [
    {
      name: "message",
      description: "The message you want to send in the announcements channel.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.KickMembers],
  botPermissions: [PermissionFlagsBits.KickMembers],
  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
    const message =
      interaction.options.get("message")?.value || "No message provided";

    await interaction.deferReply();

    const channel = client.channels.cache.get("1186757453262639215"); // Id of the announcements channel
    const aEmbed = new EmbedBuilder()
      .setColor("Gold")
      .setTitle(
        "__**The Skeleton Knight's announcements have arrived, take a look.**__"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/1186766311540392076/1186766397741744300/announcement-pic.png?ex=65947156&is=6581fc56&hm=483ccffe9e4687c6c8c0c53e2aba317f3a17946e5009f746483e46a04ad128dc&"
      )
      .setDescription(`${message}`)
      .setTimestamp()
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });
    channel.send(`@everyone`);
    channel.send({ embeds: [aEmbed] });
    interaction.deleteReply();
  },
};
