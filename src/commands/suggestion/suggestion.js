const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  name: "suggestion",
  description: "Make a suggestion.",
  options: [
    {
      name: "suggestion",
      description: "The suggestion you want to make.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  callback: async (client, interaction) => {
    const suggestion_input =
      interaction.options.get("suggestion")?.value || "No suggestion provided";

    await interaction.deferReply();

    const channel = client.channels.cache.get("1187156449978228807"); //channel of the suggestions
    const kEmbed = new EmbedBuilder()
      .setColor("Red")
      .setDescription("__**A new suggestion is here.**__")
      .addFields({
        name: "Suggestion:",
        value: `${suggestion_input}`,
        inline: true,
      });
    channel.send({ embeds: [kEmbed] });

    interaction.deleteReply();
  },
};
