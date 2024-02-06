const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
  ChannelType,
} = require("discord.js");
const suggestion = require("../../schemas/suggestionSchema");
const formatResults = require("../../utils/formatResults");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggestion")
    .setDescription("Configure the suggestion system.")
    .addSubcommand((command) =>
      command
        .setName("setup")
        .setDescription("Setup a suggestion system.")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Input a channel.")
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
    )
    .addSubcommand((command) =>
      command
        .setName("disable")
        .setDescription("Disable an already-existed suggestion channel.")
    )
    .addSubcommand((command) =>
      command
        .setName("submit")
        .setDescription("Submit a suggestion.")
        /*.addChannelOption((option) =>
          option
            .setName("suggestion-channel")
            .setDescription("Where the suggestion channel will be.")
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )*/
    ),
  run: async ({ interaction, client }) => {
    const { options } = interaction;
    const sub = options.getSubcommand();
    const Schannel = options.getChannel("channel");
    const Data = await suggestion.findOne({ GuildID: interaction.guild.id });
    //const suggestmsg = options.getString("suggestion");
    const seChannel = client.channels.cache.get("1195131150033752245");

    switch (sub) {
      case "setup":
        if (
          !interaction.member.permissions.has(
            PermissionsBitField.Flags.Administrator
          )
        )
          return await interaction.reply({
            content: `You can't use this command!`,
            ephemeral: true,
          });

        if (Data) {
          const channel = client.channels.cache.get(Data.ChannelID);

          return await interaction.reply({
            content: `You already have a suggestion system **setup** in ${channel}!`,
            ephemeral: true,
          });
        } else {
          await suggestion.create({
            GuildID: interaction.guild.id,
            ChannelID: Schannel.id,
          });

          const embed = new EmbedBuilder()
            .setColor("Green")
            .setAuthor({
              name: `${interaction.guild.name}'s Suggestion System`,
            })
            .setTitle("Success!")
            .setDescription(
              `✅・The suggestion system has been successfully **setup** in ${Schannel}!`
            );

          await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        break;
      case "disable":
        if (
          !interaction.member.permissions.has(
            PermissionsBitField.Flags.Administrator
          )
        )
          return await interaction.reply({
            content: `You can't use this command!`,
            ephemeral: true,
          });

        if (!Data) {
          return await interaction.reply({
            content: `You don't a suggestion system **setup**!`,
            ephemeral: true,
          });
        } else {
          await suggestion.deleteMany({
            GuildID: interaction.guild.id,
          });

          const embed = new EmbedBuilder()
            .setColor("Green")
            .setAuthor({
              name: `${interaction.guild.name}'s Suggestion System`,
            })
            .setTitle("Success!")
            .setDescription(
              `✅・The suggestion system has been successfully **disable**!`
            );

          await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        break;
      case "submit":
        if (!Data) {
          return await interaction.reply({
            content: `You don't have a suggestion system **setup**!`,
            ephemeral: true,
          });
        } else {
          const sEmbed = new EmbedBuilder()
            .setTitle("Suggestion System")
            .setDescription(
              "If you want to create a suggestion feel free to click the button below and complete the form with as much information is possible."
            )
            .setColor("Green")
            .setFooter({
              text: "By Yggdrasil-Bot | made by _Momonga_",
              iconURL:
                "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
            });

          const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("SuggestionBTN")
              .setLabel("Suggestion")
              .setStyle(ButtonStyle.Primary)
          );

          seChannel.send({ embeds: [sEmbed], components: [row] });
        }
    }
  },
};
