const mongoose = require('mongoose')

const Discord = require('discord.js')

const logChannelModel = require ('../logs')

module.exports = {
    name: 'logchannel',
    description: 'Mention logs channel',
    async execute (message, args, client) {


        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')

        if (!message.member.hasPermission('ADMINISTRATOR'))
        return message.channel.send (new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} You can't use this command.\n شما نمیتوانید از این دستور استفاده کنید`)
        )

        let channelMention = message.mentions.channels.first()

        if (!channelMention)
        return message.channel.send (new Discord.MessageEmbed ()
        .setColor ('#66001b')
        .setDescription (`${BAD} Please mention a channel.\n لطفا کانالی را ذکر کنید`)
        )

        logChannelModel.findOne({
            guildId: message.guild.id,
        }, async (err, data) => {
            if (err)
            return console.warn (err)

            if (!data){
                const newLogChannel = new logChannelModel({
                    _id: mongoose.Types.ObjectId(),
                    guildId: message.guild.id,
                    channelId: channelMention.id,
                })

                await newLogChannel.save()

                message.channel.send (new Discord.MessageEmbed ()
                .setColor ('#a14cd9')
                .setDescription (`${TICK} Log channel successfully set to <#${channelMention.id}>`)
                )
            }else {

                message.channel.send (new Discord.MessageEmbed ()
                .setColor ('#66001b')
                .setDescription (`${BAD} The log channel already exist [<#${data.channelId}>]\nکانال تاریخچه موجود است.`)
                )
            }
        })
    }
}