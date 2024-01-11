const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unpause-giveaway")
    .setDescription("Unpause a giveaway.")
    .addStringOption((option) =>
      option
        .setName("giveaway")
        .setDescription(
          "The giveaway to unpause (message ID or giveaway prize)"
        )
        .setRequired(true)
    ),

  run: async ({client, interaction}) => {
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

    if (!giveaway.pauseOptions.isPaused) {
      return interaction.reply({
        content: "This giveaway is not paused.",
        ephemeral: true,
      });
    }

    client.giveawaysManager
      .unpause(giveaway.messageId)
      .then(() => {
        interaction.reply({ content: "Giveaway unpaused!", ephemeral: true});
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
