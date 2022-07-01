const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Display Queue!!',
    aliases: ['q'],
    permissions: [Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK],
    run: async (client, args, message) => {
        const serverQueue = client.queue.get(message.guild.id);
        if(!serverQueue) return message.channel.send("Nothing is Playing!!");

        let vol = parseInt(args[0]);

        if(!vol) return message.channel.send("No Volume Specified!!")

        if(vol > 200) vol = 200;
        if(vol < 0) vol = 0;
        serverQueue.resource.volume.setVolume(vol);
    }
}