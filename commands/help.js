const Discord = require ('discord.js')

const prefixGuild = require ('../prefixSchema')

const { MessageButton } = require('discord-buttons')

module.exports = {
    name: 'help',
    description: 'Send help message',
    async execute (message, args, client) {


      let invBut = new MessageButton()
      .setStyle ('url')
      .setLabel ('💜 Invite')
      .setURL ('https://discord.com/api/oauth2/authorize?client_id=803732720751738901&permissions=2020715764&scope=bot')

      let discoBut = new MessageButton()
      .setStyle ('url')
      .setLabel ('💌 Support')
      .setURL ('https://discord.gg/ru7qN8DJb7')

      let instaBut = new MessageButton()
      .setStyle ('url')
      .setLabel ('💫 Instagram')
      .setURL ('https://www.instagram.com/playerly.ir/?hl=en')

      const data = await prefixGuild.findOne({
        guildId: message.guild.id,
      })

      if (data) {

        const hEmbed = new Discord.MessageEmbed()
        .setTitle (`🟣 Playerly | Help`)
        .setColor ('#a14cd9')
        .setThumbnail (client.user.avatarURL())
        .setFooter (`${message.member.user.username}`, `${client.user.avatarURL()}`)
        .addFields (
          {name: 'Prefix :', value: `\`${data.prefix}\``},
          {name: '\u200B', value: '\u200B'},
          {name: 'Commands :', value: `\`${data.prefix}commands\``, inline:true},
          {name: 'Invite :', value: `\`${data.prefix}invite\``, inline:true},
          {name: 'Discord Server :', value: `\`${data.prefix}discord\``, inline:true},
          {name: 'Instagram :', value: `\`${data.prefix}instagram\``, inline:true}
        )

        message.channel.send({buttons: [
          invBut, discoBut, instaBut
        ], embed: hEmbed})

      } else if (!data) {

        const hEmbed = new Discord.MessageEmbed()
        .setTitle (`🟣 Playerly | Help`)
        .setColor ('#a14cd9')
        .setThumbnail (client.user.avatarURL())
        .setFooter (`${message.member.user.username}`, `${client.user.avatarURL()}`)
        .addFields (
          {name: 'Prefix :', value: '`.`'},
          {name: '\u200B', value: '\u200B'},
          {name: 'Commands :', value: '`.commands`', inline:true},
          {name: 'Invite :', value: '`.invite`', inline:true},
          {name: 'Discord Server :', value: '`.discord`', inline:true},
          {name: 'Instagram :', value: '`.instagram`', inline:true}
        )
        

        message.channel.send({buttons: [
          invBut, discoBut, instaBut
        ], embed: hEmbed})

      }

        
    }
}