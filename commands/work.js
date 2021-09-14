const Discord = require('discord.js')

const registerModel = require('../registerModel')

const workedRecently = new Set();
const profileModel = require('../profileSchema')

module.exports = {
    name: 'work',
    description: 'Choose work from user and get badge to profile',
    async execute(message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')


        registerModel.findOne({
            userId: message.author.id,
        }, async (err, data) => {
            if (err)
                return console.warn(err)

            if (!data) {
                message.channel.send(new Discord.MessageEmbed()
                    .setColor('#66001b')
                    .setDescription(`${BAD} You should register to a work to work.\nشما برای کار کردن نیاز دارید به یک کار ثبت نام کنید\n\`.register <work name>\``)
                )
            } else if (data) {

                if (workedRecently.has(message.author.id))
                    return message.channel.send(new Discord.MessageEmbed()
                        .setColor('#f0f0f0')
                        .setDescription(`${BAD} Please wait 12 hour and try again.\n لطفا 12 ساعت صبر کنید و دوباره از کامند استفاده کنید\n VIP = 6 Hour's`)
                    )

                if (data.workName === 'Doctor') {

                    const random = Math.floor(Math.random() * 11) + 75;

                    const response = await profileModel.findOneAndUpdate({
                        userId: message.author.id
                    }, {
                        $inc: {
                            bank: random
                        }
                    }).then(message.channel.send(new Discord.MessageEmbed()
                        .setColor('#a14cd9')
                        .setDescription(`${TICK} You worked and made \`${random}$\``)
                    ))
                    if (!response)
                        return

                    workedRecently.add(message.author.id)
                    setTimeout(() => {
                        receivedRecently.delete(msg.author.id)
                    }, 43200000)

                } else if (data.workName === 'Vakil') {

                    const random = Math.floor(Math.random() * 6) + 73;

                    const response = await profileModel.findOneAndUpdate({
                        userId: message.author.id
                    }, {
                        $inc: {
                            bank: random
                        }
                    }).then(message.channel.send(new Discord.MessageEmbed()
                        .setColor('#a14cd9')
                        .setDescription(`${TICK} You worked and made \`${random}$\``)
                    ))
                    if (!response)
                        return

                    workedRecently.add(message.author.id)
                    setTimeout(() => {
                        receivedRecently.delete(msg.author.id)
                    }, 43200000)

                } else if (data.workName === 'Mohandes') {

                    const random = Math.floor(Math.random() * 16) + 75;

                    const response = await profileModel.findOneAndUpdate({
                        userId: message.author.id
                    }, {
                        $inc: {
                            bank: random
                        }
                    }).then(message.channel.send(new Discord.MessageEmbed()
                        .setColor('#a14cd9')
                        .setDescription(`${TICK} You worked and made \`${random}$\``)
                    ))
                    if (!response)
                        return

                    workedRecently.add(message.author.id)
                    setTimeout(() => {
                        receivedRecently.delete(msg.author.id)
                    }, 43200000)

                } else if (data.workName === 'BarnameNevis') {

                    const random = Math.floor(Math.random() * 31) + 85;

                    const response = await profileModel.findOneAndUpdate({
                        userId: message.author.id
                    }, {
                        $inc: {
                            bank: random
                        }
                    }).then(message.channel.send(new Discord.MessageEmbed()
                        .setColor('#a14cd9')
                        .setDescription(`${TICK} You worked and made \`${random}$\``)
                    ))
                    if (!response)
                        return

                    workedRecently.add(message.author.id)
                    setTimeout(() => {
                        receivedRecently.delete(msg.author.id)
                    }, 21600000)

                } else if (data.workName === 'SEO') {

                    const random = Math.floor(Math.random() * 31) + 90;

                    const response = await profileModel.findOneAndUpdate({
                        userId: message.author.id
                    }, {
                        $inc: {
                            bank: random
                        }
                    }).then(message.channel.send(new Discord.MessageEmbed()
                        .setColor('#a14cd9')
                        .setDescription(`${TICK} You worked and made \`${random}$\``)
                    ))
                    if (!response)
                        return

                    workedRecently.add(message.author.id)
                    setTimeout(() => {
                        receivedRecently.delete(msg.author.id)
                    }, 21600000)

                }
            }
        })
    }
}