const fs = require('fs');
const path = require('path');
const {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
  EmbedBuilder,
} = require("discord.js");

module.exports = async (interaction) => {
  if (!interaction) {
    console.error("interaction is undefined");
    return;
  }

  const counterFilePath = path.join(__dirname, '../../json/changelogCounter.json');

  const incrementChangelogCounter = () => {
    let counterData = fs.readFileSync(counterFilePath);
    let { changelogNumber } = JSON.parse(counterData);
    changelogNumber += 1;
    fs.writeFileSync(counterFilePath, JSON.stringify({ changelogNumber }));
    return changelogNumber;
  };

  if (interaction.customId == "changelogBtn") {
    const modal = new ModalBuilder()
      .setTitle(`Changelog`)
      .setCustomId("changelogModal");

    const info = new TextInputBuilder()
      .setCustomId("infoChangelog")
      .setRequired(true)
      .setLabel("Please explain your changelog.")
      .setPlaceholder("Please provide the changelog.")
      .setStyle(TextInputStyle.Paragraph);

    const topic = new TextInputBuilder()
      .setCustomId("topicChangelog")
      .setRequired(true)
      .setLabel("What is the topic of this changelog?")
      .setPlaceholder("Provide the changelog topic.")
      .setStyle(TextInputStyle.Short);

    const firstRow = new ActionRowBuilder().addComponents(info);
    const secondRow = new ActionRowBuilder().addComponents(topic);

    modal.addComponents(firstRow, secondRow);
    await interaction.showModal(modal);
  } else if (interaction.customId == "changelogModal") {
    const info = interaction.fields.getTextInputValue("infoChangelog");
    const topic = interaction.fields.getTextInputValue("topicChangelog");

    const { changelog_channel } = require('../../json/helpChannel.json')
    const channelID = changelog_channel

    const channel = interaction.member.guild.channels.cache.get(channelID);

    const changelogNumber = incrementChangelogCounter();

    const embed = new EmbedBuilder()
      .setColor("Blurple")
      .setTitle(`Changelog n° ${changelogNumber}`)
      .setDescription(`\`\`\`${info}\`\`\``) 
      .addFields(
        { name: "Changelog Topic:", value:`> topic` },
        { name: "Updating Developer:", value: `${interaction.user}`, inline: true },
        { name: "Log Entry Time:", value: new Date().toLocaleString(), inline: true }
      )
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      })
      .setTimestamp();

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
