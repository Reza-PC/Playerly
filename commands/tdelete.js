const Discord = require ('discord.js')

module.exports = {
    name: 'tdelete',
    description: 'Delete text channel.',
    execute (message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')

        let channel1 = message.mentions.channels.first()

        if (!message.member.hasPermission('MANAGE_CHANNELS'))
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${BAD} You don\'t have permission.\n.شما دسترسی استفاده از این دستور را ندارید`)
            .setColor('#66001b')
            );

        if (!message.guild.me.hasPermission('MANAGE_CHANNELS'))
        return message.channel.send(new Discord.MessageEmbed()
            .setColor('#66001b')
            .setDescription(`${BAD} Oops! Please check my permissions.\n.یک مشکلی وجود دارد! لطفا دسترسی های من را بررسی کنید`)
            )

        if (!channel1)return message.channel.send(new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} Please mention a text channel\n.لطفا به یک کانال متنی اشاره کنید`)
        )

        if (!channel1.deletable)return message.channel.send(new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} I can\'t delete this text channel.\n من نمیتوانم این کانال متنی را حذف کنم`)
        )

        message.channel.send (new Discord.MessageEmbed()
                .setColor('#69beff')
                .setDescription (`${LOADING} Loading..`)
                )
                .then(message =>{
        message.delete({timeout: 5000})
        })
        .then(setTimeout(function(){
        message.channel.send(new Discord.MessageEmbed()
        .setTitle (`🟣 Playerly | Text Channel Delete`)
        .setColor ('#a14cd9')
        .setDescription (`${TICK} ${message.member.user} Deleted [**${channel1.name}**] channel.`)
        .setFooter (`${message.member.user.tag}`, `${message.member.user.displayAvatarURL({dynamic:true})}`)
        
        )
        }, 3000))
        
        .then (setTimeout(function(){
        channel1.delete()
        }, 4100)
    )
    }
}