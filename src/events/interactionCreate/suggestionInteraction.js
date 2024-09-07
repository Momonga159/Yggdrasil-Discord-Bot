const suggestion = require("../../schemas/suggestionSchema");
const formatResults = require("../../utils/formatResults");

const {
  ActionRowBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField
} = require("discord.js");

module.exports = async (interaction) => {
  if (!interaction.guild) return;
  if (!interaction.message) return;
  if (!interaction.isButton) return;

  const data = await suggestion.findOne({
    GuildID: interaction.guild.id,
    Msg: interaction.message.id,
  });
  if (!data) return;
  const message = await interaction.channel.messages.fetch(data.Msg);

  if (interaction.customId == "upv") {
    if (data.Upmembers.includes(interaction.user.id))
      return await interaction.reply({
        content: `You cannot vote again! You have already sent an upvote on this suggestion.`,
        ephemeral: true,
      });

    let Downvotes = data.downvotes;
    if (data.Downmembers.includes(interaction.user.id)) {
      Downvotes = Downvotes - 1;
    }

    if (data.Downmembers.includes(interaction.user.id)) {
      data.downvotes = data.downvotes - 1;
    }

    data.Upmembers.push(interaction.user.id);
    data.Downmembers.pull(interaction.user.id);

    const newEmbed = EmbedBuilder.from(message.embeds[0]).setFields(
      {
        name: `Upvotes`,
        value: `> **${data.upvotes + 1}** Votes`,
        inline: true,
      },
      { name: `Downvotes`, value: `> **${Downvotes}** Votes`, inline: true },
      { name: `Author`, value: `> <@${data.AuthorID}>` },
      { name: `Votes`, value: formatResults(data.Upmembers, data.Downmembers) }
    );

    const upvotebutton = new ButtonBuilder()
      .setCustomId("upv")
      .setEmoji("⬆️")
      .setLabel("Upvote")
      .setStyle(ButtonStyle.Primary);

    const downvotebutton = new ButtonBuilder()
      .setCustomId("downv")
      .setEmoji("⬇️")
      .setLabel("Downvote")
      .setStyle(ButtonStyle.Primary);

    const totalvotesbutton = new ButtonBuilder()
      .setCustomId("totalvotes")
      .setEmoji("💭")
      .setLabel("Votes")
      .setStyle(ButtonStyle.Secondary);

    const btnrow = new ActionRowBuilder().addComponents(
      upvotebutton,
      downvotebutton,
      totalvotesbutton
    );

    const button2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("appr")
        .setLabel("Approve")
        .setEmoji("✅")
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId("rej")
        .setEmoji("❌")
        .setLabel("Reject")
        .setStyle(ButtonStyle.Danger)
    );

    await interaction.update({
      embeds: [newEmbed],
      components: [btnrow, button2],
    });

    data.upvotes++;
    data.save();
  }

  if (interaction.customId == "downv") {
    if (data.Downmembers.includes(interaction.user.id))
      return await interaction.reply({
        content: `You cannot vote again! You have already sent an downvote on this suggestion.`,
        ephemeral: true,
      });

    let Upvotes = data.upvotes;
    if (data.Upmembers.includes(interaction.user.id)) {
      Upvotes = Upvotes - 1;
    }

    if (data.Upmembers.includes(interaction.user.id)) {
      data.upvotes = data.upvotes - 1;
    }

    data.Downmembers.push(interaction.user.id);
    data.Upmembers.pull(interaction.user.id);

    const newEmbed = EmbedBuilder.from(message.embeds[0]).setFields(
      { name: `Upvotes`, value: `> **${Upvotes}** Votes`, inline: true },
      {
        name: `Downvotes`,
        value: `> **${data.downvotes + 1}** Votes`,
        inline: true,
      },
      { name: `Author`, value: `> <@${data.AuthorID}>` },
      { name: `Votes`, value: formatResults(data.Upmembers, data.Downmembers) }
    );

    const upvotebutton = new ButtonBuilder()
      .setCustomId("upv")
      .setEmoji("⬆️")
      .setLabel("Upvote")
      .setStyle(ButtonStyle.Primary);

    const downvotebutton = new ButtonBuilder()
      .setCustomId("downv")
      .setEmoji("⬇️")
      .setLabel("Downvote")
      .setStyle(ButtonStyle.Primary);

    const totalvotesbutton = new ButtonBuilder()
      .setCustomId("totalvotes")
      .setEmoji("💭")
      .setLabel("Votes")
      .setStyle(ButtonStyle.Secondary);

    const btnrow = new ActionRowBuilder().addComponents(
      upvotebutton,
      downvotebutton,
      totalvotesbutton
    );

    const button2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("appr")
        .setLabel("Approve")
        .setEmoji("✅")
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId("rej")
        .setEmoji("❌")
        .setLabel("Reject")
        .setStyle(ButtonStyle.Danger)
    );

    await interaction.update({
      embeds: [newEmbed],
      components: [btnrow, button2],
    });

    data.downvotes++;
    data.save();
  }

  if (interaction.customId == "totalvotes") {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ModerateMembers
      )
    )
      return await interaction.reply({
        content: `Only Admins & Staffs can use this button.`,
        ephemeral: true,
      });

    let upvoters = [];
    await data.Upmembers.forEach(async (member) => {
      upvoters.push(`<@${member}>`);
    });

    let downvoters = [];
    await data.Downmembers.forEach(async (member) => {
      downvoters.push(`<@${member}>`);
    });

    const embed = new EmbedBuilder()
      .addFields({
        name: `Upvoters (${upvoters.length})`,
        value: `> ${upvoters.join(", ").slice(0, 1020) || `No upvoters!`}`,
        inline: true,
      })
      .addFields({
        name: `Downvoters (${downvoters.length})`,
        value: `> ${downvoters.join(", ").slice(0, 1020) || `No downvoters!`}`,
        inline: true,
      })
      .setColor("Random")
      .setTimestamp()
      .setFooter({ text: `💭 Vote Data` })
      .setAuthor({ name: `${interaction.guild.name}'s Suggestion System` });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }

  if (interaction.customId == "appr") {
    const upvotebutton = new ButtonBuilder()
      .setCustomId("upv")
      .setEmoji("⬆️")
      .setLabel("Upvote")
      .setStyle(ButtonStyle.Primary);

    const downvotebutton = new ButtonBuilder()
      .setCustomId("downv")
      .setEmoji("⬇️")
      .setLabel("Downvote")
      .setStyle(ButtonStyle.Primary);

    const totalvotesbutton = new ButtonBuilder()
      .setCustomId("totalvotes")
      .setEmoji("💭")
      .setLabel("Votes")
      .setStyle(ButtonStyle.Secondary);

    upvotebutton.setDisabled(true);
    downvotebutton.setDisabled(true);

    const btnrow = new ActionRowBuilder().addComponents(
      upvotebutton,
      downvotebutton,
      totalvotesbutton
    );

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ModerateMembers
      )
    )
      return await interaction.reply({
        content: `Only Admins & Staffs can use this button.`,
        ephemeral: true,
      });

    const newEmbed = EmbedBuilder.from(message.embeds[0])
      .setColor("Green")
      .addFields({
        name: "\u200B",
        value: "✅ Your suggestion has been approved!",
      });

    await interaction.update({ embeds: [newEmbed], components: [btnrow] });
  }

  if (interaction.customId == "rej") {
    const upvotebutton = new ButtonBuilder()
      .setCustomId("upv")
      .setEmoji("❌")
      .setLabel("Upvote")
      .setStyle(ButtonStyle.Primary);

    const downvotebutton = new ButtonBuilder()
      .setCustomId("downv")
      .setEmoji("⬇️")
      .setLabel("Downvote")
      .setStyle(ButtonStyle.Primary);

    const totalvotesbutton = new ButtonBuilder()
      .setCustomId("totalvotes")
      .setEmoji("💭")
      .setLabel("Votes")
      .setStyle(ButtonStyle.Secondary);

    upvotebutton.setDisabled(true);
    downvotebutton.setDisabled(true);

    const btnrow = new ActionRowBuilder().addComponents(
      upvotebutton,
      downvotebutton,
      totalvotesbutton
    );

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ModerateMembers
      )
    )
      return await interaction.reply({
        content: `Only Admins & Staffs can use this button.`,
        ephemeral: true,
      });

    const newEmbed = EmbedBuilder.from(message.embeds[0])
      .setColor("Red") // change to red
      .addFields({
        name: "\u200B",
        value: "❌ Your suggestion has been rejected!",
      });

    await interaction.update({ embeds: [newEmbed], components: [btnrow] });
  }
};
