const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, entersState, StreamType, VoiceConnectionStatus } = require('@discordjs/voice')
const ytdl = require('ytdl-core')


function play(guild, song, interaction, client)
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

  interaction.reply(`Playing **${serverQueue.songs[0].title}**`)

  player.on(AudioPlayerStatus.Idle, () => {
    stop(message, serverQueue, serverQueue.voiceChannel)
  })

  player.on('error', error => {
    console.log(error)
    interaction.reply("Some Error Occured")
    return;
  })
}

module.exports = { play }