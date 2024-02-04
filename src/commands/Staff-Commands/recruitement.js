const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  SlashCommandBuilder,
  ChannelType
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("recruitement")
    .setDescription("Setup the recruitement system.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription(
          "The channel where the recruitement setup will be posted."
        )
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    ),
  run: async ({ interaction }) => {
    const channel = interaction.options.getChannel("channel");

    await interaction.deferReply();

    const eEmbed = new EmbedBuilder()
      .setTitle("Recruitement")
      .setDescription(
        `> Want to join our team ? click on the role you want to have and we will send you all the informations.`
      )
      .setColor("Green")
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("moderatorID")
        .setLabel("Moderator")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("developerID")
        .setLabel("Developer")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("builderID")
        .setLabel("Builder")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("helperID")
        .setLabel("Helper")
        .setStyle(ButtonStyle.Secondary)
    );

    await channel.send({ embeds: [eEmbed], components: [row] });
    await interaction.deleteReply();
  },
  adminOnly: true,
};
