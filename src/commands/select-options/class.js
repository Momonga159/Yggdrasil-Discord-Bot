const {
  SlashCommandBuilder,
  ChannelType,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("class")
    .setDescription("Class Selection")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel you want to select the class in.")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),

  run: async ({ interaction }) => {
    const channel = interaction.options.getChannel("channel");
    await interaction.deferReply();

    const mEmbed = new EmbedBuilder()
      .setTitle("Class Selection | Class Remove")
      .addFields(
        {
          name: "Add a class.",
          value: "Select a class to add it to your roles.",
          inline: true,
        },
        {
          name: "Remove a class.",
          value:
            "Click the button to remove your class role to select a new one.",
          inline: true,
        }
      )
      .setColor("Navy")
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("selectMenuId")
      .setPlaceholder("Select a class")
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("Archer")
          .setDescription("Click to get the Archer role.")
          .setValue("archer")
          .setEmoji("🏹"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Mage")
          .setDescription("Click to get the Mage role.")
          .setValue("mage")
          .setEmoji("🧙‍♂️"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Necromancer")
          .setDescription("Click to get the Necromancer role.")
          .setValue("necromancer")
          .setEmoji("🧟‍♂️"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Paladin")
          .setDescription("Click to get the Paladin role.")
          .setValue("paladin")
          .setEmoji("🛡️"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Thief")
          .setDescription("Click to get the Thief role.")
          .setValue("thief")
          .setEmoji("🗡️"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Warrior")
          .setDescription("Click to get the Warrior role.")
          .setValue("warrior")
          .setEmoji("⚔️")
      );
    const selectButton = new ButtonBuilder()
      .setCustomId("selectButtonId")
      .setLabel("Remove role")
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder().addComponents(selectMenu);
    const row2 = new ActionRowBuilder().addComponents(selectButton);
    await channel.send({
      embeds: [mEmbed],
      components: [row, row2],
    });
  },
  adminOnly: true,
};
