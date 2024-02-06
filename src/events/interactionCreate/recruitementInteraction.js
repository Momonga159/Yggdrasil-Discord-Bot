const { EmbedBuilder } = require("discord.js");

module.exports = async (interaction) => {
  const guild = interaction.guild;

  const { admin_role } = require('../../json/roles.json');
  const role = admin_role;
  const admin = role.members || [];

  const edEmbed = new EmbedBuilder()
    .setTitle("Recruitment information")
    .setDescription(
      "You can answer questions to one of the following administrators. You may be required to undergo a vocal interview, and additional information may be requested."
    )
    .setColor("DarkGreen")
    .setFooter({
      text: "By Yggdrasil-Bot | made by _Momonga_",
      iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
    });

  const mdEmbed = new EmbedBuilder()
    .setTitle("Administrator list:")
    .setColor("DarkGreen")
    .setFooter({
      text: "By Yggdrasil-Bot | made by _Momonga_",
      iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
    });

  if (admin.length > 0) {
    mdEmbed.setDescription(admin.map((member) => `<@${member.user.id}> `).join("\n"));
  } else {
    mdEmbed.setDescription("No administrators found.");
  }

  if (interaction.customId == "moderatorID") {
    const mEmbed = new EmbedBuilder()
      .setTitle("Moderator Question")
      .setDescription(
        `
    > How would you handle a situation where two players are engaged in a heated argument, disrupting the harmony of the community?

    > Can you share an experience from another community where you successfully mediated a conflict and restored a positive atmosphere?
    
    > What strategies would you employ to ensure a safe and inclusive environment for all members, regardless of their backgrounds or opinions?

    > How do you balance enforcing rules and maintaining a friendly and approachable demeanor as a moderator?

    > In the event of encountering a potentially controversial issue, how would you communicate decisions made by the moderation team to the community?
    `
      )
      .setColor("DarkGreen")
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });

    interaction.reply({ embeds: [mEmbed, edEmbed, mdEmbed], ephemeral: true });
  } else if (interaction.customId == "developerID") {
    const dEmbed = new EmbedBuilder()
      .setTitle("Developer Question")
      .setDescription(
        `
  > Describe a project where you had to troubleshoot and resolve a challenging coding issue. What approach did you take to identify and fix the problem?

  > How do you stay updated on the latest trends and technologies in game development, and how would you apply this knowledge to enhance our MMORPG server?
  
  > Can you provide an example of a feature or improvement you implemented in a previous project that significantly enhanced the user experience?

  > How do you collaborate with other developers and non-technical staff to ensure smooth integration of new features into the game environment?

  > In what ways do you prioritize and manage your time when working on multiple coding tasks or projects simultaneously?
  `
      )
      .setColor("DarkGreen")
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });

    interaction.reply({ embeds: [dEmbed, edEmbed, mdEmbed], ephemeral: true });
  } else if (interaction.customId == "builderID") {
    const bEmbed = new EmbedBuilder()
      .setTitle("Builder Question")
      .setDescription(
        `
  > Share a specific example of a challenging terrain or structure you've created in the past. What obstacles did you face, and how did you overcome them?

  > How do you balance creativity with practicality when designing in-game environments to ensure both visual appeal and functionality?
  
  > Can you discuss a project where you collaborated with other builders to create a cohesive and immersive game world? How did you contribute to the team effort?

  > What techniques do you use to optimize in-game assets for performance while maintaining a high level of detail in the visuals?

  > How would you handle constructive criticism from players regarding the design of certain in-game elements, and how might you incorporate their feedback into future projects?
  `
      )
      .setColor("DarkGreen")
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });

    interaction.reply({ embeds: [bEmbed, edEmbed, mdEmbed], ephemeral: true });
  } else if (interaction.customId == "helperID") {
    const hEmbed = new EmbedBuilder()
      .setTitle("Helper Question")
      .setDescription(
        `
  > As a helper, how would you assist a new player who is struggling to understand the game mechanics or features?

  > Can you share an experience where you provided support to a frustrated player and successfully resolved their issue, turning a negative experience into a positive one?
  
  > How do you keep yourself informed about updates and changes in the MMORPG to provide accurate and up-to-date information to players seeking help?

  > In what ways would you actively engage with the community to identify common concerns or issues, and how would you communicate these to the relevant teams for resolution?

  > How do you handle situations where you don't have an immediate answer to a player's question? How would you go about researching and finding the information needed to assist them?
  `
      )
      .setColor("DarkGreen")
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });

    interaction.reply({ embeds: [hEmbed, edEmbed, mdEmbed], ephemeral: true });
  }
};
