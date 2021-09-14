const Discord = require('discord.js')
const profileModel = require('../profileSchema')
const Canvas = require('canvas')
const path = require('path')
const moment = require('moment')
const vipModel = require('../vipModel')
module.exports = {
    name: 'profile',
    description: 'Show`s user profile in db',
    async execute(message, args, client) {

        let mentionUser = message.mentions.users.first()

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')



        if (!mentionUser) {

            await profileModel.findOne({
                userId: message.author.id,
            }, async (err, data) => {
                if (err)
                    return console.log(err)

                if (!data) {

                    let profile = await profileModel.create({
                        userId: message.author.id,
                        serverId: message.guild.id,
                        coins: 500,
                        bank: 0,
                        timeCreated: moment().format('LLL')
                    })
                    profile.save().then(
                        message.channel.send(new Discord.MessageEmbed()
                            .setColor('#66001b')
                            .setDescription(`${TICK} Your profile has been created.\n مشخصات شما ساخته شد و ثبت شد`)
                        )
                    )
                } else {

                    const canvas = Canvas.createCanvas(1380, 720)

                    const ctx = canvas.getContext('2d')

                    Canvas.registerFont(path.resolve(__dirname, '../font/sans-serif.otf'), {
                        family: 'Anton'
                    })

                    const profileBackGround = await Canvas.loadImage(
                        path.resolve(__dirname, '../p.jpg')
                    )

                    ctx.drawImage(profileBackGround, 0, 0, canvas.width, canvas.height)

                    ctx.font = '49px sans-serif'

                    ctx.fillStyle = '#5effc1'


                    ctx.fillText(message.member.displayName, canvas.width / 6.8, canvas.height / 6.9)

                    var moneyWallet = data.coins

                    var moneyBank = data.bank

                    const moneyWalletDots = moneyWallet.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
                    const moneyBankDots = moneyBank.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")

                    ctx.fillText(`Wallet : ${moneyWalletDots}$`, canvas.width / 6.8, canvas.height / 2.44)
                    ctx.fillText(`Bank : ${moneyBankDots}$`, canvas.width / 6.8, canvas.height / 1.48)
                    ctx.fillText(`Created At : ${data.timeCreated}`, canvas.width / 6.8, canvas.height / 1.06)

                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `ProfilePlayerly.jpg`)

                    const pvserver = client.guilds.cache.get('809316388404723713')
                    
                    const channel = pvserver.channels.cache.get('827979904913244160')
                                         
                    const profImageUrl = channel.send(attachment)
                }
            })

        }
        if (mentionUser) {
            await profileModel.findOne({
                userId: mentionUser.id,
            }, async (err, data) => {
                if (err)
                    return console.log(err)

                if (!data) {
                    message.channel.send(new Discord.MessageEmbed()
                        .setColor('#66001b')
                        .setDescription(`${BAD} The user mentioned is undefined.\n کاربری که شما ذکر کردید موجود نیست`)
                    )
                } else {
                    const canvas = Canvas.createCanvas(1380, 720)

                    const ctx = canvas.getContext('2d')

                    Canvas.registerFont(path.resolve(__dirname, '../font/sans-serif.otf'), {
                        family: 'Anton'
                    })

                    const profileBackGround = await Canvas.loadImage(
                        path.resolve(__dirname, '../p.jpg')
                    )

                    ctx.drawImage(profileBackGround, 0, 0, canvas.width, canvas.height)

                    ctx.font = '49px sans-serif'

                    ctx.fillStyle = '#5effc1'


                    ctx.fillText(mentionUser.username, canvas.width / 6.8, canvas.height / 6.9)

                    var moneyWallet = data.coins

                    var moneyBank = data.bank

                    const moneyWalletDots = moneyWallet.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
                    const moneyBankDots = moneyBank.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")

                    ctx.fillText(`Wallet : ${moneyWalletDots}$`, canvas.width / 6.8, canvas.height / 2.44)
                    ctx.fillText(`Bank : ${moneyBankDots}$`, canvas.width / 6.8, canvas.height / 1.48)
                    ctx.fillText(`Created At : ${data.timeCreated}`, canvas.width / 6.8, canvas.height / 1.06)

                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${message.author.tag}.jpg`)

                    message.channel.send(``, attachment)
                }
            })
        }
    }
}