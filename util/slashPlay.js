const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, entersState, StreamType, VoiceConnectionStatus } = require('@discordjs/voice')
const ytdl = require('ytdl-core')

const { MessageEmbed } = require('discord.js')
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
  const embed = new MessageEmbed()
  .setTitle(`Playing **${song.title}**`)
  .setDescription(`Discription - ${song.namedObject.description}`)
  .setImage(song.namedObject.thumbnails.high.url)
  .setURL(song.url)
  .setColor('RANDOM')

  interaction.reply({ embeds: [embed] })

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