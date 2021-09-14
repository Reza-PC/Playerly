const mongoose = require('mongoose')
const Discord = require ('discord.js')


const warnModel = require ('../warn')

module.exports = {
    name: 'warns',
    description: 'See how many who. warns',
    async execute (message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')

        let userMention = message.mentions.users.first()

        if (!userMention)
        return message.channel.send (new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} Please mention a user.\n لطفا یک کاربر را ذکر کنید`)
        )


        warnModel.find({
            guildId: message.guild.id,
            user: userMention.id,
        }, async (err, data) => {
            if (err)
            return console.warn(err)

            if (!data.length)
            return message.channel.send (new Discord.MessageEmbed ()
            .setColor (`#66001b`)
            .setDescription (`${BAD} <@${userMention.id}> has \`0\` warns.`)
            )

            const dataReasons = data.map(d => {
                return d.Warns.map(w => `👤 WarnedBy : <@${message.guild.members.cache.get(w.WarnedBy).user.id}> | 📝 Reason : ${w.Reason}`).join ('\n')
            })

            const embedWarns = new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Warns')
            .setColor ('#4c4179')
            .setThumbnail (message.guild.iconURL({dynamic: true}))
            .setFooter (client.user.username, client.user.avatarURL({dynamic: true}))
            .addFields (
                {name: '🚫 Number Warns', value: '`' + data.length + '`'},
                {name: '📝 Reasons / WarnedBy', value: dataReasons}
            )

            message.channel.send (embedWarns)
        })
    }
}