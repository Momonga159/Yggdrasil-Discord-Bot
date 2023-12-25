const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
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
        "You can't ban that user because they're the server owner."
      );
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
    const requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the cmd
    const botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply(
        "You can't ban that user because they have the same/higher role than you."
      );
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply(
        "I can't ban that user because they have the same/higher role than me."
      );
      return;
    }

    // ban the targetUser
    try {
      await targetUser.ban({ reason });

      const channel = client.channels.cache.get("1187156449978228807"); //tag n°5
      const kEmbed = new EmbedBuilder()
        .setColor("Red")
        .setDescription("__**Someone has been ban.**__")
        .addFields(
          { name: "User:", value: `${targetUser}`, inline: true },
          { name: "Reason:", value: `${reason}`, inline: true }
        );
      channel.send({ embeds: [kEmbed] });
    } catch (error) {
      console.log(`There was an error when banning: ${error}`);
    }

    interaction.deleteReply();
  },

  name: "ban",
  description: "ban a member from this server.",
  options: [
    {
      name: "target-user",
      description: "The user you want to ban.",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "reason",
      description: "The reason you want to ban.",
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.banMembers],
  botPermissions: [PermissionFlagsBits.banMembers],
};
