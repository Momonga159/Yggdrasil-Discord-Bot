const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const GuildConfiguration = require("../../schemas/GuildConfiguration");
const Suggestion = require("../../schemas/Suggestion");
const formatResults = require("../../utils/formatResults");

module.exports = async (interaction) => {
  if (interaction.customId == "suggestionBtnID") {
    const guildConfiguration = await GuildConfiguration.findOne({
      guildId: interaction.guildId,
    });

    if (!guildConfiguration?.suggestionChannelIds.length) {
      await interaction.reply(
        "Configuration system not set up, run /config-suggestion add."
      );
      return;
    }

    if (
      !guildConfiguration.suggestionChannelIds.includes(interaction.channelId)
    ) {
      await interaction.reply(
        `This channel is not configured to use suggestions. Try one of these channels instead: ${guildConfiguration.suggestionChannelIds
          .map((id) => `<#${id}>`)
          .join(", ")}`
      );
      return;
    }

    const modal = new ModalBuilder()
      .setTitle("Create a suggestion")
      .setCustomId(`suggestion_${interaction.user.id}`);

    const textInput = new TextInputBuilder()
      .setCustomId("suggestion-input")
      .setLabel("What would you like to suggest?")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true)
      .setMaxLength(1000);

    const actionRow = new ActionRowBuilder().addComponents(textInput);

    modal.addComponents(actionRow);

    await interaction.showModal(modal);

    const filter = (i) => i.customId === `suggestion_${interaction.user.id}`;

    const modalInteraction = await interaction
      .awaitModalSubmit({
        filter,
        time: 1000 * 60 * 3,
      })
      .catch((error) => console.log(error));

    await modalInteraction.deferReply({ ephemeral: true });

    let suggestionMessage;

    try {
      suggestionMessage = await interaction.channel.send({
        content: "Creating suggestion, please wait...",
        ephemeral: true,
      });
    } catch (error) {
      modalInteraction.editReply(
        "Failed to create suggestion message in this channel. I may not have enough permissions."
      );
      return;
    }

    const suggestionText =
      modalInteraction.fields.getTextInputValue("suggestion-input");

    const newSuggestion = new Suggestion({
      authorId: interaction.user.id,
      guildId: interaction.guildId,
      messageId: suggestionMessage.id,
      content: suggestionText,
    });

    await newSuggestion.save();

    modalInteraction.editReply("Suggestion created.");

    const suggestionEmbed = new EmbedBuilder()
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL({ size: 256 }),
      })
      .addFields([
        { name: "Suggestion", value: suggestionText },
        { name: "Status", value: `\`⏳ Pending\`` },
        { name: "Votes", value: formatResults() },
      ])
      .setColor("White");

    const upvoteButton = new ButtonBuilder()
      .setEmoji("👍")
      .setLabel("Upvote")
      .setStyle(ButtonStyle.Secondary)
      .setCustomId(`suggestion.${newSuggestion.suggestionId}.upvote`);

    const downvoteButton = new ButtonBuilder()
      .setEmoji("👎")
      .setLabel("Downvote")
      .setStyle(ButtonStyle.Secondary)
      .setCustomId(`suggestion.${newSuggestion.suggestionId}.downvote`);

    const approveButton = new ButtonBuilder()
      .setEmoji("✅")
      .setLabel("Approve")
      .setStyle(ButtonStyle.Success)
      .setCustomId(`suggestion.${newSuggestion.suggestionId}.approve`);

    const rejectButton = new ButtonBuilder()
      .setEmoji("🗑️")
      .setLabel("Reject")
      .setStyle(ButtonStyle.Danger)
      .setCustomId(`suggestion.${newSuggestion.suggestionId}.reject`);

    const firstRow = new ActionRowBuilder().addComponents(
      upvoteButton,
      downvoteButton
    );
    const secondRow = new ActionRowBuilder().addComponents(
      approveButton,
      rejectButton
    );

    const channelId = "1195148507846283304";
    const suggestionChannel = await interaction.guild.channels.fetch(channelId);

    try {
      let existingSuggestionMessage;

      try {
        existingSuggestionMessage = await suggestionChannel.messages.cache.get(
          newSuggestion.messageId
        );
      } catch (fetchError) {
        // Handle fetch error (optional)
        console.error("Error fetching suggestion message:", fetchError);
      }

      // If the message is not found, create a new one
      if (!existingSuggestionMessage) {
        existingSuggestionMessage = await suggestionChannel.send({
          //content: `${interaction.user} Suggestion created.`,
          embeds: [suggestionEmbed],
          components: [firstRow, secondRow],
        });
      } else {
        // Edit the existing message
        await existingSuggestionMessage.edit({
          //content: `${interaction.user} Suggestion created.`,
          embeds: [suggestionEmbed],
          components: [firstRow, secondRow],
        });
      }
    } catch (error) {
      // Handle any other errors that may occur
      console.log(`Error in /suggest: ${error}`);
    }
  }
};
