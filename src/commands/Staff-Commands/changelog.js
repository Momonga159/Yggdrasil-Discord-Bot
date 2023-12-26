const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
    const title1 = interaction.options.get("title")?.value || "N/A";
    const changelog1 = interaction.options.get("changelog")?.value || "N/A";

    await interaction.deferReply();

    const channel = client.channels.cache.get("1186757469612019763"); // ID of the change-log channel
    const cEmbed = new EmbedBuilder()
      .setColor("Blurple")
      .setDescription(
        "__**The changelogs of the skulls have arrived, take a look.**__"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/1186766311540392076/1186767177223786586/changelog-skull.png?ex=65947210&is=6581fd10&hm=7f4335f3d29ed881a3704d236feab4b9b462a644c7c832324c820d2e02a82d7f&"
      )
      .addFields({ name: `${title1}`, value: `${changelog1}`, inline: true })
      .setTimestamp()
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });
    channel.send(`@everyone`);
    channel.send({ embeds: [cEmbed] });

    interaction.deleteReply();
  },

  name: "changelog",
  description: "Sends a message to the change-log channel.",
  options: [
    {
      name: "title",
      description: "Please provide the title for the changelog.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "changelog",
      description: "Please provide the information of the changelog.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.KickMembers],
  botPermissions: [PermissionFlagsBits.KickMembers],
};
