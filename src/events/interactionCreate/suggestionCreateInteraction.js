const {
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  EmbedBuilder,
} = require("discord.js");

const suggestion = require("../../schemas/suggestionSchema");
const formatResults = require("../../utils/formatResults");

module.exports = async (interaction) => {
  const Data = await suggestion.findOne({ GuildID: interaction.guild.id });

  if (interaction.customId == "SuggestionBTN") {
    const modal = new ModalBuilder()
      .setTitle("Suggestion")
      .setCustomId("suggestionModal");

    const information = new TextInputBuilder()
      .setCustomId("infoSugg")
      .setRequired(true)
      .setLabel("Provide you're suggestion")
      .setPlaceholder("Write much information as possible !")
      .setMaxLength(1000)
      .setStyle(TextInputStyle.Paragraph);

    const one = new ActionRowBuilder().addComponents(information);

    modal.addComponents(one);
    await interaction.showModal(modal);
  }

  if (interaction.customId == "suggestionModal") {
    const suggestmsg = interaction.fields.getTextInputValue("infoSugg");
    const { suggestion_channel } = require('../../json/helpChannel.json')
    const channelID = suggestion_channel
    const suggestionchannel = interaction.member.guild.channels.cache.get(channelID);
    

    const num1 = Math.floor(Math.random() * 256);
    const num2 = Math.floor(Math.random() * 256);
    const num3 = Math.floor(Math.random() * 256);
    const num4 = Math.floor(Math.random() * 256);
    const num5 = Math.floor(Math.random() * 256);
    const num6 = Math.floor(Math.random() * 256);
    const SuggestionID = `${num1}${num2}${num3}${num4}${num5}${num6}`;

    const suggestionembed = new EmbedBuilder()
      .setColor("White")
      .setThumbnail(interaction.user.displayAvatarURL({ size: 512 }))
      .setTitle(`Suggestion from ${interaction.user.username}`)
      .setDescription(`> \`${suggestmsg}\``)
      .setTimestamp()
      .setFooter({ text: `Suggestion ID: ${SuggestionID}` })
      .addFields({ name: "Upvotes", value: "**No votes**", inline: true })
      .addFields({
        name: "Downvotes",
        value: "**No votes**",
        inline: true,
      })
      .addFields({ name: `Votes`, value: formatResults() })
      .addFields({
        name: "Author",
        value: `> ${interaction.user}`,
        inline: false,
      });

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
        .setEmoji("✅")
        .setLabel("Approve")
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId("rej")
        .setEmoji("❌")
        .setLabel("Reject")
        .setStyle(ButtonStyle.Danger)
    );

    const rEmbed = new EmbedBuilder()
    .setTitle(`Your suggestion has been submitted in ${suggestionchannel}!`)
    .setColor("DarkGreen")
    .setFooter({
      text: "By Yggdrasil-Bot | made by _Momonga_",
      iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
    });
    await interaction.reply({
      embeds: [rEmbed],
      ephemeral: true,
    });
    const msg = await suggestionchannel.send({
      embeds: [suggestionembed],
      components: [btnrow, button2],
    });
    msg.createMessageComponentCollector();

    await suggestion.create({
      GuildID: interaction.guild.id,
      ChannelID: suggestionchannel.id,
      Msg: msg.id,
      AuthorID: interaction.user.id,
      upvotes: 0,
      downvotes: 0,
      Upmembers: [],
      Downmembers: [],
    });
  }
};
