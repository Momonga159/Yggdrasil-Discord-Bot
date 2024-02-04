const { SlashCommandBuilder, ChannelType } = require("discord.js");
const GuildConfiguration = require("../../schemas/GuildConfiguration");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggestion-remove")
    .setDescription("Remove a suggestion channel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel you want to remove.")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),

  run: async ({ interaction }) => {
    let guildConfiguration = await GuildConfiguration.findOne({
      guildId: interaction.guildId,
    });

    if (!guildConfiguration) {
      guildConfiguration = new GuildConfiguration({
        guildId: interaction.guildId,
      });
    }
    const channel = interaction.options.getChannel("channel");

      if (!guildConfiguration.suggestionChannelIds.includes(channel.id)) {
        await interaction.reply({
          content: `${channel} is not a suggestions channel.`,ephemeral: true,
        });
        return;
      }

      guildConfiguration.suggestionChannelIds =
        guildConfiguration.suggestionChannelIds.filter(
          (id) => id !== channel.id
        );
      await guildConfiguration.save();

      await interaction.reply({
        content: `Removed ${channel} from suggestion channeles.`,ephemeral: true,
      });
      return;
  },
  adminOnly: true,
};
