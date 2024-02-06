const {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
  ChannelType,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
} = require("discord.js");

const ticket = require("../../schemas/ticketSchema");
const { createTranscript } = require("discord-html-transcripts");

module.exports = async (interaction, client) => {
  if (!interaction) {
    console.error("interaction is undefined");
    return;
  }

  if (interaction.customId == "ticketCreateSelect") {
    const user = interaction.user;
    const existingChannel = interaction.guild.channels.cache.find(
      (channel) => channel.name === `ticket-${user.id}`
    );
    const erEmbed = new EmbedBuilder()
      .setColor("DarkRed")
      .setTitle(`Ticket Error`)
      .setDescription(`You already have a ticket open at: ${existingChannel}`)
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });
    if (existingChannel)
      return await interaction.reply({
        embeds: [erEmbed],
        ephemeral: true,
      });

    const modal = new ModalBuilder()
      .setTitle(`Create your ticket`)
      .setCustomId("ticketModal");

    const why = new TextInputBuilder()
      .setCustomId("whyTicket")
      .setRequired(true)
      .setLabel("Title of the issue")
      .setPlaceholder("Please provide if it's Discord or In-Game related.")
      .setStyle(TextInputStyle.Short);

    const info = new TextInputBuilder()
      .setCustomId("infoTicket")
      .setRequired(true)
      .setLabel("Please explain your issue.")
      .setPlaceholder("Please provide as much information as possible.")
      .setStyle(TextInputStyle.Paragraph);

    const one = new ActionRowBuilder().addComponents(why);
    const two = new ActionRowBuilder().addComponents(info);

    modal.addComponents(one, two);
    await interaction.showModal(modal);
  } else if (interaction.customId == "ticketModal") {
    const user = interaction.user;
    const data = await ticket.findOne({ Guild: interaction.guild.id });
    if (!data)
      return await interaction.reply({
        content: `sorry looks like you found this message but the ticket system is not setup yet setup here.`,
        ephemeral: true,
      });
    else {
      const why = interaction.fields.getTextInputValue("whyTicket");
      const info = interaction.fields.getTextInputValue("infoTicket");
      const category = await interaction.guild.channels.cache.get(
        data.Category
      );

      const channel = await interaction.guild.channels.create({
        name: `ticket-${user.id}`,
        type: ChannelType.GuildText,
        topic: `Ticket user: ${user.username}; ticket reason: ${why}`,
        parent: category,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: interaction.user.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
              PermissionsBitField.Flags.ReadMessageHistory,
            ],
          },
        ],
      });
      const embed = new EmbedBuilder()
        .setColor("DarkGreen")
        .setTitle(`Ticket from ${user.username} 🎫`)
        .setDescription(
          `>>> **User:**\n\n \`${user.username}\` \n\n
           **Subject:**\n\n \`${why} \` \n\n
           **Information:**\n\n \`${info}\``
        )
        .setTimestamp()
        .setFooter({
          text: "By Yggdrasil-Bot | made by _Momonga_",
          iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
        });

      const sEmbed = new EmbedBuilder()
        .setColor("DarkGreen")
        .setTitle(`Need help !`)
        .setDescription(`Someone needs help in ${channel}`)
        .setTimestamp()
        .setFooter({
          text: "By Yggdrasil-Bot | made by _Momonga_",
          iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
        });

      const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("closeTicket")
          .setLabel("Close Ticket")
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId("ticketTranscript")
          .setLabel("Transcript")
          .setStyle(ButtonStyle.Primary)
      );

      const { ticket_channel } = require("../../json/helpChannel.json");
      const channelID = ticket_channel;
      const sChannel = member.guild.channels.cache.get(channelID);

      await channel.send({ embeds: [embed], components: [button] });
      await sChannel.send({ embeds: [sEmbed], content: `@here` });

      const otEmbed = new EmbedBuilder()
        .setColor("DarkGreen")
        .setTitle(`Ticket Opened`)
        .setDescription(`Your ticket has been opened in ${channel}`)
        .setTimestamp()
        .setFooter({
          text: "By Yggdrasil-Bot | made by _Momonga_",
          iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
        });
      await interaction.reply({
        embeds: [otEmbed],
        ephemeral: true,
      });
    }
  } else if (interaction.customId == "closeTicket") {
    const closeModal = new ModalBuilder()
      .setTitle(`Ticket closing`)
      .setCustomId("closeTicketModal");

    const reason = new TextInputBuilder()
      .setCustomId("closeReasonTicket")
      .setRequired(true)
      .setPlaceholder("What is the reason for closing this ticket ?")
      .setLabel("Provide a closing reason")
      .setStyle(TextInputStyle.Paragraph);

    const one = new ActionRowBuilder().addComponents(reason);

    closeModal.addComponents(one);
    await interaction.showModal(closeModal);
  } else if (interaction.customId == "closeTicketModal") {
    var channel = interaction.channel;
    var name = channel.name;
    name = name.replace("ticket-", "");
    const member = await interaction.guild.members.cache.get(name);

    const reason = interaction.fields.getTextInputValue("closeReasonTicket");
    const cEmbed = new EmbedBuilder()
      .setColor("DarkOrange")
      .setTitle(`Ticket Closed`)
      .setDescription("Closing this ticket...")
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });
    await interaction.reply({
      embeds: [cEmbed],
      ephemeral: true,
    });

    const nEmbed = new EmbedBuilder()
      .setColor("DarkGreen")
      .setTitle(`Ticket Closed`)
      .setDescription(
        `You are receiving this notification because your ticket in **${interaction.guild.name}** has been closed for: \n\n \`${reason}\``
      )
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });
    setTimeout(async () => {
      await channel.delete().catch(() => {});
      await member.send({ embeds: [nEmbed] }).catch(() => {});
    }, 5000);
  } else if (interaction.customId == "ticketTranscript") {
    const file = await createTranscript(interaction.channel, {
      limit: -1,
      returnBuffer: false,
      filename: `${interaction.channel.name}.html`,
    });

    var msg = await interaction.channel.send({
      content: `Your transcript cache:`,
      files: [file],
    });
    const tEmbed = new EmbedBuilder()
      .setColor("Purple")
      .setTitle(` 📜 [ Ticket Transcript ]`)
      .setURL(
        `https://mahto.id/chat-exporter?url=${msg.attachments.first()?.url}`
      );
    await msg.delete().catch(() => {});
    await interaction.reply({ embeds: [tEmbed] });
  }
};
