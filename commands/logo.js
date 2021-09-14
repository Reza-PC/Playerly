const Discord = require ('discord.js')
module.exports = {
    name: 'logo',
    description: 'Send random logo custom.',
    async execute (message, args, client) {
        
        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')

        let text = args[0]
        let text1 = args[1]
        let text2 = args[2]
        let text3 = args[3]
        let text4 = args[4]
    

        const random = Math.floor(Math.random() * 203) + 1
    

        if (!text){
            message.channel.send(new Discord.MessageEmbed()
            .setColor (`#66001b`)
            .setDescription (`${BAD} Please enter the text to image.\nلطفا یک متن برای تبدیل  به عکس وارد کنید`)
            )
        }
        else if(text && !text1){
        const link = `http://api.persianteamd.ir/logo/index.php?number=${random}&text=${text}`
            message.channel.send(new Discord.MessageEmbed()
            .setImage (`${link}`)
            .setTitle (`${message.member.user.username}`)
            .setColor (`#a14cd9`)
            .setFooter ('Powered by PersianTeam API')
        )
        }
        else if(text1 && !text2){
        const link = `http://api.persianteamd.ir/logo/index.php?number=${random}&text=${text}%20${text1}`
            message.channel.send(new Discord.MessageEmbed()
            .setImage (`${link}`)
            .setTitle (`${message.member.user.username}`)
            .setColor (`#a14cd9`)
            .setFooter ('Powered by PersianTeam API')
            )
        }
        else if(text2 && !text3){
        const link = `http://api.persianteamd.ir/logo/index.php?number=${random}&text=${text}%20${text1}%20${text2}`
        message.channel.send(new Discord.MessageEmbed()
            .setImage (`${link}`)
            .setTitle (`${message.member.user.username}`)
            .setColor (`#a14cd9`)
            .setFooter ('Powered by PersianTeam API')
            )
        }
        else if(text3 && !text4){
        const link = `http://api.persianteamd.ir/logo/index.php?number=${random}&text=${text}%20${text1}%20${text2}%20${text3}`
        message.channel.send(new Discord.MessageEmbed()
            .setImage (`${link}`)
            .setTitle (`${message.member.user.username}`)
            .setColor (`#a14cd9`)
            .setFooter ('Powered by PersianTeam API')
            )
        }
        else if(text4){
        message.channel.send(new Discord.MessageEmbed()
            .setColor(`#66001b`)
            .setDescription(`${BAD} You may not post more than 4 words.\nشما نمیتوانید بیشتر از 4 کلمه ارسال کنید`)
            )
        }
        }
}