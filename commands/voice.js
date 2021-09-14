const Discord = require ('discord.js')

const mongoose = require ('mongoose')


const mongooseLink = process.env['MongooseLink']


const voiceModel = require ('../logVoice')
module.exports = {
    name: 'voice',
    description: 'Enable or Disable voice logs',
    async execute (message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')

        mongoose.connect(mongooseLink, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })

        if (!message.member.hasPermission('ADMINISTRATOR'))
        return message.channel.send (new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} You can't use this command.\n شما نمیتوانید از این دستور استفاده کنید`)
        )

        let enable = args[0]

        if (!enable)
        return message.channel.send (new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} Please send enable or disable after command.\n لطفا بعد از کامند مشخص کنید فعال باشد یا خیر\n .voice enable`)
        )


        if (!enable == 'disable' || !enable == 'enable')
        return message.channel.send (new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} Please send enable or disable after command.\n لطفا بعد از کامند مشخص کنید فعال باشد یا خیر\n .voice disable`)
        )

        if (enable == 'disable') {
            voiceModel.findOne({
                guildId: message.guild.id,
            },async (err, data) => {
                if (err)
                return console.warn(err)

                if (!data) {
                    const newVoiceModel = new voiceModel({
                        guildId: message.guild.id
                    })

                    newVoiceModel.save().then(
                        message.channel.send (new Discord.MessageEmbed()
                        .setColor ('#a14cd9')
                        .setDescription (`${TICK} Voice logs has been disabled.\n تاریخچه صوتی غیر فعال شد`)
                        )
                    )
                }else if (data) {
                    message.channel.send (new Discord.MessageEmbed()
                    .setColor ('#66001b')
                    .setDescription (`${BAD} Voice logs already disable.\n تاریخچه صوتی از قبل غیر فعال بودن \n .voice enable`)
                    )
                }
            })
        }else if (enable == 'enable') {
            voiceModel.findOne({
                guildId: message.guild.id,
            }, async (err, data) => {
                if (err)
                return console.warn(err)

                if (data) {
                    await voiceModel.findOneAndRemove({
                        guildId: message.guild.id,
                    }).then(
                        message.channel.send (new Discord.MessageEmbed()
                        .setColor ('#a14cd9')
                        .setDescription (`${TICK} Voice logs has been enabled.\n تاریخجه صوتی فعال شد`)
                        )
                    )
                }else if (!data) {
                    message.channel.send (new Discord.MessageEmbed()
                    .setColor ('#66001b')
                    .setDescription (`${BAD} Voice logs already enable.\n تاریخچه صوتی از قبل فعال بودن \n .voice disable`)
                    )
                }
            })
        }  

    }
}