const Discord = require('discord.js');
const prefixModel = require('../prefixSchema');
const vipModel = require('../vipModel')

module.exports = {
    name: 'prefix',
    description: 'Set prefix for the guild',
    async execute(message, args, client) {


        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')

        const data = await prefixModel.findOne({
            guildId: message.guild.id,
        })

        const vipData = await vipModel.findOne({
            guildId: message.guild.id
        })

        if (!vipData) {

            let prefixSet = args.slice(0).join(' ');

            if (!prefixSet)
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor('#66001b')
                    .setDescription(`${BAD} You should enter a prefix to continue.\n برای ادامه دادن شما باید پیشوندی را انتخاب کنید`)
                )

            if (prefixSet.length > 3)
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor('#66001b')
                    .setDescription(`${BAD} The allowable prefix limit is less than 3.\n حد مجاز پیشوند کمتر از 3 است \n شما میتوانید با خرید وی ای پی بیشتر از حد مجاز استفاده کنید`)
                )

            if (data) {

                const prefixDeleter = prefixModel.findOne({
                    guildId: message.guild.id,
                }) 
                ;(await prefixDeleter).delete()
                    .then(
                        console.log('Deleted')
                    ).catch(err => {
                        console.warn(err)
                    })

                let newData = new prefixModel({
                    prefix: prefixSet,
                    guildId: message.guild.id,
                })
                newData.save().then(
                    message.channel.send(new Discord.MessageEmbed()
                        .setColor('#a14cd9')
                        .setDescription(`${TICK} The prefix changed to \`${prefixSet}\``)
                    )
                ).catch(err => {
                    console.warn(err)
                })
            } else if (!data) {
                await prefixModel.findOneAndRemove({
                    guildId: message.guild.id
                })

                let newData = new prefixModel({
                    prefix: prefixSet,
                    guildId: message.guild.id,
                })

                newData.save().then(
                    message.channel.send(new Discord.MessageEmbed()
                        .setColor('#a14cd9')
                        .setDescription(`${TICK} The prefix was set to \`${prefixSet}\``)
                    )
                )
            }
        } else if (vipData) {

            let prefixSet = args.slice(0).join(' ');

            if (!prefixSet)
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor('#66001b')
                    .setDescription(`${BAD} You should enter a prefix to continue.\n برای ادامه دادن شما باید پیشوندی را انتخاب کنید`)
                )

            if (data) {

                let newData = new prefixModel({
                    prefix: prefixSet,
                    guildId: message.guild.id,
                })
                newData.save().then(
                    message.channel.send(new Discord.MessageEmbed()
                        .setColor('#a14cd9')
                        .setDescription(`${TICK} The prefix changed to \`${prefixSet}\``)
                    )
                ).catch(err => {
                    console.warn(err)
                })
            } else if (!data) {
                await prefixModel.findOneAndRemove({
                    guildId: message.guild.id
                })

                let newData = new prefixModel({
                    prefix: prefixSet,
                    guildId: message.guild.id,
                })

                newData.save().then(
                    message.channel.send(new Discord.MessageEmbed()
                        .setColor('#a14cd9')
                        .setDescription(`${TICK} The prefix was set to \`${prefixSet}\``)
                    )
                )
            }
        }
    }
}