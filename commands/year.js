const Discord = require ('discord.js');
const fetch = require ('node-fetch')
module.exports = {
    name: 'year',
    description: 'Send the day information',
    async execute (message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')

        let year = args[0]
        let month = args[1]
        let day = args[2]

        if (!year || isNaN(year))
        return message.channel.send (new Discord.MessageEmbed()
        .setColor ('66001b')
        .setDescription (`${BAD} Please enter a year.\n لطفا یک سال دقیق وارد کنید`)
        )

        if (!month || isNaN(month))
        return message.channel.send (new Discord.MessageEmbed()
        .setColor ('66001b')
        .setDescription (`${BAD} Please enter a month.\n لطفا یک ماه دقیق وارد کنید`)
        )

        if (!day || isNaN(day))
        return message.channel.send (new Discord.MessageEmbed()
        .setColor ('66001b')
        .setDescription (`${BAD} Please enter a day.\n لطفا یک روز دقیق وارد کنید`)
        )

        const yearApi = `https://api.codebazan.ir/age/?year=${year}&&month=${month}&&day=${day}`

        message.channel.send (new Discord.MessageEmbed()
            .setColor('#69beff')
            .setDescription (`${LOADING} Loading..`)
        )
        .then(message => {
            setTimeout (function (){
                message.delete().then (async (message) => {
                    await fetch(yearApi).then(res => res.json().then(body =>{
                        setTimeout (function () {
                            message.channel.send(new Discord.MessageEmbed()
                            .setTitle ('🟣 Playerly | Year Info')
                            .setColor (`#a14cd9`)
                            .setThumbnail (client.user.avatarURL())
                            .setFooter (`${message.author.username}`, `${client.user.avatarURL()}`)
                            .addFields (
                                {name: '📅 Days :', value: '`' + body.result.days + '`', inline: true},
                                {name: '🎉 Birth Miladi :', value: '`' + body.result.birthmiladi + '`', inline: true},
                                {name: '🧿 Year Name :', value: '`' + body.result.year_name + '`', inline: true},
                                {name: '🧨 To Birth :', value: '`' + body.result.to_birth + '`', inline: true},
                                {name: '🌚 Moon :', value: '`' + body.result.g_month + '`', inline: true},
                                {name: '🌍 World Population :', value: '`' + body.result.world_population + '`', inline: true},
                                {name: '🍔 Eat KG :', value: '`' + body.result.eat_Kg + '`', inline: true},
                            )
                            )
                        }, 2400)
                    }))
                })
            }, 1950)
        })
    }
}