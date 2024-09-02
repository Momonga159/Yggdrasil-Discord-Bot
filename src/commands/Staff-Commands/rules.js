const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rules")
    .setDescription("Sends the rules."),

  run: async ({ interaction }) => {
    const embed = new EmbedBuilder()
      .setTitle("Server Rules")
      .addFields(
        {
          name: "1. Be Respectful",
          value: "Treat everyone with respect. Harassment, hate speech, or any form of discrimination will not be tolerated.\nAvoid personal attacks, inflammatory comments, and arguments. Disagreements should be handled maturely.\n\u200B",
          inline: true,
        },
        {
          name: "2. No Spamming",
          value: "Do not spam in any channels, including excessive messaging, emoji spamming, or repeated posting of similar content.\nAvoid unnecessary tagging of members, especially @everyone or @here, unless it’s an important announcement.\n\u200B",
          inline: true,
        },
        {
          name: "3. Keep Content Appropriate",
          value: "All content shared in the server must be safe-for-work (SFW). No NSFW content, explicit language, or inappropriate images/videos.\nMemes and jokes are welcome, but keep them appropriate and relevant to the context of the conversation.\n\u200B",
          inline: true,
        },
        {
          name: "4. No Self-Promotion",
          value: "Self-promotion, including advertising other Discord servers, social media, or services, is not allowed unless specifically permitted by the server admins.\nThis includes unsolicited private messages (DMs) to members for promotional purposes.\n\u200B",
          inline: true,
        },
        {
          name: "5. Follow Channel-Specific Guidelines",
          value: "Use channels for their intended purpose. Off-topic conversations should be moved to the appropriate channels.\nRead the channel descriptions and follow any additional guidelines provided for specific channels.\n\u200B",
          inline: true,
        },
        {
          name: "6. No Cheating or Exploiting",
          value: "Cheating, hacking, or exploiting game mechanics or bots in any form is strictly prohibited.\nThis includes using unauthorized third-party tools or sharing methods to exploit or cheat in games.\n\u200B",
          inline: true,
        },
        {
          name: "7. Respect Privacy",
          value: "Do not share private information about yourself or others. This includes addresses, phone numbers, emails, and other personal details.\nRespect others’ privacy by not sharing screenshots or private conversations without consent.\n\u200B",
          inline: true,
        },
        {
          name: "8. Follow Discord’s Terms of Service",
          value: "All members must adhere to Discord’s [Terms of Service](https://discord.com/terms) and [Community Guidelines](https://discord.com/guidelines).\nAny behavior that violates Discord’s rules may result in a ban from the server and a report to Discord.\n\u200B",
          inline: true,
        },
        {
          name: "9. Listen to Staff",
          value: "Staff members have the final say in server matters. If you have an issue or concern, please contact a staff member directly.\nArguing with or disrespecting staff members will not be tolerated.\n\u200B",
          inline: true,
        },
        {
          name: "10. Have Fun and Be Positive",
          value: "The server is a place for fun and positive interactions. Encourage and support each other, and contribute to making the community welcoming for everyone.\nDon’t be afraid to ask for help or join in conversations—everyone is here to enjoy themselves!\n\u200B",
          inline: true,
        }
      )
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://cdn.discordapp.com/app-icons/1186362076084568074/f21b6cde064b4f566e493f9a13d18a3f.png",
      });

    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
