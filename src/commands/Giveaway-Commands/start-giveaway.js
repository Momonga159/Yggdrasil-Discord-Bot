const { SlashCommandBuilder, ChannelType } = require("discord.js");
const ms = require("ms");
const messages = require("../../utils/message");
const config = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("start-giveaway")
    .setDescription("Start a giveaway.")
    .addStringOption((option) =>
      option
        .setName("duration")
        .setDescription(
          "How long the giveaway should last for. Example values: 1m, 1h, 1d"
        )
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("winners")
        .setDescription("How many winners the giveaway should have")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("prize")
        .setDescription("What the giveaway prize should be")
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("What channel the giveaway should be in")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),
  run: async ({ client, interaction }) => {
    const giveawayChannel = interaction.options.getChannel("channel");
    const giveawayDuration = interaction.options.getString("duration");
    const giveawayWinnerCount = interaction.options.getInteger("winners");
    const giveawayPrize = interaction.options.getString("prize");

    client.giveawaysManager.start(giveawayChannel, {
      duration: ms(giveawayDuration),
      prize: giveawayPrize,
      winnerCount: giveawayWinnerCount,
      hostedBy: config.hostedBy ? interaction.user : null,
      messages,
    });

    interaction.reply({ contents: `Giveaway started in ${giveawayChannel}!`, ephemeral: true});
  },
  adminOnly: true,
};
