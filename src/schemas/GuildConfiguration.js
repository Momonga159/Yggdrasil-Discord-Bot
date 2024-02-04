const { Schema, model } = require("mongoose");

const GuildConfigurationSchema = new Schema({
  guildId: {
    type: String,
    required: true,
  },
  suggestionChannelIds: {
    type: [String],
    default: [],
  },
});

module.exports = model("guildConfiguration", GuildConfigurationSchema);
