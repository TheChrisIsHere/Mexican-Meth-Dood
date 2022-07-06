const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'volume',
    description: 'Display Queue!!',
    aliases: ['vol'],
    permissions: [Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK],
    run: async (client, args, message) => {
        const serverQueue = client.queue.get(message.guild.id);
        if(!serverQueue) return message.channel.send("Nothing is Playing!!");

        let vol = parseInt(args[0]);

        if(!vol) return message.channel.send("No Volume Specified!!")

        if(vol > 200) vol = 200;
        if(vol < 0) vol = 0;
        vol = vol / 100

        if(args[0] == 0)
        {
            vol = 0
        }
        serverQueue.resource.volume.setVolume(vol);
        return message.reply(`New Volume is ${vol}`)
    }
}