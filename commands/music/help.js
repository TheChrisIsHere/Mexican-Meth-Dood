const { Permissions, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js'),
    fetch = require('node-fetch');

module.exports = {
    name: 'help',
    description: 'Show Help Menu!!',
    aliases: ['h'],
    permissions: [Permissions.FLAGS.SEND_MESSAGES],
    run: async (client, args, message) => {
        const helpMenu = client.helpEmbeds.get("HelpMenu")[0]
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setEmoji('⬅️')
            .setCustomId(`help_previous ${message.member.id} ${helpMenu.embedNumber}`)
            .setStyle('PRIMARY'),
            new MessageButton()
            .setEmoji('➡️')
            .setCustomId(`help_next ${message.member.id} ${helpMenu.embedNumber}`)
            .setStyle('PRIMARY'),
            
        )
        message.reply({ embeds: [helpMenu.embed], components: [row] })
        
    }
}