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

    const embed = new EmbedBuilder()
      .setTitle("Help")
      .setDescription(`> Here are all the commands you may need help with.`)
      .addFields(
        { name: "Recruitement", value: `Want to join the team ? Go here: <#${recruitementID}>`, inline: true},
        { name: "Ticket", value: `Need help with a staff member ? Go here: <#${ticketID}>`, inline: true},
        { name: "Unban", value: `Do you need to be unbanned from In-Game ? Go here: <#${unbanID}>`, inline: true}
      )
      .setColor("DarkGreen")
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
