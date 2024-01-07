const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  SlashCommandBuilder,
} = require("discord.js");
/*
Administrator, 
Moderator, 
Developer, 
Builder, 
Helper
*/
module.exports = {
  data: new SlashCommandBuilder()
    .setName("recruitement")
    .setDescription("Setups the recruitement message"),

    run: async (client, interaction) => {
    
    },
};
