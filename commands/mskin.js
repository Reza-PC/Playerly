const Discord = require ('discord.js')
const fetch = require ('node-fetch')

module.exports = {
    name: 'mskin',
    description: `Show's the Minecraft Player Skin`,
    async execute (message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')

        let nickName = args[0]

        if (!nickName)
        return message.channel.send(new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} Please send a nickname after command.\nلطفا بعد از دستور نامی را ارسال کنید`)
        )
    
        const url = `https://api.mojang.com/users/profiles/minecraft/${nickName}?at=1`;
        await fetch(url).then(res => res.json()).then(body =>{
          const name = body.name
          const id = body.id
          const skin = `https://crafatar.com/renders/body/${id}`
    
          message.channel.send (new Discord.MessageEmbed()
            .setColor('#69beff')
            .setDescription (`${LOADING} Loading..`)
            )
            .then (message => {
                setTimeout(function (){
                    message.delete()
                    .then(message => {
                        setTimeout(function (){
                            message.channel.send(new Discord.MessageEmbed()
                            .setColor ('#a14cd9')
                            .setImage (skin)
                            .setTitle (`${name}`)
                            )
                        }, 2000)
                    })
                }, 1500)
            })
        }).catch(err =>{
              message.channel.send(new Discord.MessageEmbed()
              .setColor('#66001b')
              .setDescription(`${BAD} Invalid Name.\nنام نامعتبر است`)
              )
              console.warn(`The problem :` + err)
          })
    }
}  