
const { SlashCommandBuilder } = require('@discordjs/builders');

const play = require('../../util/slashPlay').play

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop Your Song.'),
	async execute(interaction, client) {
    const serverQueue = client.queue.get(interaction.guild.id);
        if (!interaction.member.voice.channel && !stopVoice) return interaction.reply("You have to be in a voice channel to stop the music!");

        if (!serverQueue) return interaction.reply("There isn't anything running You Dum Dum")

        serverQueue.songs = []
        serverQueue.connection.destroy()

        interaction.reply("Stopped!!")
    }
};