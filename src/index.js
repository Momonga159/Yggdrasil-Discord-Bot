require("dotenv/config");

const { Client, IntentsBitField } = require("discord.js");
const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_URL;
const { CommandHandler } = require('djs-commander'); 
const path = require('path');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
  ],
});

new CommandHandler({
  client,
  commandsPath : path.join(__dirname, 'commands'),
  eventsPath : path.join(__dirname, 'events'),
  validationsPath : path.join(__dirname, 'validations'),
  testServer: process.env.TEST_SERVER_ID,

});


client.on("guildMemberAdd", () => {
  
console.log("Ready!");
})

client.login(process.env.TOKEN);
