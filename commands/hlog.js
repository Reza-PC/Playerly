const Discord = require ('discord.js')

module.exports = {
    name: 'hlog',
    description: 'Logs help.',
    execute (message, args, client) {
        message.channel.send(new Discord.MessageEmbed()
        .setTitle ('🟣 Playerly | Logs (Help)')
        .setColor ('#a14cd9')
        .setFooter (`${message.member.user.username}`, `${client.user.avatarURL()}`)
        .setDescription ('For enable **Logs** just command `.clog` | Playerly create a channel and logs get in the channel. Warning : dont change the logs name channel')
        .setThumbnail (client.user.avatarURL({format: 'png'}))  
        )
    }
}