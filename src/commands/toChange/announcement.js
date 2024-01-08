const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ChannelType
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("announcement")
    .setDescription("Setup the announcement system.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel where the announcement will be sent.")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),

  run: async ({ interaction }) => {
    
    const achannel = interaction.options.getChannel("channel");
    await interaction.deferReply();

    const asEmbed = new EmbedBuilder()
      .setColor("Gold")
      .setTitle("So it's time to do an announcement ?")
      .setDescription(
        ">>> To do an announcement, you simply clic the button below, provide the title and the description of your announcement and it will be sent to the announcement channel."
      )
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });

    const announcementBtn = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("annoucementCreateButton")
        .setLabel(`Make an announcement.`)
        .setStyle(ButtonStyle.Primary)
        .setEmoji("📢")
    );
    await achannel.send({
      embeds: [asEmbed],
      components: [announcementBtn],
    });
    
    interaction.deleteReply();
  },
  adminOnly: true,
};
