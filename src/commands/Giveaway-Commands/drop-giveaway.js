const { SlashCommandBuilder, ChannelType } = require("discord.js");
const config = require("../../config.json");
const messages = require("../../utils/message");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("drop-giveaway")
    .setDescription("End a giveaway.")
    .addIntegerOption((option) =>
      option
        .setName("winners")
        .setDescription("How many winners the giveaway should have.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("prize")
        .setDescription("TWhat the prize of the giveaway should be.")
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to start the giveaway in.")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),

  run: async ({ client, interaction }) => {
    const giveawayChannel = interaction.options.getChannel("channel");
    const giveawayWinnerCount = interaction.options.getInteger("winners");
    const giveawayPrize = interaction.options.getString("prize");

    client.giveawaysManager.start(giveawayChannel, {
      winnerCount: giveawayWinnerCount,
      prize: giveawayPrize,
      hostedBy: config.hostedBy ? interaction.user : null,
      isDrop: true,
      messages,
    });

    interaction.reply({ contents: `Giveaway started in ${giveawayChannel}!`, ephemeral: true});
  },
  adminOnly: true,
};
