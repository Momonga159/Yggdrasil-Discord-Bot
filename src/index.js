require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_URL;
const eventHandler = require("./handlers/eventHandler");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

eventHandler(client);


client.login(process.env.TOKEN);
