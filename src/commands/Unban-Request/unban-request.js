const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionsBitField,
    ActionRowBuilder,
    ChannelType,
    ButtonBuilder,
    ButtonStyle
  } = require("discord.js");
  
  const unban = require("../../schemas/unbanSchema");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("unban-request")
      .setDescription("Manage the unban system.")
      .addSubcommand((command) =>
        command
          .setName("send")
          .setDescription("Send the unban message.")
          .addStringOption((option) =>
            option
              .setName("text")
              .setDescription("Open a unban.")
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
          .setDescription("Setup the unban category.")
          .addChannelOption((option) =>
            option
              .setName("category")
              .setDescription("The caterogy to send tickets in.")
              .addChannelTypes(ChannelType.GuildCategory)
              .setRequired(true)
          )
      )
      .addSubcommand((command) =>
        command.setName("remove").setDescription("Disable the unban system.")
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
  
    run: async ({ interaction }) => {
      const { options } = interaction;
      const sub = options.getSubcommand();
      const data = await unban.findOne({ Guild: interaction.guild.id });
  
      switch (sub) {
        case "send":
          if (!data)
            return await interaction.reply({
              content: `You have to do /unban setup first!`,
              ephemeral: true,
            });
          const text = options.getString("text");
          var message =
            options.getString("message") ||
            ">>> Create an unban request to talk with the server staff! Once you click below, use the input to describe why you are creating an unban request."
  
          const select = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("unbanRequestBtn")
              .setLabel(`${text}`)
              .setStyle(ButtonStyle.Primary)
          );
          const embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle(`Create a unban !`)
            .setDescription(message + " \n\n**Note:** Please be patient and respectful while we help you.")
            .setFooter({
              text: "By Yggdrasil-Bot | made by _Momonga_",
              iconURL: "https://cdn.discordapp.com/app-icons/1186362076084568074/f21b6cde064b4f566e493f9a13d18a3f.png",
            })
  
          await interaction.reply({
            content: `I have sent your unban request message below.`,
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
              `Look like you don't already have a unban request system set`,
              {
                ephemeral: true,
              }
            );
          else {
            await unban.deleteOne({ Guild: interaction.guild.id });
            await interaction.reply({
              content: `I have deleted your unban request category.`,
              ephemeral: true,
            });
          }
          break;
        case "setup":
          if (data)
            return await interaction.reply({
              content: `You already have a unban request system setup set to <#${data.Category}>`,
              ephemeral: true,
            });
          else {
            const caterogy = options.getChannel("category");
            await unban.create({
              Guild: interaction.guild.id,
              Category: caterogy.id,
            });
            await interaction.reply({
              content: `I have set the category to **${caterogy}**, Use /unban send to send a unban create message`,
              ephemeral: true,
            });
          }
      }
    },
    adminOnly: true,
  };
  