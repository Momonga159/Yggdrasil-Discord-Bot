const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a user from the server.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to ban.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the ban.")
        .setRequired(true)
    ),
  run: async ({ interaction, client }) => {
    const users = interaction.options.getUser("user");
    const ID = users.id;
    const banUser = client.users.cache.get(ID);

    //making permissions needed
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
    )
      return await interaction.reply({
        content: `Lack of permissions.`,
        ephemeral: true,
      });
    if (interaction.member.id === ID)
      return await interaction.reply({ content: `You cannot ban yourself.` });

    //no reason message
    let reason = interaction.options.getString("reason");
    if (!reason) reason = "No reason was given by the admin who banned you";

    //dm message after ban
    const banEmbed = new EmbedBuilder()
      .setColor("Red")
      .setTitle(
        `You have been permanently banned from **${interaction.guild.name}**`
      )
      .setDescription(
        "If you believe this ban is unjust, you can contact the server moderators."
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
          name: "Banning Staff User",
          value: `Banned by: <@${interaction.user.id}>`,
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

    //ban conformation
    const banconfEmbed = new EmbedBuilder()
      .setColor("Red")
      .setTitle(`User: ( ${banUser} ) has been banned`)
      .setImage(
        "https://cdn.discordapp.com/attachments/521304427811045387/1171105793240735805/yggdrasil-bg.png?ex=65ae86c3&is=659c11c3&hm=bd3a486f4c3193c3c98ca63bdf7cd4a6d0d92433d9621129ded8481e1752853b&"
      )
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://cdn.discordapp.com/app-icons/1186362076084568074/f21b6cde064b4f566e493f9a13d18a3f.png",
      });

    await banUser.send({ embeds: [banEmbed] }).catch((err) => {
      return;
    });

    await interaction.guild.bans.create(banUser.id, { reason }).catch((err) => {
      return interaction.reply({
        content:
          "I cannot ban this user, as they have higher permissions than me",
      });
    });

    await interaction.reply({ embeds: [banconfEmbed] }).catch((err) => {
      return;
    });
  },
};
