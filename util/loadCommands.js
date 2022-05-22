const fs = require('fs')
module.exports = (client, path) => {
    //Load Commands
    const CommandsFolder = fs.readdirSync(`${path}/commands`)
    for (folder of CommandsFolder)
    {
        let commandCategory = fs.readdirSync(`${path}/commands/${folder}`).filter(file => file.endsWith('.js'))
        for(file of commandCategory)
        {
            const command = require(`../commands/${folder}/${file}`)
            console.log(`Loaded ${command.name}!!`)
            if(!command.name) return console.error(`Name Not Given In ${file}`)
            client.commands.set(command.name, command)
            if(command.aliases) client.aliases.set(command.aliases, command.name)
        }
    }
}