require("dotenv/config");

const { Client, IntentsBitField } = require("discord.js");
const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_URL;
const { CommandHandler } = require("djs-commander");
const { GiveawaysManager } = require("discord-giveaways");
const path = require("path");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
  ],
  partials: [
    'MESSAGE',
    'CHANNEL',
    'REACTION',
    'USER'
  ]
});

new CommandHandler({
  client,
  commandsPath: path.join(__dirname, "commands"),
  eventsPath: path.join(__dirname, "events"),
  validationsPath: path.join(__dirname, "validations"),
  testServer: process.env.TEST_SERVER_ID,
});

client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: "#FF0000",
    reaction: "🎉",
    lastChance: {
      enabled: true,
      content: "⚠️ **LAST CHANCE TO ENTER !** ⚠️",
      threshold: 10000,
      embedColor: "#FF0000",
    },
  },
});

client.login(process.env.TOKEN);