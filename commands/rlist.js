const Discord = require ('discord.js')

module.exports = {
    name: 'rlist',
    description: 'List of server regions.',
    execute (message, args, client) {
        message.channel.send(new Discord.MessageEmbed()
        .setTitle ('🟣 Playerly | Regions List')
        .setColor ('#4c4179')
        .setDescription ('| `us-west` / `southafrica` / `dubai` / `japan` / `hongkong` / `amsterdam` / `south-korea` / `us-east` / `india` / `eu-west` / `sydney` / `eu-central` / `us-central` / `europe` / `russia` / `singapore` / `frankfurt` / `us-south` / `brazil` / `london` |')
        .setThumbnail (client.user.avatarURL())
        .setFooter (`${message.member.user.username}`, `${client.user.avatarURL()}`)
      )
    }
}