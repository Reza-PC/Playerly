const Discord = require ('discord.js')

module.exports = {
    name: 'setregion',
    description: 'Set region the server to args[0]',
    execute (message, args, client){

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')

        if(!message.member.hasPermission('MANAGE_GUILD')) 
        return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`${BAD} You don\'t have permission.\n.شما دسترسی استفاده از این دستور را ندارید`)
        .setColor('#66001b')
        );

        if (!message.guild.me.hasPermission('MANAGE_GUILD'))
        return message.channel.send(new Discord.MessageEmbed()
        .setColor('#66001b')
        .setDescription(`${BAD} Oops! Please check my permissions.\n.یک مشکلی وجود دارد! لطفا دسترسی های من را بررسی کنید`)
        )
        let region = args[0]

        if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#66001b')
        .setDescription(`${BAD} Please send a reagion after command.\n.لطفا بعد از دستور منطقه ای را تعریف کنید`)
        );

        const regions = ['us-west', 'southafrica', 'dubai', 'japan', 'hongkong',
        'amsterdam', 'south-korea', 'us-east', 
        'india', 'eu-west', 'sydney', 'eu-central', 'us-central', 'europe', 'russia', 
        'singapore', 'frankfurt', 'us-south', 'brazil', 'london'];

        if(!regions.includes(region)) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#66001b')
        .setDescription (`${BAD} Invalid region,Type command \`.rlist\`.\nمنطقه نامعتبر است,دستور \`.rlist\` را بنویسید.`)
        );

        const CurrentRegion = message.guild.region;

        if(CurrentRegion === region) return message.channel.send(new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} You chose ${region} and this region now was current region.\nشما ${region} را انتخاب کردید و این منطقه اکنون منطقه فعلی است.`)
        );

        message.channel.send (new Discord.MessageEmbed()
            .setColor('#69beff')
            .setDescription (`${LOADING} Loading..`)
            )
        .then(message =>{
            setTimeout(function(){
                message.delete()
                .then(message => {
                    setTimeout (function () {
                        message.channel.send(new Discord.MessageEmbed()
                        .setColor ('#a14cd9')
                        .setDescription (`${TICK} Successfuly changed region to ${region}.\nبا موفقیت منطقه سرور به منطقه ای که شما انتخاب کردید عوض شد.`)
                        )
                        .then(message =>{
                            setTimeout(function (){
                                message.guild.setRegion(region)
                            }, 1600)
                        })
                    }, 1500)
                })
            },1200)
        }) 
    }
}