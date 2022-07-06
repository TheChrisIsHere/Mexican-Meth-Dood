const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, entersState, StreamType, VoiceConnectionStatus } = require('@discordjs/voice')
const ytdl = require('ytdl-core')
const { MessageEmbed } = require('discord.js')

function play(guild, song, message, client)
{
  const serverQueue = client.queue.get(guild.id);

  if (!song)
  {
    serverQueue.connection.destroy()
    client.queue.delete(guild.id)
    return;
  }

  const player = serverQueue.player
  const connection = serverQueue.connection

  connection.subscribe(player)

  let musicResource = createAudioResource(ytdl(song.url, { highWaterMark: 1 << 25, filter: 'audioonly', format: 'webm' }), {inlineVolume: true})

  player.play(musicResource)
  musicResource.volume.setVolume(serverQueue.defaultvolume);
  serverQueue.resource = musicResource;


  const embed = new MessageEmbed()
  .setTitle(`Playing **${song.title}**`)
  .setDescription(`Discription - ${song.namedObject.description}`)
  .setImage(song.namedObject.thumbnails.high.url)
  .setURL(song.url)
  .setColor('RANDOM')

  message.channel.send({ embeds: [embed] })

  serverQueue.player.on(AudioPlayerStatus.Idle, () => {
    if(serverQueue.loop == true)
    {
      serverQueue.songs.push(serverQueue.songs[0])
    }
    serverQueue.songs.shift();
    play(message, serverQueue, serverQueue.voiceChannel, client)
  })

  serverQueue.player.on('error', error => {
    console.log(error)
    message.channel.send("Some Error Occured")
    return;
  })
}

module.exports = { play }
