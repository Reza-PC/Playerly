const Discord = require ('discord.js')

module.exports = {
    name: 'join',
    description: 'Join the user voice channel.',
    execute (message, args, client) {
        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')
        
        if(message.author !== message.guild.owner)
        return message.channel.send(new Discord.MessageEmbed()
              .setDescription(`${BAD} You don\'t have permission.\n.شما دسترسی استفاده از این دستور را ندارید`)
              .setColor('#66001b')
              );
    
        const userVoice = message.member.voice.channel
    
        if (!userVoice)
        return message.channel.send(new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} Please connect to a voice channel.\n.لطفا به یک کانال صوتی متصل شوید`)
        )
    
        const userVoiceJoinable = message.member.voice.channel.joinable
    
        if (!userVoiceJoinable)
        return message.channel.send(new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} Please check my permission.\n.لطفا دسترسی های من را بررسی کنید`)
        
        )
    
        message.channel.send (new Discord.MessageEmbed()
            .setColor('#69beff')
            .setDescription (`${LOADING} Loading..`)
            )
            .then(message =>{
                setTimeout(function(){
                    message.edit(`${TICK} Connected`)
                }, 2800)
        })
            .then(setTimeout(function(){
                message.member.voice.channel.join()
            }, 3000)
        )
    }
}