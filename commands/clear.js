const Discord = require ('discord.js')

module.exports = {
    name: 'clear',
    description: 'Clear the text channel',
    async execute (message, args, client) {
        const Server = client.guilds.cache.get('809316388404723713')
        const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
        const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
        const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
        const LOADING = Server.emojis.cache.find(l => l.name == 'Load')

    if (!message.member.hasPermission('MANAGE_MESSAGES'))
      return message.channel.send(new Discord.MessageEmbed()
      .setDescription(`${BAD} You don\'t have permission.\n.شما دسترسی استفاده از این دستور را ندارید`)
      .setColor('#66001b')
      );
    if (!message.guild.me.hasPermission('MANAGE_MESSAGES'))
      return message.channel.send(new Discord.MessageEmbed()
      .setColor('#66001b')
      .setDescription(`${BAD} Oops! Please check my permissions.\n.یک مشکلی وجود دارد! لطفا دسترسی های من را بررسی کنید`)
    )
    if (!isNaN(message.content.split(' ')[1])) {
      let amount = 0;
      if (message.content.split(' ')[1] === '1' || message.content.split(' ')[1] === '0') {
        amount = 1;
      } else {
        amount = message.content.split(' ')[1];
        if (amount > 100) {
          amount = 100;
        }
      }
      await message.delete().catch(e => { amount++; });

      await message.channel.bulkDelete(amount, true).then((_message) => {
        message.channel.send(`${TICK} | Playerly cleared \`${_message.size}\` messages`).then((sent) => {
          setTimeout(function () {
            sent.delete();
          }, 3500);
        });
      });
    } else {
      message.channel.send(new Discord.MessageEmbed()
      .setColor('#66001b')
      .setDescription(`${BAD} Please enter a number between 1 and 100.\nلطفا عددی بین 1 تا 100 انتخاب کنید.`)
      ).then((sent) => {
        setTimeout(function () {
          sent.delete();
        }, 5000);
      });
    }
}
}