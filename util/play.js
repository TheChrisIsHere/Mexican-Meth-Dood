const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, entersState, StreamType, VoiceConnectionStatus } = require('@discordjs/voice')
const ytdl = require('ytdl-core')


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

  player.play(createAudioResource(ytdl(song.url, { highWaterMark: 1 << 25, filter: 'audioonly', format: 'webm' })))

  message.channel.send(`Playing **${serverQueue.songs[0].title}**`)

  player.on(AudioPlayerStatus.Idle, () => {
    stop(message, serverQueue, serverQueue.voiceChannel)
  })

  player.on('error', error => {
    console.log(error)
    message.channel.send("Some Error Occured")
    return;
  })
}

module.exports = { play }