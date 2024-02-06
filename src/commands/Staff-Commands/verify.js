const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  ButtonStyle,
  ChannelType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Sends the setup for the verification system.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription(
          "The channel where the verification system will be posted."
        )
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    ),

  run: async ({ interaction }) => {
    const channel = interaction.options.getChannel("channel");

    await interaction.deferReply();

    const embed = new EmbedBuilder()
      .setTitle("Verification")
      .setDescription(`>>> To verify yourself, click on the button below.`)
      .setColor("Green")
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("verifyBtn")
        .setLabel("Verify")
        .setStyle(ButtonStyle.Success)
        .setEmoji("✅")
    );

    await channel.send({ embeds: [embed], components: [row] });
    await interaction.deleteReply()
  },
  adminOnly: true,
};
