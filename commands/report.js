const Discord = require('discord.js')

const mongoose = require('mongoose')

const talkedRecently = new Set();

const Report = require('../report')
const reportChannel = require ('../reportChannel')

module.exports = {
    name: 'report',
    description: 'Report someone.',
    async execute (message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')

        let rUser = message.mentions.members.first();

        if (!rUser)
        return message.channel.send (new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} Please mention someone to report.\n برای گزارش لطفا یک نفر را تعریف کنید`)
        )

        if (rUser.id == message.author.id) 
        return message.channel.send (new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} You can't report yourself.\nشما نمیتوانید خودتون رو ریپورت کنید`)
        )

        let rReason = args.slice(1).join(' ')

        if (!rReason)
        return message.channel.send (new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} Please send report reason after mention.\n لطفا بعد از تعریف یک دلیل برای گزارش بنویسید`)
        )

        if (talkedRecently.has(message.author.id)) {
            message.channel.send (new Discord.MessageEmbed()
            .setColor ('#f0f0f0')
            .setDescription (`${BAD} Please wait 5 minute and use again command.\n لطفا 5 دقیقه صبر کنید و دوباره از کامند استفاده کنید`)
            )
        }else {

        const report = new Report({
            _id: mongoose.Types.ObjectId(),
            username: rUser.user.username,
            userId: rUser.id,
            reason: rReason,
            reportedBy: message.author.username,
            reportedByID: message.author.id
        })


        const data = await reportChannel.findOne({
            guildId: message.guild.id,
        }, async (err, guild) => {
            if (err)
            return console.log(err)

            if (!guild) {
                const newGuild = new reportChannel({
                    guildId: message.guild.id,
                })

                newGuild.save()
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
            }
        })


        if (!data.guildId)
            return message.channel.send(new Discord.MessageEmbed()
            .setColor ('#66001b')
            .setDescription (`${BAD} The report command is disable\nدستور گزارش غیر فعال میباشد`)
            )
        

        if (!data.channelId)
           return message.channel.send(new Discord.MessageEmbed()
           .setColor ('#66001b')
           .setDescription (`${BAD} The report channel is not defined.\n کانال گزارش تعریف نشده است`)
           )
        

        const channelFind = message.guild.channels.cache.find(l => l.name === `<#${data.channelId}>` || l.id === data.channelId)

        report.save()
        .then(res => {
            channelFind.send(
            new Discord.MessageEmbed()
                .setColor ('#4c4179')
                .setThumbnail (message.guild.iconURL({dynamic: true}))
                .setTitle (`🟣 Plyerly | Report`)
                .setFooter (client.user.username, client.user.avatarURL({dynamic: true}))
                .addFields(
                    {name: `👤 Reported by`, value : '`' + res.reportedBy + '`',inline: true},
                    {name: '📌 Reported User', value: '`' + res.username + '`',inline: true},
                    {name: '📝 Reason', value : `\`${res.reason}\``},
                    {name: '🆔 Users ID' , value : `Reported by : \`${res.reportedByID}\`\nReported User : \`${res.userId}\``}
                ))
        }).catch(err => {
            console.log(err)
        })

        message.channel.send(new Discord.MessageEmbed()
        .setColor ('#a14cd9')
        .setDescription (`${TICK} The report was saved. Thanks.\n گزارش شما ثبت شد. ممنون`)
        )
        talkedRecently.add (message.author.id)
        setTimeout (() => {
            talkedRecently.delete(message.author.id);
        }, 300000)
    }

    }
}