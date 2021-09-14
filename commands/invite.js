const Discord = require ('discord.js');

module.exports = {
    name: 'invite',
    description: 'Send PlayerlyBot invite link',
    execute (message, args, client) {
        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')
        
        message.channel.send(new Discord.MessageEmbed()
        .setTitle ('🟣 Playerly | Invite')
        .setColor ('#a14cd9')
        .setFooter (`${message.member.user.username}`, `${client.user.avatarURL()}`)
        .setDescription (`${TICK} [Click Here!](https://discord.com/api/oauth2/authorize?client_id=803732720751738901&permissions=2020715764&scope=bot)`)
        .setFooter (`Thanks ${message.member.user.username}`),
        )
        .then(message.react('💜'))
    }
}