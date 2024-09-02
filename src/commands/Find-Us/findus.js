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
    const { findus_channel } = require("../../json/findus_channel");
    const findusID = findus_channel;

    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
    )
      return await interaction.reply({
        content: `Lack of permissions. But you can find the link here: <#${findusID}>`,
        ephemeral: true,
      });

    const findusEmbed = new EmbedBuilder.setColor("Blurple")
      .setTitle("Important Links")
      .setDescription(
        "Here are some important links that you might find useful:"
      )
      .addFields(
        {
          name: "Official Website",
          value: "[Visit our website](https://www.official-website.com)",
          inline: false,
        },
        {
          name: "Support",
          value: "[Get Support](https://www.official-website.com/support)",
          inline: false,
        },
        {
          name: "Community Forums",
          value:
            "[Join the discussion](https://www.official-website.com/forums)",
          inline: false,
        },
        {
          name: "Patch Notes",
          value:
            "[Read the latest patch notes](https://www.official-website.com/patch-notes)",
          inline: false,
        },
        {
          name: "Social Media",
          value:
            "[Follow us on Twitter](https://twitter.com/officialhandle)\n[Like us on Facebook](https://facebook.com/officialpage)",
          inline: false,
        }
      )
      .setFooter({
        text: "Provided by Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });

    await interaction.reply({ embeds: [findusEmbed], ephemeral: false });
  },
};
