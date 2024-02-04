const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const { v4: uuidv4 } = require("uuid");

const testMapData = require("../../maps/test-map");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Test command"),
  run: async ({ interaction }) => {
    const data = testMapData.get("Data 1");
    console.log(data);
    const randomUuid = uuidv4();

    console.log(randomUuid);
  },
};
