const Discord = require('discord.js')
const vipModel = require('../vipModel')

module.exports = {
    name: 'vip',
    description: 'Buy vip for server',
    async execute(message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')

        let rezaPC = '803366152121221130' 

        if (message.author.id !== rezaPC){
            message.channel.send(new Discord.MessageEmbed()
            .setColor('#69beff')
            .setDescription(`${LOADING} Loading...`)
            ).then(message => {
                setTimeout( () => {
                    message.delete().then(message => {
                        setTimeout( () => {
                            message.channel.send(new Discord.MessageEmbed()
                            .setColor('##66001b')
                            .setDescription(`${BAD} xD you can't use this command.This command only for bot owner`)
                            )
                        },6500)
                    })
                },5000)
            })
            return;
        }

        let ownerGuild = message.mentions.users.first()

        if (!ownerGuild)
        return;

        let guildId = args.slice(1).join(' ')

        if (!guildId){

            message.channel.send('You sure? There is no guild added if you want to continue react with \`👍🏻\`')
            .then(m => {
                m.react('👍🏻')

                const filter = (reaction, user) => (reaction.emoji.name === '👍🏻') && user.id === message.author.id

                const collector = m.createReactionCollector(filter, {
                    max: 1,
                    time: 5 * 60 * 60 * 1000
                })

                collector.on('collect', () => {

                    const newVip = new vipModel({
                        ownerId: ownerGuild.id
                    })

                    newVip.save()
                    .then(
                        m.edit('Done!')
                    ).catch(err => {
                        console.log(err)
                    })
                })
            })
            return;
        }

        const newVipGuild = new vipModel ({
            guildId: guildId,
            ownerId: ownerGuild.id
        })

        newVipGuild.save()
        .then (
            message.channel.send (`User: ${ownerGuild.username}\nServerID: ${guildId}\n VIP list has been updated`)
        ).catch(err => {
            console.log(err)
        })


    }
}