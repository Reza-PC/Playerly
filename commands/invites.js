const Discord = require ('discord.js')

module.exports = {
    name: 'invites',
    description: `Show's user invites`,
    execute (message, args, client) {
        var user = message.author;

        message.guild.fetchInvites()
  
        .then (invites=> {
            const userInvites = invites.array().filter(o => o.inviter.id === user.id);
            var userInviteCount = 0;
            for (var i=0; i < userInvites.length; i++) {
                var invite = userInvites[i];
                userInviteCount += invite['uses'];
            }
            message.channel.send(new Discord.MessageEmbed()
            .setTitle (`🟣 Playerly | Invites`)
            .setColor ('#a14cd9')
            .setThumbnail (`${message.member.user.displayAvatarURL({dynamic:true})}`)
            .setFooter (`${message.member.user.username}`, `${client.user.avatarURL()}`)
            .addFields (
                {name: `${message.member.user.username} has `, value: '**`' + userInviteCount + '`** invites'}
            )
          )
        }
      )
    }
}