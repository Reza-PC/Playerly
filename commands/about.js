const Discord = require ('discord.js')
const {
    bot_about,
} = require ('../config.json');
const moment = require ('moment')

module.exports = {
    name: 'about',
    description: `Send bot stats for users.`,
    execute (message, args, client) {

        let cpu = Math.round(process.cpuUsage().system)
        message.channel.send(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | About')
            .setColor ('#a14cd9')
            .setThumbnail (client.user.avatarURL({dynamic:true}))
            .setFooter (`${message.member.user.username}`, `${client.user.avatarURL()}`)
            .addFields(
            {name: '\u200b', value: '\u200b'},
            {name: 'Time Created :', value: '`' + moment(client.user.createdAt).format('yyyy/mm/d') + '`\n`' + moment(client.user.createdAt).startOf('day').fromNow() + '`', inline:true},
            {name: 'Stats :', value: 'Servers :`' + client.guilds.cache.size + '`\nChannels :`' + client.channels.cache.size + '`', inline:true},
            {name: 'Language :', value: '`NodeJS`', inline:true},
            {name: '\u200b', value: '\u200b'},
            {name: 'Owner :', value: '`RezaPC\nWronG`', inline:true},
            {name: 'Ping :', value: '`' + client.ws.ping + ' MS`', inline:true},
            {name: 'System Stats :', value: 'Ram Usage :`' + Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 10) / 10 + ' MB`\nCPU Usage :`' + cpu + '`' , inline:true},
            {name: 'Version :', value: '`' + bot_about.version + '`'}
            )
            )
    }
}