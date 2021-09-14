const Discord = require ('discord.js')

module.exports = {
    name: 'hsteam',
    description: 'Steam help command.',
    execute (message, args, client) {
        message.channel.send(new Discord.MessageEmbed()
        .setColor('#a14cd9')
        .setDescription('[Click Here!](https://steamidfinder.com/)\n It\'s can help you.')
        )
    }
}