const Discord = require('discord.js')

const profileModel = require('../profileSchema')

module.exports = {
    name: 'withdraw',
    description: 'Withdraw form your bank to wallet',
    async execute(message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')

        profileModel.findOne({
            userId: message.author.id
        }, async(err, data) => {
            if (err)
            console.warn(err)

            if (!data) {
                message.channel.send(new Discord.MessageEmbed()
                .setColor('#66001b')
                .setDescription(`${BAD} You should has an account in our \`Economy System\`\nشما باید یک حساب در سیستم اقتصاد ما داشته باشید`)
                )
            }else if (data) {

                let amount = args[0]

                if (!amount)
                return message.channel.send(new Discord.MessageEmbed()
                .setColor('#66001b')
                .setDescription(`${BAD} You should enter a number to withdraw\nبرای برداشت کردن شما باید عددی را وارد کنید\n\`.withdraw 151\``)
                )

                if (amount %1 != 0 || amount <= 0)
                return message.channel.send(new Discord.MessageEmbed()
                .setColor('#66001b')
                .setDescription(`${BAD} The entered is not a number\nچیزی که وارد کردید عدد نیست`)
                )

                try {
                    if (amount > data.bank) 
                    return message.channel.send(new Discord.MessageEmbed()
                    .setColor('#66001b')
                    .setDescription(`${BAD} You dont have __${amount}__$ to withdraw.\n شما مقدار پولی که وارد کردید را در حساب بانکی ندارید`)
                    )
                    await profileModel.findOneAndUpdate({
                        userId: message.author.id
                    }, {
                        $inc: {
                            coins: amount,
                            bank: -amount
                        }
                    })
                    return message.channel.send(new Discord.MessageEmbed()
                    .setColor('#a14cd9')
                    .setDescription(`${TICK} You withdrawed __${amount}__$ to your bank.__Be safe__\nمقداری که درخواست کردید به کیف پولتون اضافه شد`)
                    )
                }catch(err){
                    console.log(err)
                }
            }
        })
    }
}