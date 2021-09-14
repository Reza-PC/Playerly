const Discord = require('discord.js')
const receivedRecently = new Set();
const profileModel = require('../profileSchema')
const vipModel = require('../vipModel')

    module.exports = {
        name: 'daily',
        description: 'Give $ to user from 1$ to 65$',
        async execute(message, args, client) {

            const Server = client.guilds.cache.get('809316388404723713')
            const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
            const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
            const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
            const LOADING = Server.emojis.cache.find(l => l.name == 'Load')


            vipModel.findOne({
                guildId: message.guild.id
            }, async (err, data) => {
                if (err)
                    return console.log(err)

                if (!data) {
                    const random = Math.floor(Math.random() * 65) + 1;

                    if (receivedRecently.has(message.author.id))
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('#f0f0f0')
                            .setDescription(`${BAD} Please wait 1 day and use again command.\n لطفا 1 روز صبر کنید و دوباره از کامند استفاده کنید`)
                        )

                    const response = await profileModel.findOneAndUpdate({
                        userId: message.author.id
                    }, {
                        $inc: {
                            coins: random
                        }
                    })

                    if (!response)
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('#66001b')
                            .setDescription(`${BAD} You are hasn't account in our \`Economy System\`\n شما داخل سیستم اقتصادی ما حساب ندارید \n \`.profile\``)
                        )

                    message.channel.send(new Discord.MessageEmbed()
                        .setColor('#a14cd9')
                        .setDescription(`${TICK} You received **${random}$** \`.profile\``)
                    )

                    receivedRecently.add(message.author.id)
                    setTimeout(() => {
                        receivedRecently.delete(msg.author.id)
                    }, 86400000)
                } else if (data) {
                    const random = Math.floor(Math.random() * 100) + 1;

                    if (receivedRecently.has(message.author.id))
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('#f0f0f0')
                            .setDescription(`${BAD} Please wait 1 day and use again command.\n لطفا 1 روز صبر کنید و دوباره از کامند استفاده کنید`)
                        )

                    const response = await profileModel.findOneAndUpdate({
                        userId: message.author.id
                    }, {
                        $inc: {
                            coins: random
                        }
                    })

                    if (!response)
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('#66001b')
                            .setDescription(`${BAD} You are hasn't account in our \`Economy System\`\n شما داخل سیستم اقتصادی ما حساب ندارید \n \`.profile\``)
                        )

                    message.channel.send(new Discord.MessageEmbed()
                        .setColor('#a14cd9')
                        .setDescription(`${TICK} You received **${random}$** \`.profile\``)
                    )

                    receivedRecently.add(message.author.id)
                    setTimeout(() => {
                        receivedRecently.delete(msg.author.id)
                    }, 43200000)
                }
            })
        }
    }