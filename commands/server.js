const Discord = require ('discord.js')
const moment = require ('moment')
module.exports = {
    name: 'server',
    description: `Show's the server information`,
    execute (message, args, client) {
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
            setTimeout(function(){
              message.delete().then(message =>{
                setTimeout(function(){
                    message.channel.send(new Discord.MessageEmbed()
                    .setTitle ('🟣 Playerly | Server Info')
                    .setColor ('#a14cd9')
                    .setThumbnail (client.user.avatarURL())
                    .setFooter (`${message.author.username}`, `${client.user.avatarURL()}`)
                    .addFields(
                      {name: '🌐 | Server Region', value: '`' + message.guild.region + '`', inline:true},
                      {name: '📆 | Server Created Date', value:'`' + moment(message.member.guild.createdAt).format('YYYY/MM/DD') + '`'  ,inline:true},
                      {name: '🎭 | Server Roles' , value: '`' + message.guild.roles.cache.size + '`', inline:true},
                      {name: '\u200b', value: '\u200b'},
                      {name: '📫 | Server Channels :', value: 'Categories :`' + message.guild.channels.cache.filter(c => c.type === 'category').size + '`\nText Channels :`' + message.guild.channels.cache.filter(t => t.type === 'text').size + '`\nVoice Channels :`' + message.guild.channels.cache.filter(v => v.type === 'voice').size + '`', inline:true},
                      {name: '😉 | Server Emojies', value: 'Emojies :`' + message.guild.emojis.cache.size + '`', inline:true},
                      {name: '👑 | Server Owner', value: '<@' + message.guild.owner + '>', inline:true}
                    )
                  )
                },2200)
              })
            },2000)
        })
    }
}