module.exports = async (interaction) => {
  const verified_role = interaction.guild.roles.cache.get("1191805119541543053");
  const not_verified = interaction.guild.roles.cache.get("1191838365117599826");

    if (interaction.customId == "verifyBtn") {
        const user = interaction.user;
        const member = interaction.guild.members.cache.get(user.id);
    
        await member.roles.add(verified_role);
        await member.roles.remove(not_verified);

        await interaction.reply({ content: "You have been verified!", ephemeral: true });
    }
};
