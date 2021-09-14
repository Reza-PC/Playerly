const Discord = require('discord.js')

const registerModel = require('../registerModel')

const vipModel = require('../vipModel')

module.exports = {
    name: 'register',
    description: 'Register to a work',
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
                registerModel.findOne({
                    userId: message.author.id
                }, async (err, data) => {
                    if (err)
                        return console.warn(err)

                    if (!data) {

                        const works = ['Doctor', 'Vakil', 'Mohandes']
                        let WorkName = args.slice(0).join(' ')

                        if (!WorkName)
                            return message.channel.send(new Discord.MessageEmbed()
                                .setColor('#66001b')
                                .setDescription(`${BAD} Please choose a work from \`.worklist\`\nلطفا یک کار از لیست کار ها انتخاب کنید`)
                            )

                        if (!works.includes(WorkName))
                            return message.channel.send(new Discord.MessageEmbed()
                                .setColor('#66001b')
                                .setDescription(`${BAD} You should choose work from work list \`.worklist\`.\n شما باید حتما یک کار از لیست کار ها انتخاب کنید`)
                            )
                        const newRegister = new registerModel({
                            userId: message.author.id,
                            workName: WorkName
                        })
                        newRegister.save().then(
                            message.channel.send(new Discord.MessageEmbed()
                                .setColor('#a14cd9')
                                .setDescription(`${TICK} You are registered on \`${WorkName}\` work good luck.\n شما با موفقیت ثبت نام کردید موفق باشید`)
                            )
                        )
                    } else {
                        message.channel.send(new Discord.MessageEmbed()
                            .setColor('#66001b')
                            .setDescription(`${BAD} You are loged in before that command.\n شما قبلا ثبت نام کردید`)
                        )
                    }
                })
            } else if (data) {

                registerModel.findOne({
                    userId: message.author.id
                }, async (err, data) => {
                    if (err)
                        return console.warn(err)

                    if (!data) {

                        let WorkName = args.slice(0).join(' ')
                        const works = ['Doctor', 'Vakil', 'Mohandes', 'BarnameNevis', 'SEO']

                        if (!WorkName)
                            return message.channel.send(new Discord.MessageEmbed()
                                .setColor('#66001b')
                                .setDescription(`${BAD} Please choose a work from \`.worklist\`\nلطفا یک کار از لیست کار ها انتخاب کنید`)
                            )

                        if (!works.includes(WorkName))
                            return message.channel.send(new Discord.MessageEmbed()
                                .setColor('#66001b')
                                .setDescription(`${BAD} You should choose work from work list \`.worklist\`.\n شما باید حتما یک کار از لیست کار ها انتخاب کنید`)
                            )

                        const newRegister = new registerModel({
                            userId: message.author.id,
                            workName: WorkName
                        })
                        newRegister.save().then(
                            message.channel.send(new Discord.MessageEmbed()
                                .setColor('#a14cd9')
                                .setDescription(`${TICK} You are registered on \`${WorkName}\` work good luck.\n شما با موفقیت ثبت نام کردید موفق باشید`)
                            )
                        )
                    } else {
                        message.channel.send(new Discord.MessageEmbed()
                            .setColor('#66001b')
                            .setDescription(`${BAD} You are loged in before that command.\n شما قبلا ثبت نام کردید`)
                        )
                    }
                })
            }
        })
    }
}