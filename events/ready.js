module.exports = {
    name: "ready",
    run: (client) => {  
        console.log(`${client.user.username} Is Online!!`)
        client.user.setActivity({ name: "Youtube", type: "STREAMING", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" })
    }
}