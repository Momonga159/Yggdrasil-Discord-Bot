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
  if (!interaction || !interaction.values || interaction.values.length === 0) {
    console.error("Invalid interaction or interaction values");
    return;
  }

  let choice = interaction.values[0];
  const member = interaction.member;
  const roles = [archer, mage, necromancer, paladin, thief, warrior];
  const hasRole = roles.some((role) => member.roles.cache.has(role));

  const oEmbed = new EmbedBuilder()
    .setTitle("You can only have one class at a time.")
    .setColor("DarkRed")
    .setFooter({
      text: "By Yggdrasil-Bot | made by _Momonga_",
      iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
    });

  if (hasRole) {
    await interaction.reply({
      embeds: [oEmbed],
      ephemeral: true,
    });
    return;
  }

  const sEmbed = new EmbedBuilder()
    .setTitle("Role added.")
    .setDescription(`You have successfully added the **${choice}** role.`)
    .setColor("DarkGreen")
    .setFooter({
      text: "By Yggdrasil-Bot | made by _Momonga_",
      iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
    });

  if (choice == "archer") {
    if (member.roles.add(archer)) {
      await interaction.reply({
        embeds: [sEmbed],
        ephemeral: true,
      });
    }
  } else if (choice == "mage") {
    if (member.roles.add(mage)) {
      await interaction.reply({
        embeds: [sEmbed],
        ephemeral: true,
      });
    }
  } else if (choice == "necromancer") {
    if (member.roles.add(necromancer)) {
      await interaction.reply({
        embeds: [sEmbed],
        ephemeral: true,
      });
    }
  } else if (choice == "paladin") {
    if (member.roles.add(paladin)) {
      await interaction.reply({
        embeds: [sEmbed],
        ephemeral: true,
      });
    }
  } else if (choice == "thief") {
    if (member.roles.add(thief)) {
      await interaction.reply({
        embeds: [sEmbed],
        ephemeral: true,
      });
    }
  } else if (choice == "warrior") {
    if (member.roles.add(warrior)) {
      await interaction.reply({
        embeds: [sEmbed],
        ephemeral: true,
      });
    }
  }
};
