const Discord = require('discord.js')

const vipModel = require('../vipModel')

module.exports = {
    name: 'worklist',
    description: 'Show`s works list',
    async execute(message, args, client) {
        
        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')

        vipModel.findOne({
            guildId: message.guild.id
        }, async(err, data) => {
            if (err)
            return console.log(err)

            if (!data) {
                message.channel.send(new Discord.MessageEmbed()
                .setColor('#a14cd9')
                .setTitle('π£ Playerly | WorkList')
                .setDescription('Server : **Normal Server**\nπ¨ββοΈ Doctor : Every 1 day income between **75**$ and **85**$\nβ Vakil : Every 1 day income between *73**$ and **78**$\nπ¨βπ¬ Mohandes : Every 1 day icome between **75**$ and **90**$\n **You can buy VIP for more Works**.\nπNote : If you need to register to a work type \`.work Doctor\` or \`.work Mohandes\` just for first time then you can type \`.work\` to work.')
                )
            }else if (data) {
                message.channel.send(new Discord.MessageEmbed()
                .setColor('#a14cd9')
                .setTitle('π£ Playerly | WorkList')
                .setDescription(`Server : **VIP Server**\nπ¨ββοΈ Doctor : Every 6 hour income between **75**$ and **85**$\nβ Vakil : Every 6 hour income between **73**$ and **78**$\nπ¨βπ¬ Mohandes : Every 6 hour icome between **75**$ and **90**$\nπ¨βπ» BarnameNevis : Every 6 hour income between **85**$ and **115**$\nπ² SEO : Every 6 hour income between **90**$ and **120**$.\nπNote : If you need to register to a work type \`.work BarnameNevis\` or \`.work SEO\` just for first time then you can type \`.work\` to work.`)
                )
            }
        })
    }
}