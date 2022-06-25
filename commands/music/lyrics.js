const { Permissions, MessageEmbed } = require('discord.js'),
    fetch = require('node-fetch');

module.exports = {
    name: 'lyrics',
    description: 'Search For Lyrics of Songs!!',
    aliases: ['l'],
    permissions: [Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK],
    run: async (client, args, message) => {
        const serverQueue = client.queue.get(message.guild.id);
        let song = "";
        if(args.length != 0)
        {
            song = args.join(" ");
        }
        else if(serverQueue != null)
        {
            song = serverQueue.songs[0].title
        }

        if(song === "") return message.reply("Nothing is playing rn!!")

        const json = await fetch(`https://api.popcat.xyz/lyrics?song=${encodeURIComponent(song)}`).then(r => r.json())

        if(json.error) return message.reply("Lyrics Not Found!!");

        if(json.lyrics.length > 4096)
        {
            message.reply(`Lyrics are bigger than 4096, Please visit https://api.popcat.xyz/lyrics?song=${encodeURIComponent(song)} for Lyrics!!`)
            return;
        }

        

        const embed = new MessageEmbed()
        .setTitle(json.title)
        .setThumbnail(json.image)
        .setColor("RANDOM")
        .addFields({ name: "Artist(s)", value: json.artist })
        .setDescription(`Lyrics: **\n\n${json.lyrics}**`)

        message.channel.send({embeds: [embed]})
    }
}