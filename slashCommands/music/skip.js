const { SlashCommandBuilder } = require('@discordjs/builders');

const play = require('../../util/slashPlay').play

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip Your Song.'),
	async execute(interaction, client) {

        const serverQueue = client.queue.get(interaction.guild.id);
    if (!interaction.member.voice.channel) return interaction.reply("You have to be in a voice channel to skip the music!");

    if (!serverQueue) return interaction.reply("There isn't anything running You Dum Dum")
  
    serverQueue.songs.shift()
    play(interaction.guild, serverQueue.songs[0], interaction, client)
    }
};