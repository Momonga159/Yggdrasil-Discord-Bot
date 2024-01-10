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

module.exports = async (interaction, client) => {
  if (!interaction) {
    console.error("interaction is undefined");
    return;
  }
  if (interaction.customId == "changelogBtn") {
    const modal = new ModalBuilder()
      .setTitle(`Changelog`)
      .setCustomId("changelogModal");

    const title = new TextInputBuilder()
      .setCustomId("titleChangelog")
      .setRequired(true)
      .setLabel("Title of the changelog")
      .setPlaceholder("Please provide a title.")
      .setStyle(TextInputStyle.Short);

    const info = new TextInputBuilder()
      .setCustomId("infoChangelog")
      .setRequired(true)
      .setLabel("Please explain your changelog.")
      .setPlaceholder("Please provide the changelog.")
      .setStyle(TextInputStyle.Paragraph);

    const one = new ActionRowBuilder().addComponents(title);
    const two = new ActionRowBuilder().addComponents(info);

    modal.addComponents(one, two);
    await interaction.showModal(modal);
  } else if (interaction.customId == "changelogModal") {
    const why = interaction.fields.getTextInputValue("titleChangelog");
    const info = interaction.fields.getTextInputValue("infoChangelog");

    const channel = client.channels.cache.get("1194742904925732925");

    const embed = new EmbedBuilder()
      .setTitle("New Changelog Posted!")
      .setDescription(`**Title:**\n \`${why}\`\n\n**Changelog:**\n \`${info}\``) // use setDescription, not setdescription
      .setColor("White")
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });

    const cpEmbed = new EmbedBuilder()
      .setColor("DarkGreen")
      .setTitle("Changelog posted!")
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });

    await interaction.reply({ embeds: [cpEmbed], ephemeral: true });
    await channel.send({ embeds: [embed] });
  }
};
