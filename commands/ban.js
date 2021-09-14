const Discord = require ('discord.js')
const moment = require ('moment')

module.exports = {
    name: 'ban',
    description: 'Ban user with mention',
    execute (message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
  
        if (!message.member.hasPermission('BAN_MEMBERS'))
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${BAD} You don\'t have permission.\n.شما دسترسی استفاده از این دستور را ندارید`)
            .setColor('#66001b')
            );
        if (!message.guild.me.hasPermission('MANAGE_CHANNELS'))
            return message.channel.send(new Discord.MessageEmbed()
            .setColor('#66001b')
            .setDescription(`${BAD} Oops! Please check my permissions.\n.یک مشکلی وجود دارد! لطفا دسترسی های من را بررسی کنید`)
            )
    
        
          let mentionUser = message.mentions.members.first()
          if (!mentionUser)
          return message.channel.send (new Discord.MessageEmbed()
            .setColor ('#66001b')
            .setDescription (`${BAD} Please send some name after command.\n.لطفا بعد از دستور به یک نفر اشاره کنید`)
            )
  
          if(mentionUser.roles.highest.position > message.guild.me.roles.highest.position)
          return message.channel.send (`${BAD} | Oops please check role position`)
    
          if (mentionUser){
            message.member.guild.members.ban(mentionUser)
            .then(message.channel.send(new Discord.MessageEmbed()
    
            .setTitle ('🟣 Playerly | Ban')
            .setColor ('#a14cd9')
            .setFooter (`${message.member.user.username}`, `${client.user.avatarURL()}`)
            .setDescription (`${TICK} ${message.member.user} successfully banned ${mentionUser.user.tag}`)
            .addFields(
              {name: '📥 | Joined server : ', value: '`' +  moment(mentionUser.joinedAt).startOf('minutes').fromNow() + '`'},
              {name: '📬 | From the : ', value: '`' + mentionUser.guild.name + '`'}
          )
        ))
        .then(message.react(`${TICK}`))
        }
    }
}