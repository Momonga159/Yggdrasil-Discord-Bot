const { EmbedBuilder } = require("discord.js");

module.exports = async (interaction) => {
  const { verified_role, not_verified } = require("../../json/roles.json");

  const verifiedrole = verified_role;
  const notverified = not_verified;

  if (interaction.customId == "verifyBtn") {
    const user = interaction.user;
    const member = interaction.guild.members.cache.get(user.id);

    await member.roles.add(verifiedrole);
    await member.roles.remove(notverified);

    const embed = new EmbedBuilder()
      .setTitle("You have been verified !")
      .setColor("Green")
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });

    await user.send({ embeds: [embed] });
  }
};
