const Discord = require ('discord.js')

const prefixModel = require ('../prefixSchema')

module.exports = {
    name: 'resetprefix',
    description: 'Remove Prefix to [.]',
    async execute (message, args, client) {

        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')


        if (!message.member.hasPermission('ADMINISTRATOR'))
        return message.channel.send (new Discord.MessageEmbed()
        .setColor ('#66001b')
        .setDescription (`${BAD} You can't use this command.\n شما نمیتوانید از این دستور استفاده کنید`)
        )

        prefixModel.findOne({
            guildId: message.guild.id,
        }, async (err, data) => {
            if (err)
            return console.warn(err)

            if (!data) {
                message.channel.send (new Discord.MessageEmbed()
                .setColor ('#66001b')
                .setDescription (`${BAD} This guild has default prefix.\n این سرور پیشوند پیش فرض دارد`)
                )
            }else if (data){
                prefixModel.deleteOne({
                    guildId: message.guild.id
                })
                .then(
                    message.channel.send(new Discord.MessageEmbed()
                    .setColor ('#4c4179')
                    .setDescription (`${TICK} Prefix was reset to default successfully.`)
                    )
                ).catch(err => {
                    console.warn(err)
                })
            }
            
        })

    }
}