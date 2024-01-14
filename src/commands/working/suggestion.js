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
    .setName("suggestion")
    .setDescription("Sends the setup for the suggestion system.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription(
          "The channel where the suggestion system will be posted."
        )
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    ),

  run: async ({ interaction }) => {
    const { options } = interaction;
    
    const channel = options.getChannel("channel");
    
    const select = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("suggestionBtn")
        .setLabel(`Create a suggestion !`)
        .setStyle(ButtonStyle.Success)
        .setEmoji("✒️")
    );
    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle(`Create a suggestion !`)
      .setDescription(`Create a suggestion by clicking on the button below.`)
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });

    channel.send({
      embeds: [embed],
      components: [select],
    });
  },
  adminOnly: true,
};
