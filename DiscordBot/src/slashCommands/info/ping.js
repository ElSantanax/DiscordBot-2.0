
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
        .setDescription("Sirve para ver el ping del bot"),

    async execute(client, interaction, prefix) {
        return interaction.reply(`\`${client.ws.ping}ms\``);
    }
};



// PERMISSIONS: ["Administrator", "KickMembers", "BanMembers"],
// BOT_PERMISSIONS: ["Administrator", "KickMembers", "BanMembers"],
// OWNER: true,