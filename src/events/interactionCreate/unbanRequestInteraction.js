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

const unban = require("../../schemas/unbanSchema");

module.exports = async (interaction, client) => {
  if (!interaction) {
    console.error("interaction is undefined");
    return;
  }

  if (interaction.customId == "unbanRequestBtn") {
    const user = interaction.user;
    const existingChannel = interaction.guild.channels.cache.find(
      (channel) => channel.name === `unban-${user.id}`
    );
    const unEmbed = new EmbedBuilder()
      .setColor("DarkRed")
      .setTitle(`Unban request Error`)
      .setDescription(
        `You already have a unban request open at: ${existingChannel}`
      )
      .setFooter({
        text: "By Yggdrasil-Bot | made by _Momonga_",
        iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
      });
    if (existingChannel)
      return await interaction.reply({
        embeds: [unEmbed],
        ephemeral: true,
      });

    const modal = new ModalBuilder()
      .setTitle(`Create your unban request`)
      .setCustomId("unbanModal");

    const why = new TextInputBuilder()
      .setCustomId("whyUnban")
      .setRequired(true)
      .setLabel("Reason of you're ban")
      .setPlaceholder("Please provide why you are ban.")
      .setStyle(TextInputStyle.Short);

    const info = new TextInputBuilder()
      .setCustomId("infoUnban")
      .setRequired(true)
      .setLabel("Provide unban reason")
      .setPlaceholder("Please provide why you want to be unban")
      .setStyle(TextInputStyle.Paragraph);

    const one = new ActionRowBuilder().addComponents(why);
    const two = new ActionRowBuilder().addComponents(info);

    modal.addComponents(one, two);
    await interaction.showModal(modal);
  } else if (interaction.customId == "unbanModal") {
    const user = interaction.user;
    const data = await unban.findOne({ Guild: interaction.guild.id });
    if (!data)
      return await interaction.reply({
        content: `sorry looks like you found this message but the unban system is not setup yet setuZp here.`,
        ephemeral: true,
      });
    else {
      const why = interaction.fields.getTextInputValue("whyUnban");
      const info = interaction.fields.getTextInputValue("infoUnban");
      const category = await interaction.guild.channels.cache.get(
        data.Category
      );

      const channel = await interaction.guild.channels.create({
        name: `unban-${user.id}`,
        type: ChannelType.GuildText,
        topic: `unban user: ${user.username}; unban reason: ${why}`,
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
        .setTitle(`unban from ${user.username}`)
        .setDescription(
          `>>> **User:**\n\n \`${user.username}\` \n\n
             **Ban:**\n \`${why} \` \n\n
             **Unban reason:**\n\n \`${info}\``
        )
        .setTimestamp()
        .setFooter({
          text: "By Yggdrasil-Bot | made by _Momonga_",
          iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
        });

      const sEmbed = new EmbedBuilder()
        .setColor("DarkGreen")
        .setTitle(`Unban request`)
        .setDescription(`Someone want to be unban in ${channel}`)
        .setTimestamp()
        .setFooter({
          text: "By Yggdrasil-Bot | made by _Momonga_",
          iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
        });

      const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("closeUnban")
          .setLabel("Close unban request")
          .setStyle(ButtonStyle.Danger)
      );

      const { unban_channel } = require('../../json/helpChannel.json')
      const sChannel = unban_channel

      await channel.send({ embeds: [embed], components: [button] });
      await sChannel.send({ embeds: [sEmbed], content: `@here` });

      const otEmbed = new EmbedBuilder()
        .setColor("DarkGreen")
        .setTitle(`Unban Request Opened`)
        .setDescription(`Your unban request has been opened in ${channel}`)
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
  } else if (interaction.customId == "closeUnban") {
    const admin = interaction.guild.members.cache.get(interaction.user.id);
    const { admin_role } = require('../../json/roles.json')
    const adminRoleId = admin_role
    if (admin.roles.cache.has(adminRoleId)) {
      var channel = interaction.channel;
      var name = channel.name;
      name = name.replace("unban-", "");

      const cEmbed = new EmbedBuilder()
        .setColor("DarkOrange")
        .setTitle(`Unban Closed`)
        .setDescription("Closing this unban request...")
        .setFooter({
          text: "By Yggdrasil-Bot | made by _Momonga_",
          iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
        });
      await interaction.reply({
        embeds: [cEmbed],
        ephemeral: true,
      });

      setTimeout(async () => {
        await channel.delete().catch(() => {});
      }, 5000);
    } else {
      const aoEmbed = new EmbedBuilder()
        .setTitle("Only admin can close this unban request channel.")
        .setColor("DarkRed")
        .setFooter({
          text: "By Yggdrasil-Bot | made by _Momonga_",
          iconURL: "https://www.momonga-web.dev/src/images/logo_black_nobg.png",
        });
      await interaction.reply({
        embeds: [aoEmbed],
        ephemeral: true,
      });
    }
  }
};
