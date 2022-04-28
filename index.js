const discordjs = require('discord.js')
const dotenv = require('dotenv').config();

const client = new discordjs.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'] })



const keepAlive = require('./keepAlive.js')

keepAlive.keepAlive();

let playing = false;

let player;

const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, entersState, StreamType, VoiceConnectionStatus } = require('@discordjs/voice')





const ytdl = require('ytdl-core')
const yt = require('youtube-search')



let opts = {
  maxResults: 2,
  key: process.env.api,
  type: 'video'
};

const prefix = '-'




client.on('ready', () => {
  console.log(`${client.user.username} Is Online!!`)

})



client.on('messageCreate', message => {

  const args = message.content.trim().slice(prefix.length).split(" ")

  const command = args.shift().toLowerCase()

  if (!message.content.startsWith(prefix)) return;

if (command == 'play') {
    if (!args) return message.reply("Gimme Something To Play You Dum Dum");
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





  } else if (command == 'stop') {
    if (playing == false) return message.reply("I Am Not Playing Any Music You Dum Dum");
  }

  if (player) {
    player.stop
    playing = false;
  } else {
    return;
  }




})



client.login(process.env.token)

