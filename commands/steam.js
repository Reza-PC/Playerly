const Discord = require ('discord.js');

const steamapi = require('steamapi');

const {
    steamApiKey
} = require ('../config.json')

const steam = new steamapi (`${steamApiKey}`);

const dateFormat = require ('dateformat')

const fetch = require ('node-fetch')

module.exports = {
    name: 'steam', 
    description: `Show's the steam user stats.`,
    async execute(message, args, client) {
        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')

        let userID = args.slice(0).join(' ')
    
        if (!userID)
        return message.channel.send (new Discord.MessageEmbed()
            .setColor ('#66001b')
            .setDescription (`${BAD} Please send some name after command.\n.لطفا بعد از دستور نامی را انتخاب کنید`)
            )

        const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${API}&vanityurl=${userID}`;


        await fetch(url).then(res => res.json()).then(body =>{
        if (body.response.success === 42)
        return message.channel.send(new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} Invalid PlayerID.\n.شناسه بازیکن نامعتبر است \nType command \`.hsteam\` `)
        )

        const id = body.response.steamid;

        steam.getUserSummary(id).then(summary => {

            steam.getUserLevel(id).then(l =>{
        
            steam.getUserBans(id).then(Bans =>{
                const state = ['Offline', 'Online', 'Busy', 'Away', 'Snooze', 'Looking to trade', 'Looking to play']
            
            if (!summary.countryCode){    
            message.channel.send(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Steam')
            .setColor ('#a14cd9')
            .setThumbnail (summary.avatar.medium)
            .addFields(
            {name: '👤 NickName :', value: '`' + summary.nickname + '`', inline:true},
            {name: '🔗 Profile :', value: `[${summary.nickname}](${summary.url})`, inline:true},
            {name: '👑 Steam Level :', value: '`' + l + '`', inline:true},
            {name: '⚫ State :', value: '`' + state[summary.personaState] + '`', inline:true},
            {name: '📆 Created At :', value: '`' + dateFormat(summary.created * 1000) + '`', inline:true},
            {name: '⏲ Last Online :', value: '`' + dateFormat(summary.lastLogOff * 1000) + '`', inline:true},
            {name: '🆔 Steam ID :', value: '`' + summary.steamID + '`', inline:true},      
            {name: '🚫 Game/Vac Bans :', value: `${Bans.gameBans} / ${Bans.vacBans}`, inline:true},
            {name: '🗺 Country :', value: `🏳️`, inline:true},
            {name: '💭 CommentPermission :', value: '`' + summary.commentPermission + '`' },
            )
            .setFooter (`${message.member.user.username}`, `${client.user.avatarURL()}`)
        )
            }

            message.channel.send(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Steam')
            .setColor ('#a14cd9')
            .setThumbnail (summary.avatar.medium)
            .addFields(
            {name: '👤 NickName :', value: '`' + summary.nickname + '`', inline:true},
            {name: '🔗 Profile :', value: `[${summary.nickname}](${summary.url})`, inline:true},
            {name: '👑 Steam Level :', value: '`' + l + '`', inline:true},
            {name: '⚫ State :', value: '`' + state[summary.personaState] + '`', inline:true},
            {name: '📆 Created At :', value: '`' + dateFormat(summary.created * 1000) + '`', inline:true},
            {name: '⏲ Last Online :', value: '`' + dateFormat(summary.lastLogOff * 1000) + '`', inline:true},
            {name: '🆔 Steam ID :', value: '`' + summary.steamID + '`', inline:true},      
            {name: '🚫 Game/Vac Bans :', value: `${Bans.gameBans} / ${Bans.vacBans}`, inline:true},
            {name: '🗺 Country :', value: `:flag_${summary.countryCode.toLowerCase()}:`, inline:true},
            {name: '💭 CommentPermission :', value: '`' + summary.commentPermission + '`'},
            )
            .setFooter (`${message.member.user.username}`, `${client.user.avatarURL()}`)
                        )
                    })
                })
            })
        }).catch(err => {
            message.channel.send(new Discord.MessageEmbed()
              .setColor('#66001b')
              .setDescription(`${BAD} Invalid SteamUser.\nشناسه نامعتبر است`)
              )
              console.warn('The Problem :' + err)
        })
    }
}