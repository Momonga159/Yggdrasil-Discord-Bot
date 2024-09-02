const { EmbedBuilder } = require("discord.js");

module.exports = async (member) => {
  if (!member) return console.log("Member not found");
  if (!member.guild) return console.log("Guild not found");

  const { welcome_channel } = require('../../json/helpChannel.json')
  const { verified_role } = require('../../json/roles.json')
  const role = verified_role
  const channelID = welcome_channel

  const channel = member.guild.channels.cache.get(channelID)

  if (!role) return console.log("Role not found");
  if (!channel) return console.log("Channel not found");

  await member.roles.add(role);

  const embed = new EmbedBuilder()
    .setTitle("A new member has joined.")
    .setDescription(`Welcome to the server \`${member.user.username}\` !\n\nYou are the **${member.guild.memberCount}th** member !`)
    .setColor("Green")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setImage("https://cdn.discordapp.com/attachments/521304427811045387/1171105793240735805/yggdrasil-bg.png?ex=65ae86c3&is=659c11c3&hm=bd3a486f4c3193c3c98ca63bdf7cd4a6d0d92433d9621129ded8481e1752853b&")
    .setTimestamp()
    .setFooter({
      text: "By Yggdrasil-Bot | made by _Momonga_",
      iconURL: "https://cdn.discordapp.com/app-icons/1186362076084568074/f21b6cde064b4f566e493f9a13d18a3f.png",
    });

  channel.send({ embeds: [embed] });
};
