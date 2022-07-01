const { Permissions, MessageEmbed } = require('discord.js'),
    fetch = require('node-fetch');

module.exports = {
    name: 'loop',
    description: 'Toggle Loop On Or Off!!',
    aliases: [],
    permissions: [Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK],
    run: async (client, args, message) => {
        const serverQueue = client.queue.get(message.guild.id);
        if(!serverQueue) return message.channel.send("Nothing is Playing!!");

        serverQueue.loop = !serverQueue.loop;
        let a = "";
        serverQueue.loop == true ? a = "On" : a = "Off";

        return message.reply("Loop is now " + a + "!!")
    }
}