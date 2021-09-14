const Dsicord = require ('discord.js')

const mongoose = require ('mongoose')

const reportChannel = require ('../reportChannel')

module.exports = {
    name: 'setreport',
    description: 'Set channel for reports.',
    async execute (message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')

        let rChannel = message.mentions.channels.first() || message.channel

        if (!rChannel)
        return;

        if (!message.member.hasPermission('ADMINISTRATOR'))
        return message.channel.send (new Dsicord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} You can't use this command.\n شما نمیتوانید از این کامند استفاده بکنید`)
        )

        const data = await reportChannel.findOne({
            guildId: message.guild.id,
        })

        if (data){

            await reportChannel.findOneAndUpdate({
                guildId: message.guild.id,
                channelId: rChannel.id,
            })

            return message.channel.send(new Dsicord.MessageEmbed()
            .setColor ('#4c4179')
            .setDescription (`${TICK} The report channel was changed to ${rChannel}\n کانال ریپورت با موفقیت تغییر کرد`)
            )
        }

        if (!data) {
        const channel = new reportChannel({
            _id: mongoose.Types.ObjectId(),
            guildId: message.guild.id,
            channelId: rChannel.id,
        })

        channel.save()
        .then ()
        .catch (err => {
            console.log(err)
        })

        message.channel.send(new Dsicord.MessageEmbed()
        .setColor ('#4c4179')
        .setDescription (`${TICK} The report channel was set to ${rChannel}\n کانال ریپورت با موفقیت تنظیم شد.`)
        )
    }
        
        
    }
}