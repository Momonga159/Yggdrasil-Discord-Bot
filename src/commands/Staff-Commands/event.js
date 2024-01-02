const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "event",
  description: "Send a message in the event channel.",
  options: [
    {
      name: "title",
      description: "The title of the event.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "description",
      description: "The description of the event.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
    const title = interaction.options.get("title").value;
    const description = interaction.options.get("description").value;

    await interaction.deferReply();

    const channel = client.channels.cache.get("1188953233113219092"); // ID of the event channel

    const eEmbed = new EmbedBuilder()
      .setTitle("an event has been created!")
      .addFields(
        { name: "Title:", value: title },
        { name: "Description:", value: description }
      )
      .setTimestamp()
      .setColor("White")
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });

    await channel.send(`@everyone`);
    await channel.send({ embeds: [eEmbed] });
    interaction.deleteReply();
  },
};
