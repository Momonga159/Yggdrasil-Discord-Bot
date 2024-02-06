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
    .setDescription("Setup the changelog system.159")
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
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("changelogBtn")
        .setLabel("Changelog")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("⚙️")
    );

    await channel.send({ embeds: [eEmbed], components: [row] });
    await interaction.deleteReply();
  },
  adminOnly: true,
};
