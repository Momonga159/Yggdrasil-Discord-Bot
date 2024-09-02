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
    .setName("recruitment")
    .setDescription("Setup the recruitment system.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription(
          "The channel where the recruitment setup will be posted."
        )
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    ),
  run: async ({ interaction }) => {
    const channel = interaction.options.getChannel("channel");

    await interaction.deferReply();

    const eEmbed = new EmbedBuilder()
      .setTitle("Recruitment")
      .setDescription(
        `> Want to join our team? Click on the role you want to have, and we will send you all the information.`
      )
      .setColor("Green")
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://cdn.discordapp.com/app-icons/1186362076084568074/f21b6cde064b4f566e493f9a13d18a3f.png",
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
