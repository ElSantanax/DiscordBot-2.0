
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
        .setDescription("Recarga los archivos del bot")
        .addStringOption(option =>
            option.setName("modulo")
                .setDescription("Módulo a recargar")
                .addChoices(
                    { name: "Comandos", value: "comandos" },
                    { name: "Comandos Diagonales", value: "slash" },
                    { name: "Eventos", value: "events" },
                    { name: "Handlers", value: "handlres" },
                )
        ),

    async execute(client, interaction, prefix) {
        let args = interaction.options.getString("modulo");
        let option = "Comandos, Eventos y Handlers";

        try {
            switch (args?.toLowerCase()) {
                case "commands":
                case "comandos": {
                    option = "Comandos"
                    await client.loadCommands();
                }

                    break

                case "slashCommands":
                case "slash": {
                    option = "Comandos Diagonales"
                    await client.loadSlashCommands();
                }

                    break

                case "handlers": {
                    option = "Handlers"
                    await client.loadHandlers();
                }

                    break

                case "events":
                case "eventos": {
                    option = "Eventos"
                    await client.loadEvents();
                }
                    break;

                default: {
                    await client.loadEvents();
                    await client.loadHandlers();
                    await client.loadSlashCommands();
                    await client.loadCommands();

                }
                    break;
            }

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .addFields({ name: `✅ ${option} Recargados`, value: `> *Okay!*` })
                        .setColor(process.env.COLOR)
                ]
            })

        } catch (e) {
            interaction.reply({ content: `**Ha ocurrido un error al cargar los archivos** \n*Mira la consola para más detalles*` });
            console.log(e);
        }
    }
}


