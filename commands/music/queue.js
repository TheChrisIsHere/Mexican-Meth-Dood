const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Display Queue!!',
    aliases: ['q'],
    permissions: [Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK],
    run: async (client, args, message) => {
        const serverQueue = client.queue.get(message.guild.id);
        if(!serverQueue) return message.channel.send("Nothing is Playing!!");

        let msg = "Songs List!!\n"
        serverQueue.songs.forEach(song => {
            msg += `**${song.title}**\n\n`
        });

        message.channel.send(msg);
    }
}