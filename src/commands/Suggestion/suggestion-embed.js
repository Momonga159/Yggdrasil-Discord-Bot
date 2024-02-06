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
      .setName("suggesiton-embed")
      .setDescription("Sends the suggestion embed for the suggestion system.")
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
      const channel = interaction.options.getChannel("channel");
  
      await interaction.deferReply();
  
      const embed = new EmbedBuilder()
        .setTitle("Verification")
        .setDescription(`>>> To make a suggestion, click on the button below.`)
        .setColor("Green")
        .setFooter({
          text: "By Yggdrasil-Bot | made by _Momonga_",
          iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
        });
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("suggestionBTN")
          .setLabel("Suggestion")
          .setStyle(ButtonStyle.Success)
      );
  
      await channel.send({ embeds: [embed], components: [row] });
    },
    adminOnly: true,
  };
  