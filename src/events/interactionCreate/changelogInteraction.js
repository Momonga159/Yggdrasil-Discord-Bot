const fs = require('fs');
const path = require('path');
const {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
  EmbedBuilder,
} = require("discord.js");

let betaTestStatus = false; // Global variable to keep track of the beta test status

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

  if (interaction.customId === "changelogBtn") {
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
  } else if (interaction.customId === "changelogModal") {
    const info = interaction.fields.getTextInputValue("infoChangelog");
    const topic = interaction.fields.getTextInputValue("topicChangelog");

    const { changelog_channel } = require('../../json/helpChannel.json');
    const channelID = changelog_channel;

    const channel = interaction.member.guild.channels.cache.get(channelID);

    const changelogNumber = incrementChangelogCounter();

    const roleId = '1203004654821183518'; // Replace with your role ID
    const roleMention = `<@&${roleId}>`;

    const embed = new EmbedBuilder()
      .setColor("Blurple")
      .setTitle(`Changelog n° ${changelogNumber}`)
      .setDescription(`\`\`\`${info}\`\`\``) 
      .addFields(
        { name: "📜 Changelog Topic:", value: `\n> ${topic}\n`, inline: true },
        { name: "🧪 Beta Test:", value: betaTestStatus ? "● True\n" : "● False\n", inline: true },
        { name: "👨‍💻 Updating Developer:", value: `\n● ${interaction.user}\n\u200B`, inline: false },
        { name: "🕒 Log Entry Time:", value: `\n● ${new Date().toLocaleString()}\n`, inline: true }
      )
      .setFooter({
        text: `By ${interaction.client.user.username} | made by _Momonga_`,
        iconURL: "https://cdn.discordapp.com/app-icons/1186362076084568074/f21b6cde064b4f566e493f9a13d18a3f.png",
      })
      .setTimestamp();

    const cpEmbed = new EmbedBuilder()
      .setColor("DarkGreen")
      .setTitle("Changelog posted!")
      .setFooter({
        text: `By ${interaction.client.user.username} | made by _Momonga_`,
        iconURL: "https://cdn.discordapp.com/app-icons/1186362076084568074/f21b6cde064b4f566e493f9a13d18a3f.png",
      });

    await interaction.reply({ embeds: [cpEmbed], ephemeral: true });

    await channel.send({ content: roleMention, embeds: [embed] });
  } else if (interaction.customId === "betaOnBtn") {
    betaTestStatus = true;
    await interaction.reply({ content: "Beta Test is now set to True.", ephemeral: true });
  } else if (interaction.customId === "betaOffBtn") {
    betaTestStatus = false;
    await interaction.reply({ content: "Beta Test is now set to False.", ephemeral: true });
  }
};
