const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "recruitement",
  description: "apply for a staff position",
  options: [
    {
      name: "place",
      description: "The place you want to apply for.",
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: true,
      choices: [
        {
          name: "moderator",
          value: "moderator",
        },
        {
          name: "helper",
          value: "helper",
        },
        {
          name: "builder",
          value: "builder",
        },
        {
          name: "developer",
          value: "developer",
        },
      ],
    },
  ],
  callback: async (client, interaction) => {
    // Your callback logic goes here
  },
};
