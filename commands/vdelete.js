const Discord = require ('discord.js')

module.exports = {
    name: 'vdelete',
    description: 'Delete voice channel.',
    execute (message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')
        
    if (message.author.bot)
    return;

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

    if (!message.member.voice.channel.joinable)
    return message.channel.send(new Discord.MessageEmbed()
    .setColor ('#66001b')
    .setDescription (`${BAD} I can\'t join to delete this voice channel.\n.نمی توانم برای حذف این کانال صوتی به کانال صوتی بپیوندم`)
    
    )


      const voiceRead = message.member.voice.channel
      if (!voiceRead)return message.channel.send(new Discord.MessageEmbed()
      .setColor('#66001b')
      .setDescription (`${BAD} You are not in any voice channel.\n.شما داخل هیچ کانال صوتی نیستید`)
      )

      voiceRead.join(message.channel.send(`${LOADING} **Loading...**`).then(message =>{
        message.delete({timeout: 5000})
      })).then(message =>{

        setTimeout(function(){
          voiceRead.delete()
        }, 3000)
      }).then(setTimeout(function(){
          message.channel.send(new Discord.MessageEmbed()
          .setTitle (`🟣 Playerly | Voice Channel Delete`)
          .setColor ('#a14cd9')
          .setDescription (`${TICK} | ${message.member.user} Successfuly |**${voiceRead.name}**| deleted`)
          .setFooter (`${message.member.user.tag}`, `${message.member.user.displayAvatarURL({dynamic:true})}`)
          
          )
        }, 5000)).then(message.react('✅'),6000)
    }
}