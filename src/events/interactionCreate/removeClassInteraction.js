const { EmbedBuilder } = require("discord.js");
const {
  archer,
  mage,
  necromancer,
  paladin,
  thief,
  warrior,
} = require("../../class-role.json");

module.exports = async (interaction) => {
  if (interaction.customId == "selectButtonId") {
    const member = interaction.member;
    const roles = [archer, mage, necromancer, paladin, thief, warrior];
    const hasRole = roles.some((role) => member.roles.cache.has(role));
    const rEmbed = new EmbedBuilder()
      .setTitle("The role was successfully removed.")
      .setColor("DarkGreen")
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });

    const dEmbed = new EmbedBuilder()
      .setTitle("You don't have any class role.")
      .setColor("DarkRed")
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });

    if (hasRole) {
      await member.roles.remove(roles);
      await interaction.reply({
        embeds: [rEmbed],
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        embeds: [dEmbed],
        ephemeral: true,
      });
    }
  }
};
