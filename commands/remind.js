const Discord = require ('discord.js')

const ms = require ('ms')

module.exports = {
    name: 'remind',
    description: 'Reminder',
    async execute(message, args, client) {
        let time = args.slice(0).join(' ')

        if (!time)
        return message,channel.send('Please set a time to remind you like : \`.remind 1m\`')

        message.channel.send (`I remind you after ${ms(ms(time))}`)

        setTimeout( () => {
            message.channel.send(`${message.member.user} Reminder 🔔 (Please react with ⏲)`).then (m => {
                m.react ('⏲')

                const filter = (reaction, user) => (reaction.emoji.name === '⏲') && user.id === message.author.id
                const collector = m.createReactionCollector(filter,{
                    max: 1,
                    time: 30000,
                })
                
                collector.on('end', () => {
                    message.author.send('Excuse me, I came here to say your time is up\n ببخشید من اینجا اومدم بگم که وقت شما تمام شد')
                    .catch(err => {
                        
                    })
                })
                collector.on('collect', () => {
                    message.channel.send('I will happy if you invite me to your server. `.invite`')
                })
            })
        }, ms(time))
    }
}