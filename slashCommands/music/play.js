const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js')
const play = require('../../util/slashPlay').play
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, entersState, StreamType, VoiceConnectionStatus } = require('@discordjs/voice')
const yt = require('youtube-search')
let opts = {
    maxResults: 1,
    key: process.env.api,
    type: 'video'
  };
  require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play Your Song.')
		.addStringOption(option => option.setName('song').setDescription('Song To Play').setRequired(true)),
	async execute(interaction, client) {
		const serverQueue = client.queue.get(interaction.guild.id);

  const voiceChannel = interaction.member.voice.channel;

  if (!voiceChannel) return interaction.reply({
	  content: "Join A VC First You Dum Dum",
	  ephemeral: true
  });
  


  yt(interaction.options.getString('song'), opts, function(err, results) {
    if (err) {
      console.log(err)
      return interaction.reply({
		  content: "Cant find that music",
		  ephemeral: true
	  })
    }

    player = createAudioPlayer();

    connection = joinVoiceChannel({
      channelId: interaction.member.voice.channel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    song = {
      title: results[0].title,
      url: results[0].link
    }


    if (!serverQueue)
    {
      const queueContruct = {
        textChannel: interaction.channel,
        voiceChannel: voiceChannel,
        player: null,
        connection: null,
        songs: [],
        volume: 50,
        playing: false
      };


      client.queue.set(interaction.guild.id, queueContruct);

      queueContruct.songs.push(song)

      try {

        player = createAudioPlayer();

        connection = joinVoiceChannel({
          channelId: interaction.member.voice.channel.id,
          guildId: interaction.guild.id,
          adapterCreator: interaction.guild.voiceAdapterCreator,
        });


        queueContruct.player = player;
        queueContruct.connection = connection
        queueContruct.textChannel = interaction.channel
        queueContruct.voiceChannel = voiceChannel


        play(interaction.guild, queueContruct.songs[0], interaction, client)


      } catch (error) {

        interaction.reply("Some Error Occured")
        console.log(error)
        
      }

      

    } else {
      serverQueue.songs.push(song)
      return interaction.reply(`${song.title} Has Been Added To The Queue!!`)
    }

  })

	},
};