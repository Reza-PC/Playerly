const Discord = require ('discord.js')
const fetch = require ('node-fetch')

const {
    pastepApiKey
} = require ('../config.json')

module.exports = {
    name: 'pastepu',
    description: 'Show`s pastep.com user information by username.',
    async execute (message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')

        let userName = args.slice(0).join(' ')

        if (!userName)
        return message.channel.send (new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} Please enter pastep username.\n لطفا نام کاربری خود را وارد کنید`)
        )




        await fetch (`https://pastep.com/api/accounts/data?username=${userName}&api_secret=${pastepApiKey}`).then (res => res.json().then(body => {

        const badges = body.badges

            message.channel.send (new Discord.MessageEmbed()
            .setColor ('#a14cd9')
            .setTitle (`🟣 Playerly | Pastep`)
            .setThumbnail (body.avatar)
            .setFooter (`${message.author.username}`, `${client.user.avatarURL()}`)
            .setDescription (`🎭 Badges : \`${badges}\``)
            .addFields (
                {name: '👤 Name', value: '`' + body.username + '`', inline: true},
                {name: '🗨 Biography', value: '`' + body.bio + '`', inline: true},
                {name: '❤ Likes', value: '`' + body.likes + '`', inline: true},
                {name: '💻 Pastes', value: '`' + body.pastes + '`', inline: true},
                {name: '🔄 Last Paste', value: `[Click Here](${body.recent_paste})`, inline: true},
                {name: '🔗 Profile Link', value: `[Click Here](https://pastep.com/accounts/view/${userName})`, inline: true}
            )             
            )
        })
        ).catch(err => {
            console.warn(err)
            message.channel.send (new Discord.MessageEmbed()
            .setColor('#66001b')
            .setDescription (`${BAD} Username is incorrect.\nنام کاربری اشتباه است`)
            )
        })

    }
}