const mongoose = require ('mongoose')
const Discord = require ('discord.js')

const warnModel = require('../warn')


module.exports = {
    name: 'warn',
    description: 'Warn to a user',
    async execute (message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')


        if (!message.member.hasPermission('MANAGE_MESSAGES'))
        return message.channel.send (new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} You can't use this command.\nشما نمیتوانید از این دستور استفاده بکنید`)
        )

        let userMention = message.mentions.users.first()

        if (!userMention)
        return message.channel.send (new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} Please mention a user.\n لطفا یک کاربر را ذکر کنید`)
        )


        if (!args.slice(1).join(' '))
        return message.channel.send (new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} Please set a reason for warn.\n لطفا برای تذکر به کسی دلیلش را هم بنویسید`)
        )

        warnModel.findOne({
            guildId: message.guild.id,
            user: userMention.id
        }, async (err, data) => {
            if (err)
            return console.warn(err)

            if (!data){
                let newWarns = new warnModel({
                    guildId: message.guild.id,
                    user: userMention.id,
                    Warns: [
                        {
                            WarnedBy: message.author.id,
                            Reason: args.slice(1).join(' ')
                        }
                    ]
                })
                newWarns.save()

                message.channel.send (new Discord.MessageEmbed ()
                .setTitle (`🟣 Playerly | Warns`)
                .setColor (`#a14cd9`)
                .setThumbnail (message.guild.iconURL({dynamic: true}))
                .setFooter (client.user.username, client.user.avatarURL({dynamic: true}))
                .setDescription (`${TICK} <@${userMention.id}> has been warned successfully.\n🚫 Warns : \`1\`\n📝 Reason : \`${args.slice(1).join(` `)}\``)
                )
            }else {
                data.Warns.unshift({
                    WarnedBy: message.author.id,
                    Reason: args.slice(1).join(' ')
                })

                data.save()

                message.channel.send (new Discord.MessageEmbed ()
                .setTitle (`🟣 Playerly | Warns`)
                .setColor (`#a14cd9`)
                .setThumbnail (message.guild.iconURL({dynamic: true}))
                .setFooter (client.user.username, client.user.avatarURL({dynamic: true}))
                .setDescription (`${TICK} <@${userMention.id}> has been warned successfully.\n🚫 Warns : \`${data.Warns.length}\`\n📝 Reason : \`${args.slice(1).join(` `)}\``)
                )
            }
        })
    }
}

const mySecret = process.env['MongooseLink']
