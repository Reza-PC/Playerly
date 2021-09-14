const Discord = require ('discord.js')

module.exports = {
    name: 'instagram',
    description: 'Send official playerly instagram.',
    execute (message, args, client){

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')

        message.channel.send (new Discord.MessageEmbed()
            .setColor('#69beff')
            .setDescription (`${LOADING} Loading..`)
            )
            .then(message =>{
                setTimeout(function (){
                    message.delete()
                    .then(message =>{
                        setTimeout(function (){
                            message.channel.send(new Discord.MessageEmbed()
                                .setColor ('#a14cd9')
                                .setDescription (`${TICK} [Click Here!](https://www.instagram.com/playerly.ir/?hl=en)`)
                            )
                        },1500)
                    })
                },1200)
            })
    }
}