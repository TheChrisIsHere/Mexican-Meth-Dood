const { Permissions } = require('discord.js')
const play = require('../../util/play').play
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, entersState, StreamType, VoiceConnectionStatus } = require('@discordjs/voice')
const yt = require('youtube-search')
let opts = {
    maxResults: 1,
    key: process.env.api,
    type: 'video'
  };
  require('dotenv').config();

const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'play',
    description: 'Play Your Song',
    aliases: ['p'],
    permissions: [Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK],
    run: (client, args, message) => {
      const serverQueue = client.queue.get(message.guild.id);
        const args2 = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;

  if (!voiceChannel) return message.reply("Join A VC First You Dum Dum");


  yt(args2.join(' '), opts, function(err, results) {
    if (err) {
      console.log(err)
      return message.reply("Cant find that music")
    }

    song = {
      title: results[0].title,
      url: results[0].link,
      namedObject: results[0]
    }


    if (!serverQueue)
    {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        player: null,
        connection: null,
        songs: [],
        defaultvolume: 100 / 100,
        loop: false,
        resource: null
      };

      client.queue.set(message.guild.id, queueContruct);

      queueContruct.songs.push(song)

      try {

        player = createAudioPlayer();

        connection = joinVoiceChannel({
          channelId: message.member.voice.channel.id,
          guildId: message.guild.id,
          adapterCreator: message.guild.voiceAdapterCreator,
        });


        queueContruct.player = player;
        queueContruct.connection = connection
        queueContruct.textChannel = message.channel
        queueContruct.voiceChannel = voiceChannel


        play(message.guild, queueContruct.songs[0], message, client)


      } catch (error) {

        message.channel.send("Some Error Occured")
        console.log(error)
        
      }

      

    } else {
      serverQueue.songs.push(song)
      return message.channel.send(`${song.title} Has Been Added To The Queue!!`)
    }

  })
    }
}