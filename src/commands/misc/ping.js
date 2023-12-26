module.exports = {
  name: "ping",
  description: "Pong!",
  // devOnly: Boolean,
  testOnly: true,
  // options: Object[],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    await interaction.reply({content: `Pong! ${client.ws.ping}ms`, ephemeral: true});
    await interaction.followUp({ content: 'Pong again!', ephemeral: true });
  },
};
