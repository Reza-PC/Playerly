const Discord = require ('discord.js')

module.exports = {
    name: 'unabn',
    description: 'Unaban with ID',
    execute (message, args, client){

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

        if (!message.guild)return;

        let memberID = args[0]

        if (!memberID)
        return message.channel.send (new Discord.MessageEmbed()
                .setColor ('#66001b')
                .setDescription (`${BAD} Please send user id after command.\n.لطفا بعد از دستور شناسه کاربری را تعریف کنید`)
                )

        message.guild.fetchBans().then(bans =>{
            if (bans.size == 0) 
            return message.channel.send(new Discord.MessageEmbed()
            .setColor ('#66001b')
            .setDescription (`${BAD} This server doesn\'t have ban members.\n.این سرور هیچ عضو ممنوع شده ای ندارد`)
            )

            let memberBan = bans.find(ban => ban.user.id == memberID)

            if (!memberBan) 
            return message.channel.send(new Discord.MessageEmbed()
            .setColor ('#66001b')
            .setDescription (`${BAD} The member not found with this ID.\n.عضوی با این شناسه پیدا نشد`)
            
            )

            message.guild.members.unban(memberBan.user).then(message.react('✅')).then( 
            setTimeout(function () {
                message.channel.send(new Discord.MessageEmbed()
                .setTitle ('🟣 Playerly | Unban')
                .setColor ('#a14cd9')
                .setDescription (`${TICK} Successfully unbanned <@${memberID}>.`)
                .setFooter (`${message.member.user.username}`, `${client.user.avatarURL()}`)
                )
            })
            )
        })
    }
}