const Discord = require ('discord.js')

module.exports = {
    name: 'cat',
    description: `Send random cat picture.`,
    async execute(message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')
        
        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

        message.channel.send (new Discord.MessageEmbed()
            .setColor('#69beff')
            .setDescription (`${LOADING} Loading..`)
            )
                .then(message =>{
                    setTimeout(() => {
                    message.delete()
                },1500)
            })
                .then(setTimeout(() =>{
                    message.channel.send(new Discord.MessageEmbed()
                    .setTitle('Mewo 😺')
                    .setImage(file)
                    .setColor('#a14cd9')
                    .setFooter (`${message.member.user.username}`, `${client.user.avatarURL()}`)
                
                    )
        },2000))
    }
}