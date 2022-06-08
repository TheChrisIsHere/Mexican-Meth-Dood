const { Permissions } = require('discord.js')
const play = require('../../util/play').play
module.exports = {
    name: 'stop',
    description: 'Stop Your Song',
    aliases: [],
    permissions: [Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK],
    run: (client, args, message) => {
        const serverQueue = client.queue.get(message.guild.id);
        if (!message.member.voice.channel && !stopVoice) return message.channel.send("You have to be in a voice channel to stop the music!");

        if (!serverQueue) return message.channel.send("There isn't anything running You Dum Dum")

        serverQueue.songs = []
        serverQueue.connection.destroy()

        message.channel.send("Stopped!!")
    }
}