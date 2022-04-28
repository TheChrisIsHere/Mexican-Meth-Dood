const discordjs = require('discord.js')
const dotenv = require('dotenv').config();

const client = new discordjs.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'] })
const keepAlive = require('./keepAlive.js')
keepAlive.keepAlive();
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, entersState, StreamType, VoiceConnectionStatus } = require('@discordjs/voice')
const ytdl = require('ytdl-core')
const yt = require('youtube-search')
let opts = {
  maxResults: 2,
  key: process.env.api,
  type: 'video'
};
const prefix = '-'

let queue = new Map();




client.on('ready', () => {
  console.log(`${client.user.username} Is Online!!`)
  client.user.setActivity({ name: "Youtube", type: "STREAMING", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" })
})



//Main Code



client.on('messageCreate', message => {

  const serverQueue = queue.get(message.guild.id);

  const args = message.content.trim().slice(prefix.length).split(" ")

  const command = args.shift().toLowerCase()

  if (!message.content.startsWith(prefix)) return;

if (command == 'play') {
  run(message, serverQueue)
}

else if (command == 'stop') {
  stop(message, serverQueue)
}

else if (command == 'skip') {
  skip(message, serverQueue)
}
    




})



client.login(process.env.token)


async function run(message, serverQueue)
{
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;

  if (!voiceChannel) return message.reply("Join A VC First You Dum Dum");

  if(!discordjs.Permissions.FLAGS.CONNECT && !discordjs.Permissions.FLAGS.SPEAK) return message.reply("I dont Have Proper Permissions");

  yt(args.join(' '), opts, function(err, results) {
    if (err) {
      console.log(err)
      return message.reply("Cant find that music")
    }

    player = createAudioPlayer();

    connection = joinVoiceChannel({
      channelId: message.member.voice.channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    song = {
      title: results[0].title,
      url: results[0].link
    }


    if (!serverQueue)
    {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        player: null,
        connection: null,
        songs: [],
        volume: 50,
        playing: false
      };


      queue.set(message.guild.id, queueContruct);

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


        play(message.guild, queueContruct.songs[0], message)


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

function play(guild, song, message)
{
  const serverQueue = queue.get(guild.id);

  if (!song)
  {
    serverQueue.connection.destroy()
    queue.delete(guild.id)
    return;
  }

  const player = serverQueue.player
  const connection = serverQueue.connection

  connection.subscribe(player)

  player.play(createAudioResource(ytdl(song.url, { highWaterMark: 1 << 25, filter: 'audioonly', format: 'webm' })))

  message.channel.send(`Playing **${serverQueue.songs[0].title}**`)

  player.on(AudioPlayerStatus.Idle, () => {
    serverQueue.songs.shift()
    play(guild, serverQueue.songs[0], message)
  })

  player.on('error', error => {
    console.log(error)
    message.channel.send("Some Error Occured")
    return;
  })
}

function stop(message, serverQueue)
{
  if (!message.member.voice.channel) return message.channel.send("You have to be in a voice channel to stop the music!");

  if (!serverQueue) return message.channel.send("There isn't anything running You Dum Dum")

  serverQueue.songs = []
  serverQueue.connection.destroy()

  message.channel.send("Stopped!!")
}
function skip(message, serverQueue)
{
  if (!message.member.voice.channel) return message.channel.send("You have to be in a voice channel to skip the music!");

  if (!serverQueue) return message.channel.send("There isn't anything running You Dum Dum")

  serverQueue.songs.shift()
    play(message.guild, serverQueue.songs[0], message)

}






/* if (!args) return message.reply("Gimme Something To Play You Dum Dum");
    if (playing == true) return message.reply("I am Already Playing A Music And Queue Will Come In Next Part You Dum Dum");

    if (!message.member.voice.channel) return message.reply("Join A VC First You Dum Dum");

    yt(args.join(' '), opts, function(err, results) {
      if (err) {
        console.log(err)
        return message.reply("Cant find that music")
      }

      player = createAudioPlayer();

      connection = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });

      song = {
        title: results[1].title,
        url: results[1].link
      }


      let music = createAudioResource(ytdl(song.url, { highWaterMark: 1 << 25, filter: 'audioonly', format: 'webm' }))

      connection.subscribe(player)

      player.play(music)

      playing = true;

      message.reply(`Playing **${song.title}**`)

       });
      */














