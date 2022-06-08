const fs = require('fs')
module.exports = (client, path) => {
    //Load Events
    const CommandsFolder = fs.readdirSync(`${path}/events`).filter(file => file.endsWith('.js'))
    for (file of CommandsFolder)
    {
        const event = require(`../events/${file}`)
        console.log(`Loaded ${event.name} Event!!`)
        if(!event.name) return console.error(`Name Not Given In ${file}`)
        client.on(event.name, (...args) => {
            event.run(client, ...args)
        })
    }
}