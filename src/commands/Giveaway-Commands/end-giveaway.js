const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("end-giveaway")
    .setDescription("End a giveaway.")
    .addStringOption((option) =>
      option
        .setName("giveaway")
        .setDescription("The giveaway to end (message ID or giveaway prize)")
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

    if (giveaway.ended) {
      return interaction.reply({
        content: "This giveaway is already ended.",
        ephemeral: true,
      });
    }

    client.giveawaysManager
      .end(giveaway.messageId)
      .then(() => {
        interaction.reply({ content: "Giveaway ended!", ephemeral: true});
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
