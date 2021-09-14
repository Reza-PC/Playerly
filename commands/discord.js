const Discord = require ('discord.js')

module.exports = {
    name: 'discord',
    description: 'Send discord support server.',
    execute (message, args, client) {
        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        message.channel.send(new Discord.MessageEmbed()
        .setTitle ('🟣 Playerly | Discord')
        .setColor ('#a14cd9')
        .setDescription (`${TICK} [Support Server](https://discord.gg/zuHUX3YBwu)`)
        .setFooter (`Thanks ${message.member.user.username}`) 
        )
        .then(message.react('💜'))
    }
}