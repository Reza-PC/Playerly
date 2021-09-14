const Discord = require ('discord.js')

module.exports = {
    name: 'avatar',
    description: 'Send profile user avatar.',
    execute (message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')

        let userMention = message.mentions.members.first()

        if (!userMention){
          message.channel.send(new Discord.MessageEmbed()
          .setTitle (`${message.member.user.username} | Avatar`)
          .setColor ('#a14cd9')
          .setImage (`${message.member.user.avatarURL({size: 1024, dynamic:true, format: 'webp'})}`)
          .setFooter (`${message.member.user.username}`, `${client.user.avatarURL()}`)
          ).then(message =>{
            message.react('🖼')
          })
        }
        if (userMention){
          message.channel.send(new Discord.MessageEmbed()
          .setTitle (`${userMention.user.username} | Avatar`)
          .setColor ('#a14cd9')
          .setImage (`${userMention.user.avatarURL({size: 1024, dynamic:true, format: 'webp'})}`)
          .setFooter (`${message.member.user.username}`, `${client.user.avatarURL()}`)
          ).then(message =>{
            message.react('🖼')
          })
        }
    }
}