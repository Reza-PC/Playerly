const {
  steamApiKey
} = require ('../config.json')

const Discord = require ('discord.js')

const csgo = require ('csgo-stats')
const SteamAPI = require ('steamapi');
const steam = new SteamAPI (`${steamApiKey}`);

module.exports = {
    name: 'csgo',
    description: `Show's the CS:GO Player Stats.`,
    execute (message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')
        const DEAGLE = Server.emojis.cache.find(l => l.name == 'Deagle')
        const P90 = Server.emojis.cache.find(l => l.name == 'P90')
        const AWP = Server.emojis.cache.find(l => l.name == 'AWP')
        const AK = Server.emojis.cache.find(l => l.name == 'Ak47')

        let steamID = args[0]

        if (!steamID)
        return message.channel.send (new Discord.MessageEmbed()
              .setColor ('#66001b')
              .setDescription (`${BAD} Please send \`SteamID\` after command.\n.را بفرستید \`SteamID\` لطفا بعد از دستور`)
              )
    
    
        const token = `${steamApiKey}`
    
        if (isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} Invalid SteamID.\n.شناسه استیم نامعتبر است`)
        )
        .catch(err => {
          console.log(err)
        })
    
        steam.getUserSummary(steamID).then(summary =>{
          var total_kills;
          var total_deaths;
          var total_wins;
          var total_kills_knife;
          var total_mvps;
          var total_kills_deagle;
          var total_kills_p90;
          var total_kills_awp;
          var total_kills_ak47;
          var total_kills_m4a4;
          var last_match_wins;
          var last_match_kills;
          var last_match_deaths;
          var last_match_mvps;
          csgo.load({
               key : `${token}`,
               id : `${steamID}`
             }).then(r =>{
                 r.body.playerstats.stats.forEach((o) => {
                   if (o.name === 'total_kills'){
                      total_kills = `${o.value}`;
                   }
                   if (o.name === 'total_deaths'){
                      total_deaths = `${o.value}`;
                   }
                   if (o.name === 'total_wins'){
                     total_wins = `${o.value}`
                   }
                   if (o.name === 'total_mvps'){
                    total_mvps = `${o.value}`
                   }
                    if (o.name === 'total_kills_knife'){
                    total_kills_knife = `${o.value}`
                  }
                  if (o.name === 'total_kills_deagle'){
                    total_kills_deagle = `${o.value}`
                  }
                  if (o.name === 'total_kills_p90'){
                    total_kills_p90 = `${o.value}`
                  }
                  if (o.name === 'total_kills_awp'){
                    total_kills_awp = `${o.value}`
                  }
                  if (o.name === 'total_kills_ak47'){
                    total_kills_ak47 = `${o.value}`
                  }
                  if (o.name === 'total_kills_m4a4'){
                    total_kills_m4a4 = `${o.value}`
                  }
                  if (o.name === 'last_match_wins'){
                    last_match_wins = `${o.value}`
                  }
                  if (o.name === 'last_match_kills'){
                    last_match_kills = `${o.value}`
                  }
                  if (o.name === 'last_match_deaths'){
                    last_match_deaths = `${o.value}`
                  }
                  if (o.name === 'last_match_mvps'){
                    last_match_mvps = `${o.value}`
                  }
    
                 })
                 message.channel.send (new Discord.MessageEmbed()
                .setColor('#69beff')
                .setDescription (`${LOADING} Loading..`)
                )
                .then (message => {
                    setTimeout (function () {
                        message.delete()
                        .then (message =>{
                            setTimeout (function () {
                                message.channel.send(new Discord.MessageEmbed()
                                .setTitle ('🟣 Player | CS:GO')
                                .setColor ('#a14cd9')
                                .setThumbnail (summary.avatar.medium)
                                .setFooter (`${message.member.user.username}`, `${client.user.avatarURL()}`)
                                .addFields (
                                    {name: '**Full Stats**', value: '\u200B'},
                                    {name: '⚔ Kills :', value: '`' + total_kills + '`', inline: true},
                                    {name: '💀 Deaths :', value: '`' + total_deaths + '`', inline: true},
                                    {name: '🏆 Wins :', value: '`' + total_wins + '`', inline: true},
                                    {name: '👑 Mvp\'s :', value: '`' + total_mvps + '`', inline: true},
                                    {name: '📊 K/D :', value: '`' + Number(total_kills / total_deaths).toFixed(2) + '`', inline: true},
                                    {name: '\u200b', value: '\u200b'},
                                    {name: '**Guns Kills Stats**', value: '\u200b'},
                                    {name: '🔪 Knife :', value: '`' + total_kills_knife + '`', inline: true},
                                    {name: `${DEAGLE} Deagle :`, value: '`' + total_kills_deagle + '`', inline: true},
                                    {name: `${P90} P90 :`, value: '`' + total_kills_p90 + '`', inline: true},
                                    {name: `${AWP} AWP :`, value: '`' + total_kills_awp + '`', inline: true},
                                    {name: `${AK} AK-47 :`, value: '`' + total_kills_ak47 + '`', inline: true},
                                    {name: '\u200b', value: '\u200b'},
                                    {name: '**Last Match Stats**', value: '\u200b'},
                                    {name: '⚔ Kills :', value: '`' + last_match_kills + '`', inline: true},
                                    {name: '💀 Deaths :', value: '`' + last_match_deaths + '`', inline: true},
                                    {name: '🏆 Round Wins :', value: '`' + last_match_wins + '`', inline: true},
                                    {name: '👑 Mvp\'s :', value: '`' + last_match_mvps + '`', inline: true},
                                    {name: '📊 K/D :', value: '`' + Number(last_match_kills / last_match_deaths).toFixed(2) + '`', inline: true},
                                    {name: '\u200b', value: '\u200b'},
                                    {name: '**Steam Stats**', value: '\u200b'},
                                    {name: '👤 Steam Nickname :', value: '`' + summary.nickname + '`', inline: true},
                                    {name: '🔍 Profile Link :', value: `[${summary.nickname}](${summary.url})`, inline: true}
                                )         
                                )
                            })
                        }, 2800)
                    }, 2500)
                })
             }).catch(err => {
                message.channel.send(new Discord.MessageEmbed()
                .setColor ('#66001b')
                .setDescription (`${BAD} Wtf is that,There is have an eror\nیک مشکلی وجود دارد`)
                )
                console.log(`The problem :` + err)
            })
        })
    }
}