const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify-setup")
    .setDescription("Sends the setup for the verification system."),

  run: async ({ client, interaction }) => {
    const button = new ButtonBuilder()
      .setCustomId("button")
      .setLabel("Verify")
      .setEmoji("✅")
      .setStyle(ButtonStyle.Success);

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("Server Verification.")
      .setDescription(
        "Click the button below to verify yourself withing the server."
      );

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({ embeds: [embed], components: [row] });

    const collector = interaction.channel.createMessageComponentCollector();

    collector.on("collect", async (i) => {
      await i.update({ embeds: [embed], components: [row] });

      const verified_role = interaction.guild.roles.cache.get(
        "1191805119541543053"
      );
      const not_verified = interaction.guild.roles.cache.get(
        "1191838365117599826"
      );
      const member = i.member;

      member.roles.add(verified_role);
      member.roles.remove(not_verified);

      const dEmbed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Server Verification.")
        .setDescription(
          "You have been verified ! \n You have now access to the server."
        )
        .setFooter({
          text: "By Yggdrasil-Bot | made by _Momonga_",
          iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
        });

      i.user.send({ embeds: [dEmbed] }).catch((err) => {
        console.log(err);
      });
    });
  },
};
