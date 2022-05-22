const { Permissions } = require('discord.js')
const play = require('../../util/play').play

module.exports = {
    name: 'skip',
    description: 'Skip Your Song',
    aliases: [],
    permissions: [Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK],
    run: (client, args, message) => {
        const serverQueue = client.queue.get(message.guild.id);
        if (!message.member.voice.channel) return message.channel.send("You have to be in a voice channel to skip the music!");

        if (!serverQueue) return message.channel.send("There isn't anything running You Dum Dum")
      
        serverQueue.songs.shift()
        play(message.guild, serverQueue.songs[0], message, client)
    }
}