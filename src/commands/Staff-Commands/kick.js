const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "kick",
  description: "Kicks a member from this server.",
  options: [
    {
      name: "target-user",
      description: "The user you want to kick.",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "reason",
      description: "The reason you want to kick this user.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.KickMembers],
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get("target-user").value;
    const reason =
      interaction.options.get("reason")?.value || "No reason provided";

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserId);

    if (!targetUser) {
      await interaction.editReply("That user doesn't exist in this server.");
      return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply(
        "You can't kick that user because they're the server owner."
      );
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position;
    const requestUserRolePosition = interaction.member.roles.highest.position;
    const botRolePosition = interaction.guild.members.me.roles.highest.position;

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply(
        "You can't kick that user because they have the same/higher role than you."
      );
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply(
        "I can't kick that user because they have the same/higher role than me."
      );
      return;
    }

    try {
      await targetUser.kick({ reason });

      const channel = client.channels.cache.get("1187156449978228807"); // ID of the mod-log channel
      const kEmbed = new EmbedBuilder()
        .setColor("Red")
        .setDescription("__**Someone has been kicked.**__")
        .setTimestamp()
        .addFields(
          { name: "User:", value: `${targetUser}`, inline: true },
          { name: "Reason:", value: `${reason}`, inline: true }
        )
        .setFooter({
          text: "By Yggdrasil-Bot | made by _Momonga_",
          iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
        });
      channel.send({ embeds: [kEmbed] });
    } catch (error) {
      console.log(`There was an error when kicking: ${error}`);
    }

    interaction.deleteReply();
  },
};
