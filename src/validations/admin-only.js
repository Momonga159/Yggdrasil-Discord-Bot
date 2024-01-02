module.exports = (interaction, commandObj) => {
    if (commandObj.adminOnly) {
        if (interaction.user.id !== process.env.ADMIN_ID) {
            return interaction.reply({
                content: "You need to be admin to run this command !",
                ephemeral: true,
            });
        }
    }
};