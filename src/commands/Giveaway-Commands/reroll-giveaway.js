const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reroll-giveaway")
    .setDescription("Reroll a giveaway.")
    .addStringOption((option) =>
      option
        .setName("giveaway")
        .setDescription("The giveaway to reroll (message ID or giveaway prize)")
        .setRequired(true)
    ),

  run: async ({ client, interaction }) => {
    const query = interaction.options.getString("giveaway");

    const giveaway =
      client.giveawaysManager.giveaways.find(
        (g) => g.prize === query && g.guildId === interaction.guild.id
      ) ||
      client.giveawaysManager.giveaways.find(
        (g) => g.messageId === query && g.guildId === interaction.guild.id
      );

    if (!giveaway) {
      return interaction.reply({
        content: "Unable to find a giveaway for `" + query + "`.",
        ephemeral: true,
      });
    }

    if (!giveaway.ended) {
      return interaction.reply({
        content: "The giveaway is not ended yet.",
        ephemeral: true,
      });
    }

    client.giveawaysManager
      .reroll(giveaway.messageId)
      .then(() => {
        interaction.reply({ content: "Giveaway rerolled!", ephemeral: true});
      })
      .catch((e) => {
        interaction.reply({
          content: e,
          ephemeral: true,
        });
      });
  },
  adminOnly: true,
};
