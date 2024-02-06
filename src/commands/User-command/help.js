const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Sends all the interaction the user can do."),

  run: async ({ interaction }) => {

    const { recruitement_channel, ticket_channel, unban_channel, suggestion_channel } = require('../../json//helpChannel.json')
    const recruitementID = recruitement_channel
    const ticketID = ticket_channel
    const unbanID = unban_channel
    const suggestionID = suggestion_channel

    const embed = new EmbedBuilder()
      .setTitle("Help")
      .addFields(
        { name: "● Recruitement", value: `> Want to join the team ? <#${recruitementID}>`, inline: false},
        { name: "● Ticket", value: `> Need help with a staff member ? <#${ticketID}>`, inline: false},
        { name: "● Unban", value: `> Do you need to be unbanned from In-Game ? <#${unbanID}>`, inline: false},
        { name: "● Suggestion", value: `> Do you want to do a suggestion ? <#${suggestionID}>`, inline: false}
      )
      .setColor("DarkGreen")
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
