const { SlashCommandBuilder, ChannelType } = require("discord.js");
const GuildConfiguration = require("../../schemas/GuildConfiguration");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggestion-add")
    .setDescription("Add a suggestion channel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel you want to add.")
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

      if (guildConfiguration.suggestionChannelIds.includes(channel.id)) {
        await interaction.reply({
          content: `${channel} is already a suggestions channel. `,ephemeral: true,
        });
        return;
      }

      guildConfiguration.suggestionChannelIds.push(channel.id);
      await guildConfiguration.save();

      await interaction.reply({
        content: `Added ${channel} to suggestion channels.`,ephemeral: true,
      });
      return;
  },
  adminOnly: true,
};
