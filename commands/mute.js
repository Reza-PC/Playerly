const Discord = require ('discord.js')

module.exports = {
    name: 'mute',
    description: 'Mute users',
    execute (message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')

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
        const muteRole = message.guild.roles.cache.find(m => m.name === 'Muted' || m.name === 'Mute')

        if (!muteRole)
        return message.channel.send(new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} The \`Mute / Muted\` role not found.\nرول\`Mute / Muted\` پیدا نشد`)
        ).then(  
        message.guild.roles.create({data : {
        name: 'Muted',
        permissions: ['VIEW_CHANNEL'],
        color: '#ff0000'
        }})).then(message =>{
        setTimeout(function(){
            message.channel.send(new Discord.MessageEmbed()
            .setColor ('#a14cd9')
            .setDescription (`${TICK} ${message.guild.roles.cache.find(f => f.name === 'Muted')} has been created successfully.\nرول ${message.guild.roles.cache.find(f => f.name === 'Muted')} با موفقیت ساخته شد`)
            
            )
        },3000)
        })

        let mentionUser = message.mentions.members.first()

        if (!mentionUser)
        return message.channel.send (new Discord.MessageEmbed()
            .setColor ('#66001b')
            .setDescription (`${BAD} Please metnion someone after command.\n.لطفا بعد از دستور به عضوی اشاره کنید`)
            )

        if (mentionUser.roles.cache.find(m => m.name === 'Muted' || m.name === 'Mute'))
        return message.channel.send(new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} ${mentionUser} has muted role.\nکاربر ذکر شده رول Mute را دارد`)
        
        )

        if(mentionUser.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position)
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
        .setTitle ('🟣 Playerly | Mute')
        .setColor ('#a14cd9')
        .setFooter (`${message.member.user.username}`, `${client.user.avatarURL()}`)
        .setDescription (`${TICK} ${message.member.user} Muted ${mentionUser.user}`)
        .setThumbnail (client.user.avatarURL())
        ).then(mentionUser.roles.add(muteRole))
    }
}