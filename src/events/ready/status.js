const { ActivityType } = require('discord.js');

module.exports = (client) => {
    client.user.setActivity('Yggdrasil-Bot', { type: ActivityType.Competing });
    // client.user.setStatus('dnd');
}