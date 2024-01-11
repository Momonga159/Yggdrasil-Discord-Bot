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

    
    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
      // The giveaway duration
      duration: ms(giveawayDuration),
      // The giveaway prize
      prize: giveawayPrize,
      // The giveaway winner count
      winnerCount: giveawayWinnerCount,
      // Who hosts this giveaway
      hostedBy: config.hostedBy ? interaction.user : null,
      // Messages
      messages,
    });

    interaction.reply(`Giveaway started in ${giveawayChannel}!`);
  },
  adminOnly: true,
};
