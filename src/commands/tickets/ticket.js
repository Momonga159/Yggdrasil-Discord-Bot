const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ChannelType,
} = require("discord.js");

const ticket = require("../../schemas/ticketSchema");
const { createTranscript } = require("discord-html-transcripts");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Manage the ticket system.")
    .addSubcommand((command) =>
      command
        .setName("send")
        .setDescription("Send the ticket message.")
        .addStringOption((option) =>
          option
            .setName("text")
            .setDescription("Open a ticket.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("message")
            .setDescription("A custom message to add to the embed.")
            .setRequired(false)
        )
    )
    .addSubcommand((command) =>
      command
        .setName("setup")
        .setDescription("Setup the ticket category.")
        .addChannelOption((option) =>
          option
            .setName("category")
            .setDescription("The caterogy to send tickets in.")
            .addChannelTypes(ChannelType.GuildCategory)
            .setRequired(true)
        )
    )
    .addSubcommand((command) =>
      command.setName("remove").setDescription("Disable the ticket system.")
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

  run: async ({ interaction }) => {
    const { options } = interaction;
    const sub = options.getSubcommand();
    const data = await ticket.findOne({ Guild: interaction.guild.id });

    switch (sub) {
      case "send":
        if (!data)
          return await interaction.reply({
            content: `You have to do /ticket setup first!`,
            ephemeral: true,
          });
        const text = options.getString("text");
        var message =
          options.getString("message") ||
          "Create a ticket to talk with the server staff! Once you select below, use the input to describe why you are creating a ticket.";

        const select = new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId("ticketCreateSelect")
            .setPlaceholder(`${text}`)
            .addOptions({
              label: "Create your ticket",
              description: "Click to begin the ticket creation process.",
              value: "createTicket",
            })
        );
        const embed = new EmbedBuilder()
          .setColor("DarkVividPink")
          .setTitle(`Create a ticket !`)
          .setDescription(message + " 🎫")
          .setFooter({
            text: `${interaction.guild.name}`,
            iconURL: `${interaction.guild.iconURL()}`,
          });

        await interaction.reply({
          content: `I have sent your ticket message below.`,
          ephemeral: true,
        });
        await interaction.channel.send({
          embeds: [embed],
          components: [select],
        });
        break;
      case "remove":
        if (!data)
          return await interaction.reply(
            `Look like you don't already have a ticket system set`,
            {
              ephemeral: true,
            }
          );
        else {
          await ticket.deleteOne({ Guild: interaction.guild.id });
          await interaction.reply({
            content: `I have deleted your ticket category.`,
            ephemeral: true,
          });
        }
        break;
      case "setup":
        if (data)
          return await interaction.reply({
            content: `You already have a ticket system setup set to <#${data.Category}>`,
            ephemeral: true,
          });
        else {
          const caterogy = options.getChannel("category");
          await ticket.create({
            Guild: interaction.guild.id,
            Category: caterogy.id,
          });
          await interaction.reply({
            content: `I have set the category tp **${caterogy}**, Use /ticket send to send a ticket create message`,
            ephemeral: true,
          });
        }
    }
  },
};
