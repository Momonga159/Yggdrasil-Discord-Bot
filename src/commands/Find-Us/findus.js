const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("findus")
    .setDescription("List all the link related to Yggdrasil or redirect to the channel find-us."),

  run: async ({ interaction, client }) => {
    // const { findus_channel } = require("../../json/findus_channel");
    // const findusID = findus_channel;

    // if (
    //   !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
    // )
    //   return await interaction.reply({
    //     content: `Lack of permissions. But you can find the link here: <#${findusID}>`,
    //     ephemeral: true,
    //   });

    const findusEmbed = new EmbedBuilder()
    .setColor("Blurple")
      .setTitle("Important Links")
      .setDescription(
        "Here are some important links that you might find useful:"
      )
      .addFields(
        {
          name: "Official Website",
          value: "[Visit our website](https://example.com/)",
          inline: true,
        },
        {
          name: "Beta Test Website",
          value: "[Visit the beta test webite](https://momonga159.github.io/yggdrasil-beta-website/)",
          inline: true,
        },
        {
          name: "Wiki",
          value: "[Yggdrasil IG Wiki](https://example.com/)",
          inline: false,
        },
        {
          name: "World Map",
          value:
            "[See the map on your browser](https://example.com/)",
          inline: false,
        },
        {
          name: "Social Media",
          value:
            "[Follow us on Twitter](https://example.com/)\n[Follow us on Youtube](https://example.com/)",
          inline: false,
        }
      )
      .setFooter({
        text: "Provided by Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://cdn.discordapp.com/app-icons/1186362076084568074/f21b6cde064b4f566e493f9a13d18a3f.png",
      });

    await interaction.reply({ embeds: [findusEmbed], ephemeral: false });
  },
};
