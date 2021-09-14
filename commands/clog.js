const Discord = require ('discord.js')

module.exports = {
    name: 'clog',
    description: 'Create log channel.',
    execute (message, args, client) {
        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')

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

        message.guild.channels.create(`logs`,{
            type: 'text',
            permissionOverwrites: [
              {
                id: message.guild.id,
                deny: ['VIEW_CHANNEL'],
              },
              {
                id: message.guild.me,
                allow: ['VIEW_CHANNEL' && 'SEND_MESSAGES'],
              }
            ]
          })
          .then(
              message.reply(new Discord.MessageEmbed()
                  .setColor('#a14cd9')
                  .setDescription(`Channel was created successfully.\n کانال با موفقیت ساخته شد`)
              )
          )

    }
}