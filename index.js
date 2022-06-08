const discordjs = require('discord.js')
require('dotenv').config();

const client = new discordjs.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'] })
require('./util/keepAlive.js').keepAlive()
const path = require('path')







//GLOBAL VARIABLES

client.slashCommands = new discordjs.Collection();
client.commands = new discordjs.Collection()
client.queue = new Map()
client.prefix = '-'
client.aliases = new discordjs.Collection()

//Make Path
const fullPath = path.join(__dirname, '/')


//Run Handle.js
require('./handler/handle')(client, fullPath)













client.login(process.env.token)














