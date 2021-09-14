const Discord = require ('discord.js')

module.exports = {
    name: 'unmute',
    description: 'Unmute users.',
    execute (message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')

        if (!message.member.hasPermission('MANAGE_ROLES'))
        return message.channel.send(new Discord.MessageEmbed()
          .setDescription(`${BAD} You don\'t have permission.\n.شما دسترسی استفاده از این دستور را ندارید`)
          .setColor('#66001b')
          );

        if (!message.guild.me.hasPermission('MANAGE_ROLES'))
        return message.channel.send(new Discord.MessageEmbed()
        .setColor('#66001b')
        .setDescription(`${BAD} Oops! Please check my permissions.\n.یک مشکلی وجود دارد! لطفا دسترسی های من را بررسی کنید`)
        )

        const muteRole = message.guild.roles.cache.find(u => u.name === 'Muted' || u.name === 'Mute')

        let mentionMember = message.mentions.members.first()


        if (!mentionMember)
        return message.channel.send (new Discord.MessageEmbed()
            .setColor ('#66001b')
            .setDescription (`${BAD} Please mention after command.\n.لطفا بعد از دستور به یک کاربر اشاره کنید`)
            )

        if (!mentionMember.roles.cache.has(muteRole))
        return message.channel.send(new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} Member dosen\'t have muted role.\n.عضو اشاره شده رول میوت را ندارد`)
        )

        if(mentionMember.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position)
        return message.channel.send(new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} ${mentionUser} has higher role of me.\n.کاربر ذکر شده نقش بالاتری از من دارد`)
        );

        if (muteRole.position > message.guild.members.resolve(client.user).roles.highest.position)
        return message.channel.send(new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} Muted role is higher than my role.\n.رول میوت از رول من بالاتر است`)
        )


        message.channel.send(new Discord.MessageEmbed()
        .setTitle ('🟣 Playerly | Unmute')
        .setColor ('#a14cd9')
        .setFooter (`${message.member.user.username}`, `${client.user.avatarURL()}`)
        .setDescription (`${TICK} ${message.member.user} Successfully unmuted ${mentionMember.user}`)
        ).then(mentionMember.roles.remove(muteRole))
    }
}