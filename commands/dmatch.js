const Discord = require('discord.js');

const fetch = require('node-fetch')


module.exports = {
    name: 'dmatch',
    description: `Show's dota 2 match by id.`,
    execute(message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')

        let matchID = args.slice(0).join(' ')

        if (!matchID)
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('#66001b')
                .setDescription(`${BAD} Please send \`MatchID\` after command.\nلطفا شناسه بازی را بعد از دستور ارسال کنید.`)
            )

        if (isNaN(matchID))
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('#66001b')
                .setDescription(`${BAD} Invalid MathcID\nشناسه بازی اشتباه است`)
            )

        if (matchID.length != 10)
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('#66001b')
                .setDescription(`${BAD} Invalid MathcID\nشناسه بازی اشتباه است`)
            )

        fetch(`https://api.opendota.com/api/matches/${matchID}`)
            .then(res => res.json().then(body => {

                const player0Hero = body.players[0].hero_id
                const player1Hero = body.players[1].hero_id
                const player2Hero = body.players[2].hero_id
                const player3Hero = body.players[3].hero_id
                const player4Hero = body.players[4].hero_id
                const player5Hero = body.players[5].hero_id
                const player6Hero = body.players[6].hero_id
                const player7Hero = body.players[7].hero_id
                const player8Hero = body.players[8].hero_id
                const player9Hero = body.players[9].hero_id

                const player0Kills = body.players[0].kills
                const player0Deaths = body.players[0].deaths
                const player0Assists = body.players[0].assists
                const player0LastHits = body.players[0].last_hits
                const player0Denies = body.players[0].denies

                const player1Kills = body.players[1].kills
                const player1Deaths = body.players[1].deaths
                const player1Assists = body.players[1].assists
                const player1LastHits = body.players[1].last_hits
                const player1Denies = body.players[1].denies

                const player2Kills = body.players[2].kills
                const player2Deaths = body.players[2].deaths
                const player2Assists = body.players[2].assists
                const player2LastHits = body.players[2].last_hits
                const player2Denies = body.players[2].denies

                const player3Kills = body.players[3].kills
                const player3Deaths = body.players[3].deaths
                const player3Assists = body.players[3].assists
                const player3LastHits = body.players[3].last_hits
                const player3Denies = body.players[3].denies

                const player4Kills = body.players[4].kills
                const player4Deaths = body.players[4].deaths
                const player4Assists = body.players[4].assists
                const player4LastHits = body.players[4].last_hits
                const player4Denies = body.players[4].denies

                const player5Kills = body.players[5].kills
                const player5Deaths = body.players[5].deaths
                const player5Assists = body.players[5].assists
                const player5LastHits = body.players[5].last_hits
                const player5Denies = body.players[5].denies

                const player6Kills = body.players[6].kills
                const player6Deaths = body.players[6].deaths
                const player6Assists = body.players[6].assists
                const player6LastHits = body.players[6].last_hits
                const player6Denies = body.players[6].denies

                const player7Kills = body.players[7].kills
                const player7Deaths = body.players[7].deaths
                const player7Assists = body.players[7].assists
                const player7LastHits = body.players[7].last_hits
                const player7Denies = body.players[7].denies

                const player8Kills = body.players[8].kills
                const player8Deaths = body.players[8].deaths
                const player8Assists = body.players[8].assists
                const player8LastHits = body.players[8].last_hits
                const player8Denies = body.players[8].denies

                const player9Kills = body.players[9].kills
                const player9Deaths = body.players[9].deaths
                const player9Assists = body.players[9].assists
                const player9LastHits = body.players[9].last_hits
                const player9Denies = body.players[9].denies


                fetch('https://api.opendota.com/api/heroes').then(res => res.json().then(heroesBody => {



                    var player0HeroName;
                    var player1HeroName;
                    var player2HeroName;
                    var player3HeroName;
                    var player4HeroName;
                    var player5HeroName;
                    var player6HeroName;
                    var player7HeroName;
                    var player8HeroName;
                    var player9HeroName;

                    heroesBody.forEach((h) => {
                        if (h.id === player0Hero) {
                            player0HeroName = h.localized_name
                        }

                        if (h.id === player1Hero) {
                            player1HeroName = h.localized_name
                        }

                        if (h.id === player2Hero) {
                            player2HeroName = h.localized_name
                        }

                        if (h.id === player3Hero) {
                            player3HeroName = h.localized_name
                        }

                        if (h.id === player4Hero) {
                            player4HeroName = h.localized_name
                        }

                        if (h.id === player5Hero) {
                            player5HeroName = h.localized_name
                        }

                        if (h.id === player6Hero) {
                            player6HeroName = h.localized_name
                        }

                        if (h.id === player7Hero) {
                            player7HeroName = h.localized_name
                        }

                        if (h.id === player7Hero) {
                            player7HeroName = h.localized_name
                        }

                        if (h.id === player8Hero) {
                            player8HeroName = h.localized_name
                        }

                        if (h.id === player9Hero) {
                            player9HeroName = h.localized_name
                        }
                    })
                    

                    var radianTeam = '🟩'
                    var direTeam = '🟥'
                    var player0Name;
                    var player1Name;
                    var player2Name;
                    var player3Name;
                    var player4Name;
                    var player5Name;
                    var player6Name;
                    var player7Name;
                    var player8Name;
                    var player9Name;

                    if (body.players[0].isRadiant == true) {
                        player0Name = `[\`${player0HeroName}\`]`
                    } else {
                        player0Name = `[\`${player0HeroName}\`]`
                    }

                    if (body.players[1].isRadiant == true) {
                        player1Name = `[\`${player1HeroName}\`]`
                    } else {
                        player1Name = `[\`${player1HeroName}\`]`
                    }

                    if (body.players[2].isRadiant == true) {
                        player2Name = `[\`${player2HeroName}\`]`
                    } else {
                        player2Name = `[\`${player2HeroName}\`]`
                    }

                    if (body.players[3].isRadiant == true) {
                        player3Name = `[\`${player3HeroName}\`]`
                    } else {
                        player3Name = `[\`${player3HeroName}\`]`
                    }

                    if (body.players[4].isRadiant == true) {
                        player4Name = `[\`${player4HeroName}\`]`
                    } else {
                        player4Name = `[\`${player4HeroName}\`]`
                    }

                    if (body.players[5].isRadiant == true) {
                        player5Name = `[\`${player5HeroName}\`]`
                    } else {
                        player5Name = `[\`${player5HeroName}\`]`
                    }

                    if (body.players[6].isRadiant == true) {
                        player6Name = `[\`${player6HeroName}\`]`
                    } else {
                        player6Name = `[\`${player6HeroName}\`]`
                    }

                    if (body.players[7].isRadiant == true) {
                        player7Name = `[\`${player7HeroName}\`]`
                    } else {
                        player7Name = `[\`${player7HeroName}\`]`
                    }

                    if (body.players[8].isRadiant == true) {
                        player8Name = `[\`${player8HeroName}\`]`
                    } else {
                        player8Name = `[\`${player8HeroName}\`]`
                    }

                    if (body.players[9].isRadiant == true) {
                        player9Name = `[\`${player9HeroName}\`]`
                    } else {
                        player9Name = `[\`${player9HeroName}\`]`
                    }

                    var win;

                    if (body.radiant_win === true) {
                        win = 'Radiant Team Victory'
                    } else if (body.radiant_win === false) {
                        win = 'Dire Team Victory'
                    }

                    var radiantScore;
                    var direScore;

                    radiantScore = body.radiant_score
                    direScore = body.dire_score

                    var gameMode;
                    const gameModeRandomPlayer = body.players[0].game_mode

                    if (gameModeRandomPlayer == 0) {
                        gameMode = 'Unknown'
                    } else if (gameModeRandomPlayer == 1) {
                        gameMode = 'All Pick'
                    } else if (gameModeRandomPlayer == 2) {
                        gameMode = 'Capitan Mode'
                    } else if (gameModeRandomPlayer == 3) {
                        gameMode = 'Random Draft'
                    } else if (gameModeRandomPlayer == 4) {
                        gameMode = 'Single Draft'
                    } else if (gameModeRandomPlayer == 5) {
                        gameMode = 'All Random'
                    } else if (gameModeRandomPlayer == 6) {
                        gameMode = 'Intro'
                    } else if (gameModeRandomPlayer == 7) {
                        gameMode = 'Diretide'
                    } else if (gameModeRandomPlayer == 8) {
                        gameMode = 'Reverse Captains Mode'
                    } else if (gameModeRandomPlayer == 9) {
                        gameMode = 'Greeviling'
                    } else if (gameModeRandomPlayer == 10) {
                        gameMode = 'Tutorial'
                    } else if (gameModeRandomPlayer == 1) {
                        gameMode = 'Mid Only'
                    } else if (gameModeRandomPlayer == 12) {
                        gameMode = 'Least Played'
                    } else if (gameModeRandomPlayer == 13) {
                        gameMode = 'Limited Heroes'
                    } else if (gameModeRandomPlayer == 14) {
                        gameMode = 'Compendium Matchmaking'
                    } else if (gameModeRandomPlayer == 15) {
                        gameMode = 'Custom'
                    } else if (gameModeRandomPlayer == 16) {
                        gameMode = 'Captains Draft'
                    } else if (gameModeRandomPlayer == 17) {
                        gameMode = 'Balanced Draft'
                    } else if (gameModeRandomPlayer == 18) {
                        gameMode = 'Ability Draft'
                    } else if (gameModeRandomPlayer == 19) {
                        gameMode = 'Event'
                    } else if (gameModeRandomPlayer == 20) {
                        gameMode = 'Random Death Match'
                    } else if (gameModeRandomPlayer == 21) {
                        gameMode = '1V1 Mid'
                    } else if (gameModeRandomPlayer == 22) {
                        gameMode = 'All Draft'
                    } else if (gameModeRandomPlayer == 23) {
                        gameMode = 'Turbo'
                    } else if (gameModeRandomPlayer == 24) {
                        gameMode = 'Mutation'
                    }

                    var replayGame = `${TICK} __[Click Here To Download](${body.replay_url})__`
                    if (body.players[0].game_mode === 19){
                        replayGame = '⚠__You can not review this game.__'
                    }


                    var skillType;

                    if (body.skill === 1) {
                        skillType = 'Normal Skill'
                    } else if (body.skill === 2) {
                        skillType = 'High Skill'
                    } else if (body.skill === 3) {
                        skillType = 'Very High Skill'
                    } else if (body.skill === null) {
                        skillType = ':):'
                    }

                    message.channel.send(new Discord.MessageEmbed()
                        .setTitle('🟣 Playerly | Full Dota 2 Match Stats')
                        .setColor('#a14cd9')
                        .setDescription('For see the \`Players\` and \`Heroes\` please react with 👤')
                        .setThumbnail(message.guild.iconURL({
                            dynamic: true
                        }))
                        .setFooter(`${message.member.user.username}`, `${client.user.avatarURL()}`)
                        .addFields({
                            name: '📊 Scores (Kills)',
                            value: `\🟩 __Radiant Score__ : **\`${radiantScore}\`**\n\🟥 __Dire Score__ : **\`${direScore}\`**`,
                            inline: true
                        }, {
                            name: '🏆 Winner',
                            value: `**\`${win}\`**`,
                            inline: true
                        }, {
                            name: '\u200b',
                            value: '\u200b'
                        }, {
                            name: '📋 Game Details',
                            value: `🕹 __Game Mode__ : **\`${gameMode}\`**\n🥋 __Skill Type__ : **\`${skillType}\`**`,
                            inline: true
                        }, {
                            name: '📥 Game Review',
                            value: replayGame,
                            inline: true
                        })
                    ).then(m => {
                        if (!m.guild.me.hasPermission('ADD_REACTIONS'))
                            return;
                        message.react('👤')

                        const playerFilter = (reaction, user) => (reaction.emoji.name === '👤') && user.id === message.author.id

                        const playerCollector = message.createReactionCollector(playerFilter, {
                            max: 1,
                            time: 5 * 60 * 1000
                        })
                        playerCollector.on('collect', () => {
                            m.edit(new Discord.MessageEmbed()
                                .setTitle('🟣 Playerly | Full Dota 2 Match Stats (Players)')
                                .setColor('#a14cd9')
                                .setThumbnail(message.guild.iconURL({
                                    dynamic: true
                                }))
                                .setFooter(`${message.member.user.username}`, `${client.user.avatarURL()}`)
                                .addFields({
                                    name: '🟩 Radiant Team Players',
                                    value: `${player0Name} 🥊 Kills : __\`${player0Kills}\`__ | 💀 Deaths : __\`${player0Deaths}\`__ | :people_hugging: Asissts : __\`${player0Assists}\`__\n\n${player1Name} 🥊 Kills : __\`${player1Kills}\`__ | 💀 Deaths : __\`${player1Deaths}\`__ | :people_hugging: Asissts : __\`${player1Assists}\`__\n\n${player2Name} 🥊 Kills : __\`${player2Kills}\`__ | 💀 Deaths : __\`${player2Deaths}\`__ | :people_hugging: Asissts : __\`${player2Assists}\`__\n\n${player3Name} 🥊 Kills : __\`${player3Kills}\`__ | 💀 Deaths : __\`${player3Deaths}\`__ | :people_hugging: Asissts : __\`${player3Assists}\`__\n\n${player4Name} 🥊 Kills : __\`${player4Kills}\`__ | 💀 Deaths : __\`${player4Deaths}\`__ | :people_hugging: Asissts : __\`${player4Assists}\`__`
                                },
                                {name: '\u200b', value: '\u200b'},
                                {
                                    name: '🟥 Dire Team Players',
                                    value: `${player5Name} 🥊 Kills : __\`${player5Kills}\`__ | 💀 Deaths : __\`${player5Deaths}\`__ | :people_hugging: Asissts : __\`${player5Assists}\`__\n\n${player6Name} 🥊 Kills : __\`${player6Kills}\`__ | 💀 Deaths : __\`${player6Deaths}\`__ | :people_hugging: Asissts : __\`${player6Assists}\`__\n\n${player7Name} 🥊 Kills : __\`${player7Kills}\`__ | 💀 Deaths : __\`${player7Deaths}\`__ | :people_hugging: Asissts : __\`${player7Assists}\`__\n\n${player8Name} 🥊 Kills : __\`${player8Kills}\`__ | 💀 Deaths : __\`${player8Deaths}\`__ | :people_hugging: Asissts : __\`${player8Assists}\`__\n\n${player9Name} 🥊 Kills : __\`${player9Kills}\`__ | 💀 Deaths : __\`${player9Deaths}\`__ | :people_hugging: Asissts : __\`${player9Assists}\`__`
                                })
                            )
                        })
                    })
                }))
            }).catch(err => {
                console.log(err)
                message.channel.send(new Discord.MessageEmbed()
                    .setColor('#66001b')
                    .setDescription(`${BAD} There is have an error Please report to developers.\n یک مشکلی وجود دارد لطفا به توسعه دهندگان گزارش کنید`)
                )
            }))
    }
}