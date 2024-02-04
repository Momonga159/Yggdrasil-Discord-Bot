const { SlashCommandBuilder, ChannelType } = require("discord.js");
const GuildConfiguration = require("../../schemas/GuildConfiguration");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("config-suggestion")
    .setDescription("Manage the suggestion system.")
    .addSubcommand((command) =>
      command
        .setName("add")
        .setDescription("Add a suggestion channel")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("The channel you want to add.")
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
    )
    .addSubcommand((command) =>
      command
        .setName("remove")
        .setDescription("Remove a suggestion channel.")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("The channel you want to remove.")
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
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

    const subcommand = interaction.option.getSubcommand();

    if (subcommand === "add") {
      const channel = interaction.options.getChannel("channel");

      if (guildConfiguration.suggestionChannelIds.includes(channel.id)) {
        await interaction.reply({
          content: `${channel} is already a suggestions channel. `,
        });
        return;
      }

      guildConfiguration.suggestionChannelIds.push(channel.id);
      await guildConfiguration.save();

      await interaction.reply({
        content: `Added ${channel} to suggestion channels.`,
      });
      return;
    }

    if (subcommand === "remove") {
      const channel = interaction.options.getChannel("channel");

      if (!guildConfiguration.suggestionChannelIds.includes(channel.id)) {
        await interaction.reply({
          content: `${channel} is not a suggestions channel.`,
        });
        return;
      }

      guildConfiguration.suggestionChannelIds =
        guildConfiguration.suggestionChannelIds.filter(
          (id) => id !== channel.id
        );
      await guildConfiguration.save();

      await interaction.reply({
        content: `Removed ${channel} from suggestion channles.`,
      });
      return;
    }
  },
  adminOnly: true,
};
