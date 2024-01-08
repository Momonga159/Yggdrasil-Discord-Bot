const {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
  ChannelType,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
} = require("discord.js");

module.exports = async ({ client, interaction }) => {
  if (interaction.customId === "annoucementCreateButton") {
    const modal = new ModalBuilder()
      .setTitle(`Create your announcement`)
      .setCustomId("announcementModal");
    
    const title = new TextInputBuilder()
        .setCustomId("titleAnnouncement")
        .setRequired(true)
        .setLabel("Title of the announcement")
        .setPlaceholder("Please provide a title.")
        .setStyle(TextInputStyle.Short);
    const information = new TextInputBuilder()
        .setCustomId("informationAnnouncement")
        .setRequired(true)
        .setLabel("Information of the announcement")
        .setPlaceholder("Please provide the information.")
        .setStyle(TextInputStyle.Paragraph);
    
    const one = new ActionRowBuilder().addComponents(title);
    const two = new ActionRowBuilder().addComponents(information);

    modal.addComponents(one, two);
    await interaction.showModal(modal);
  }
};
