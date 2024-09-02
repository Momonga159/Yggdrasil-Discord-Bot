const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a user from the server.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to kick.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the kick.")
        .setRequired(true)
    ),
  run: async ({ interaction }) => {
    const users = interaction.options.getUser("user");
    const ID = users.id;
    const kickUser = interaction.guild.members.cache.get(ID);

    //making permissions needed
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)
    )
      return await interaction.reply({
        content: `Lack of permissions.`,
        ephemeral: true,
      });
    if (interaction.member.id === ID)
      return await interaction.reply({ content: `You cannot kick yourself.` });

    //no reason message
    let reason = interaction.options.getString("reason");
    if (!reason) reason = "No reason was given by the admin who kicked you";

    //dm message after kick
    const kickEmbed = new EmbedBuilder()
      .setColor("Orange")
      .setTitle(`You have been kicked from **${interaction.guild.name}**`)
      .setDescription(
        "If you believe this kick is unjust, you can contact the server moderators."
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/521304427811045387/1171105793240735805/yggdrasil-bg.png?ex=65ae86c3&is=659c11c3&hm=bd3a486f4c3193c3c98ca63bdf7cd4a6d0d92433d9621129ded8481e1752853b&"
      )
      .addFields(
        {
          name: "Reason:",
          value: `\`${reason}\``,
        },
        {
          name: "Kicking Staff User",
          value: `Kicked by: <@${interaction.user.id}>`,
          inline: false,
        },
        {
          name: "⏲️ Time:",
          value: `${new Date().toLocaleString()}`,
          inline: false,
        }
      )
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });

    //kick confirmation
    const kickconfEmbed = new EmbedBuilder()
      .setColor("Orange")
      .setTitle(`User: ( ${kickUser} ) has been kicked`)
      .setImage(
        "https://cdn.discordapp.com/attachments/521304427811045387/1171105793240735805/yggdrasil-bg.png?ex=65ae86c3&is=659c11c3&hm=bd3a486f4c3193c3c98ca63bdf7cd4a6d0d92433d9621129ded8481e1752853b&"
      )
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://cdn.discordapp.com/app-icons/1186362076084568074/f21b6cde064b4f566e493f9a13d18a3f.png",
      });

    await kickUser.send({ embeds: [kickEmbed] }).catch((err) => {
      return;
    });

    await kickUser.kick(reason).catch((err) => {
      return interaction.reply({
        content:
          "I cannot kick this user, as they have higher permissions than me",
      });
    });

    await interaction.reply({ embeds: [kickconfEmbed] }).catch((err) => {
      return;
    });
  },
};
