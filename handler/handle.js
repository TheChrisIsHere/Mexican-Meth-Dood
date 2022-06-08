const fs = require('fs')
module.exports = (client, path) => {
    require('../util/loadCommands')(client, path)
    require('../util/eventsLoad')(client, path)
    require('../util/loadSlashCommands')(client, path)
    

}