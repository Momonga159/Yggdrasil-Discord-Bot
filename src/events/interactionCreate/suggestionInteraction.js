const {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
  EmbedBuilder,
} = require("discord.js");

module.exports = async (interaction, client) => {
  if (interaction.customId == "suggestionBtn") {
    const modal = new ModalBuilder()
      .setTitle(`Suggestion`)
      .setCustomId("SuggestionModal");

    const sugg = new TextInputBuilder()
      .setCustomId("suggestionId")
      .setRequired(true)
      .setLabel("Suggestion")
      .setPlaceholder("Please provide a suggestion.")
      .setStyle(TextInputStyle.Paragraph);

    const one = new ActionRowBuilder().addComponents(sugg);
    modal.addComponents(one);
    await interaction.showModal(modal);
  } else if (interaction.customId == "SuggestionModal") {
    const suggestion = interaction.fields.getTextInputValue("suggestionId");
    const channel = client.channels.cache.get("1195148507846283304");

    const embed = new EmbedBuilder()
      .setTitle("New Suggestion!")
      .setDescription(
        `**Suggestion:** \n *${suggestion}* \n\n**Status:** \n \`Pending\``
      )
      .setColor("White")
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      })
      .setTimestamp();

    const vEmbed = new EmbedBuilder()
      .setColor("DarkGreen")
      .setTitle("Suggestion posted!")
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });

    await interaction.reply({ embeds: [vEmbed], ephemeral: true });
    await channel.send({ embeds: [embed] });
  }
};
