
const { MessageActivityType, EmbedBuilder } = require("discord.js");

module.exports = {
    DESCRIPTION: "Recargar los archivos del bot.",
    OWNER: true,

    async execute(client, message, args, prefix) {
        let option = "Comandos, Eventos y Handlers";

        try {
            switch (args[0]?.toLowerCase()) {
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

            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .addFields({ name: `✅ ${option} Recargados`, value: `> *Okay!*` })
                        .setColor(process.env.COLOR)
                ]
            })

        } catch (e) {
            message.reply({ content: `**Ha ocurrido un error al cargar los archivos** \n*Mira la consola para más detalles*` });
            console.log(e);
        }
    }
}