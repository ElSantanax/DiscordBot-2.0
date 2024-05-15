
const { Client, GatewayIntentBits, Partials, AllowedMentionsTypes, Presence, Activity, ActivityType, Status, PresenceUpdateStatus } = require("discord.js");
// const { type } = require("os"); // mirar para borrar
// const { parse } = require("path"); // Mirar para borrar
const BotUtils = require("./Utils");
const { Collection } = require('discord.js');

module.exports = class extends Client {
    constructor(options = {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildVoiceStates,
        ],
        Partials: [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction],
        AllowedMentionsTypes: {
            parse: ["roles", "users"],
            repliedUser: false,
        },
        Presence: {
            Activities: [{ name: process.env.STATUS, type: ActivityType[process.env.STATUS_TYPE] }],
            Status: PresenceUpdateStatus.Online
        },
    }) {
        super({
            ...options
        });

        this.commands = new Collection();
        this.slashCommands = new Collection();
        this.slashArray = [];

        this.utils = new BotUtils(this);

        this.start();

    }

    // Inicio ------------------ Start

    async start() {
        await this.loadEvents();
        await this.loadHandlers();
        await this.loadCommands();
        await this.loadSlashCommands();

        this.login(process.env.BOT_TOKEN);
    }

    // Inicio ------------------ loadCommands

    async loadCommands() {
        console.log(`(${process.env.PREFIX}) Cargando comandos`.yellow); // instalar la extensión -> npm i colors@1.4.0
        await this.commands.clear();

        const RUTA_ARCHIVOS = await this.utils.loadFiles("/src/comandos");

        if (RUTA_ARCHIVOS.length) {
            RUTA_ARCHIVOS.forEach((rutaArchivos) => {
                try {
                    const COMANDO = require(rutaArchivos);
                    const NOMBRE_COMANDO = rutaArchivos.split("\\").pop().split("/").pop().split(".")[0];
                    COMANDO.NAME = NOMBRE_COMANDO;

                    if (NOMBRE_COMANDO) this.commands.set(NOMBRE_COMANDO, COMANDO);

                } catch (e) {
                    console.log(`ERROR AL MOSTRAR ${rutaArchivos}`.bgRed);
                }
            });
        }
        console.log(`(${process.env.PREFIX}) ${this.commands.size} Comandos Cargados`.green); // instalar la extensión -> npm i colors@1.4.0
    }

    // Inicio ------------------ loadSlashCommands

    async loadSlashCommands() {
        console.log(`(/) Cargando comandos`.yellow); // instalar la extensión -> npm i colors@1.4.0
        await this.slashCommands.clear();
        this.slashArray = [];

        const RUTA_ARCHIVOS = await this.utils.loadFiles("/src/slashCommands");

        if (RUTA_ARCHIVOS.length) {
            RUTA_ARCHIVOS.forEach((rutaArchivos) => {
                try {
                    const COMANDO = require(rutaArchivos);
                    const NOMBRE_COMANDO = rutaArchivos.split("\\").pop().split("/").pop().split(".")[0];
                    COMANDO.CMD.name = NOMBRE_COMANDO;

                    if (NOMBRE_COMANDO) this.slashCommands.set(NOMBRE_COMANDO, COMANDO);

                    this.slashArray.push(COMANDO.CMD.toJSON());

                } catch (e) {
                    console.log(`ERROR AL MOSTRAR ${rutaArchivos}`.bgRed);
                }
            });
        }
        console.log(`(/) ${this.slashCommands.size} Comandos Cargados`.green); // instalar la extensión -> npm i colors@1.4.0

        if (this?.application?.commands) {
            this.application.commands.set(this.slashArray);
            console.log(`(/) ${this.slashCommands.size} Comandos Publicados`.green); // instalar la extensión -> npm i colors@1.4.0
        }
    }

    // Inicio ------------------ loadHandlers

    async loadHandlers() {
        console.log(`(-) Cargando comandos`.yellow); // instalar la extensión -> npm i colors@1.4.0

        const RUTA_ARCHIVOS = await this.utils.loadFiles("/src/handlers");

        if (RUTA_ARCHIVOS.length) {
            RUTA_ARCHIVOS.forEach((rutaArchivos) => {
                try {
                    require(rutaArchivos)(this);

                } catch (e) {
                    console.log(`ERROR AL MOSTRAR ${rutaArchivos}`.bgRed);
                }
            });
        }
        console.log(`(${process.env.PREFIX}) ${RUTA_ARCHIVOS.length} Handlers Cargados`.green); // instalar la extensión -> npm i colors@1.4.0
    }

    // Inicio ------------------ loadEvents

    async loadEvents() {
        console.log(`(+) Cargando Eventos`.yellow); // instalar la extensión -> npm i colors@1.4.0

        this.removeAllListeners();

        const RUTA_ARCHIVOS = await this.utils.loadFiles("/src/eventos");

        if (RUTA_ARCHIVOS.length) {
            RUTA_ARCHIVOS.forEach((rutaArchivos) => {
                try {
                    const EVENTO = require(rutaArchivos);
                    const NOMBRE_EVENTO = rutaArchivos.split("\\").pop().split("/").pop().split(".")[0];

                    this.on(NOMBRE_EVENTO, EVENTO.bind(null, this))

                } catch (e) {
                    console.log(`ERROR AL MOSTRAR ${rutaArchivos}`.bgRed);
                }
            });
        }
        console.log(`(+) ${RUTA_ARCHIVOS.length} Eventos Cargados`.green); // instalar la extensión -> npm i colors@1.4.0
    }
}








