const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Test command"),
  run: async ({ interaction }) => {
    const message = await interaction.reply({ content: 'You can react with the emojis!', fetchReply: true });
		message.react('✅');
		message.react('❌');
  },
};
