const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ChannelType,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("changelog")
    .setDescription("Setup the changelog system.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel where the changelog setup will be posted.")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    ),
  run: async ({ interaction }) => {
    const channel = interaction.options.getChannel("channel");

    await interaction.deferReply();

    const eEmbed = new EmbedBuilder()
      .setTitle("Changelog")
      .setDescription(`>>> To do a changelog, click on the button below and complete the form.`)
      .setColor("DarkVividPink")
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://cdn.discordapp.com/app-icons/1186362076084568074/f21b6cde064b4f566e493f9a13d18a3f.png",
      });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("changelogBtn")
        .setLabel("Changelog")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("⚙️"),
      new ButtonBuilder()
        .setCustomId("betaOnBtn")
        .setLabel("Beta On")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId("betaOffBtn")
        .setLabel("Beta Off")
        .setStyle(ButtonStyle.Danger)
    );

    await channel.send({ embeds: [eEmbed], components: [row] });
    await interaction.deleteReply();
  },
  adminOnly: true,
};
