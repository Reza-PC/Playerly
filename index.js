const Discord = require ('discord.js');
const client = new Discord.Client();
const disbut = require('discord-buttons')(client)

 

const {
    prefix,
    bot_about,
    mongooseLink,
    pastepApiKey,
    steamApiKey,
    discordToken,
} = require ('./config.json')

const youtubeAPI = require('youtube-notification')

const mongoose = require('mongoose')


const profileModel = require('./profileSchema')
const logChannel = require('./logs')
const prefixDB = require('./prefixSchema')
const voiceModel = require('./logVoice')


mongoose.connect(mongooseLink, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

//Packages

const fs = require ('fs');
const moment = require ('moment')
const momentir = require ('moment-jalali')

client.on('ready', () => {
    console.log(`${client.user.username} is online now.`);
})

client.on('ready', () => {
    client.user.setStatus('idle')
    client.user.setActivity(`${client.users.cache.size} Users | .help`, { 
        type: 'LISTENING',
    })
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); 


for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}


client.on('message', async (message) => {

  const Server = client.guilds.cache.get('809316388404723713')
  const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
  const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
  const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
  const LOADING = Server.emojis.cache.find(l => l.name == 'Load')


  if (message.author.bot || message.channel.type === 'dm')
    return;

  const data = await prefixDB.findOne({
    guildId: message.guild.id,
  })



  if (data) {
    const prefixChanged = data.prefix;

    if (!message.content.startsWith(prefixChanged))
      return;

    const args = message.content.slice(prefixChanged.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command))
      return;

    try {
      client.commands.get(command).execute(message, args, client, command)
    } catch (err) {
      message.channel.send(`${message.author.username} Sorry but i can't execute ${command} Command. Please report this to developers.`)
      console.warn(`The problem :` + err)
    }

  } else if (!data) {

    if (!message.content.startsWith(prefix))
      return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command))
      return;

    try {
      client.commands.get(command).execute(message, args, client, command)
    } catch (err) {
      message.channel.send(`${message.author.username} Sorry but i can't execute ${command} Command. Please report this to developers.`)
      console.warn(`The problem :` + err)
    }

  }
})



//Welcome/Guilds/Messages

client.on ('guildCreate', guild =>{
    let channelL = '';
  
    guild.channels.cache.forEach((channel) =>{
        if (channel.type == 'text' && channelL == ''){
            if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")){
                channelL = channel
            }
        }
    })
    channelL.send(new Discord.MessageEmbed()
    .setTitle (`${guild.name} Hey`)
    .setColor ('#f069ff')
    .setDescription ('Server support : \`.discord\`\nHelp : \`.help\`\nInstagram : \`.instagram\`')
    .setThumbnail (guild.iconURL({dynamic:true}))
    )
    
  })
  
  client.on('guildCreate', guild =>{
    const playerlyGuild = client.guilds.cache.get('803940755168034829')
    const channel = playerlyGuild.channels.cache.get('815701544719614003')
  
   channel.send(new Discord.MessageEmbed()
   .setTitle ('🟣 Playerly | Servers')
   .setColor ('#f069ff')
   .setThumbnail (client.user.avatarURL({dynamic:true}))
   .setFooter (`${guild.owner.user.tag}`, `${client.user.avatarURL()}`)
   .setDescription (`Playerly was added to **${guild.name}**\nThanks [**${guild.owner.user.username}**]\nNow we in **${client.guilds.cache.size}** Servers.\nInvite Link : **[Playerly](https://discord.com/api/oauth2/authorize?client_id=803732720751738901&permissions=2020715764&scope=bot)**`)
   
   )
  })
  
  client.on('guildMemberAdd', member =>{
    if (member.user.bot)return;
    const rulesChannel = member.guild.channels.cache.get('807093618853937152')
    const welcomeChannel = member.guild.channels.cache.get('813016076283019274')
  
    if (!welcomeChannel)return;
    if (!rulesChannel)return;
  
  
    const welcomeEmbedMessage = new Discord.MessageEmbed()
    .setTitle ('🟣 Playerly | Welcomer')
    .setThumbnail (client.user.avatarURL())
    .setColor ('#f069ff')
    .setFooter (`${member.user.username}`, `${client.user.avatarURL()}`)
    .setDescription (`🎉Welcome to Playerly | Please read ${rulesChannel} channel.`)
    .addFields(
      {name: `We now with you ${member.user.username} have :`, value: `__${member.guild.memberCount}__ Members`},
      {name: `And Playerly works on :`, value: `${client.guilds.cache.size} Servers`}
    )
  
      welcomeChannel.send(`${member.user}`, welcomeEmbedMessage)
})

//Logs

//GuildUpdate
client.on('guildUpdate', async (newGuild, oldGuild) => {
  const Server = client.guilds.cache.get('809316388404723713')
  const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
  const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
  const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')

  await logChannel.findOne({
    guildId: newGuild.id,
  }, async (err, data) => {
    if (err)
      return console.warn(err)

    if (!data) {
      return
    } else {
      const fetchedLogs = await newGuild.fetchAuditLogs({
        limit: 1,
        type: 'GUILD_UPDATE'
      })
      const deletionLog = fetchedLogs.entries.first()

      const changesMap = deletionLog.changes.map(l => {
        return `Old : [\`${l.old}\`] | New : [\`${l.new}\`]`
      }).join('\n')

      if (!changesMap)
        return changesMap = 'None';

      const logChannel = newGuild.channels.cache.find(l => l.name === `<#${data.channelId}>` || l.id === data.channelId)


      if (!logChannel)
        return;

      if (!logChannel.viewable)
        return;

      if (!logChannel.permissionsFor(client.user).has('SEND_MESSAGES'))
        return;


      logChannel.send(new Discord.MessageEmbed()
        .setTitle(`🟣 Playerly | ${LOGS} Guild Updated`)
        .setColor(`#4c4179`)
        .setTimestamp()
        .setThumbnail(newGuild.iconURL({ dynamic: true }))
        .addFields(
          { name: '👤 **User**', value: `<@${deletionLog.executor.id}>`, inline: true },
          { name: '🌍 **Region**', value: `\`${deletionLog.target.region}\``, inline: true },
          { name: '👥 **MemberCount**', value: `\`${deletionLog.target.memberCount}\``, inline: true },
          { name: '👑 **Owner**', value: `<@${deletionLog.target.ownerID}>`, inline: true },
          { name: '🔃 **Changes**', value: changesMap }
        )
      )

    }

  })
})

//ChannelCreate
client.on('channelCreate', async (channel) => {
  const Server = client.guilds.cache.get('809316388404723713')
  const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
  const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
  const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')

  logChannel.findOne({
    guildId: channel.guild.id,
  }, async (err, data) => {
    if (err)
      return console.warn(err)

    if (!data) {
      return
    } else {
      const logChannel = channel.guild.channels.cache.find(l => l.name === `<#${data.channelId}>` || l.id === data.channelId)

      if (!logChannel)
        return;

      if (!logChannel.viewable)
        return;

      if (!logChannel.permissionsFor(client.user).has('SEND_MESSAGES'))
        return;

      logChannel.send(new Discord.MessageEmbed()
        .setTitle(`🟣 Playerly | ${LOGS} Channel Created`)
        .setColor('#4c4179')
        .setTimestamp()
        .setThumbnail(channel.guild.iconURL({ dynamic: true }))
        .addFields(
          { name: '📭 **Channel **', value: '<#' + channel + '>' },
          { name: '🆔 **Channel ID **:', value: '`' + channel.id + '`' },
          { name: '🗨 **Channel Type**', value: `\`${channel.type}\`` }
        )
      )
    }
  })
})

//ChannelDelete
client.on('channelDelete', async (channel) => {

  const Server = client.guilds.cache.get('809316388404723713')
  const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
  const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
  const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')


  logChannel.findOne({
    guildId: channel.guild.id,
  }, async (err, data) => {
    if (err)
      return console.warn(err)

    if (!data) {
      return
    } else {
      const logChannel = channel.guild.channels.cache.find(l => l.name === `<#${data.channelId}>` || l.id === data.channelId)

      if (!logChannel)
        return;

      if (!logChannel.viewable)
        return;

      if (!logChannel.permissionsFor(client.user).has('SEND_MESSAGES'))
        return;

      logChannel.send(new Discord.MessageEmbed()
        .setTitle(`🟣 Playerly | ${LOGS} Channel Deleted`)
        .setColor('#4c4179')
        .setTimestamp()
        .setThumbnail(channel.guild.iconURL({ dynamic: true }))
        .addFields(
          { name: '📭 **Channel**', value: '`' + channel.name + '`' },
          { name: '🆔 **Channel ID**', value: '`' + channel.id + '`' },
          { name: '🗨 **Channel Type**', value: `\`${channel.type}\`` }
        )
      )
    }
  })
})

client.on('emojiCreate', emoji => {
  const Server = client.guilds.cache.get('809316388404723713')
  const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
  const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
  const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')

  logChannel.findOne({
    guildId: emoji.guild.id,
  }, async (err, data) => {
    if (err)
      return console.warn(err)

    if (!data) {
      return
    } else {
      const logChannel = emoji.guild.channels.cache.find(l => l.name === `<#${data.channelId}>` || l.id === data.channelId)

      if (!logChannel)
        return;

      if (!logChannel.viewable)
        return;

      logChannel.send(new Discord.MessageEmbed()
        .setTitle(`🟣 Playerly | ${LOGS} Emoji Created`)
        .setColor('#4c4179')
        .setTimestamp()
        .setThumbnail(emoji.guild.iconURL({ dynamic: true }))
        .addFields(
          { name: '😀 **Emoji**', value: `<:${emoji.name}:${emoji.id}>` },
          { name: '🍀 **Emoji Name**', value: '`' + emoji.name + '`' },
          { name: '🆔 **Emoji ID**', value: '`' + emoji.id + '`' },
        )
      )
    }
  })
})

client.on('emojiDelete', emoji => {

  const Server = client.guilds.cache.get('809316388404723713')
  const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
  const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
  const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')

  logChannel.findOne({
    guildId: emoji.guild.id,
  }, async (err, data) => {
    if (err)
      return console.warn(err)

    if (!data) {
      return
    } else {
      const logChannel = emoji.guild.channels.cache.find(l => l.name === `<#${data.channelId}>` || l.id === data.channelId)

      if (!logChannel)
        return;

      if (!logChannel.viewable)
        return;

      if (!logChannel.permissionsFor(client.user).has('SEND_MESSAGES'))
        return;

      logChannel.send(new Discord.MessageEmbed()
        .setTitle(`🟣 Playerly | ${LOGS} Emoji Deleted`)
        .setColor('#4c4179')
        .setTimestamp()
        .setThumbnail(emoji.guild.iconURL({ dynamic: true }))
        .addFields(
          { name: '🍀 **Emoji Name**', value: '`' + emoji.name + '`' },
          { name: '🆔 **Emoji ID**', value: '`' + emoji.id + '`' },
        )
      )
    }
  })
})

client.on('roleCreate', role => {
  const Server = client.guilds.cache.get('809316388404723713')
  const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
  const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
  const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')

  logChannel.findOne({
    guildId: role.guild.id,
  }, async (err, data) => {
    if (err)
      return console.warn(err)

    if (!data) {
      return
    } else {
      const logChannel = role.guild.channels.cache.find(l => l.name === `<#${data.channelId}>` || l.id === data.channelId)

      if (!logChannel)
        return;

      if (!logChannel.viewable)
        return;

      if (!logChannel.permissionsFor(client.user).has('SEND_MESSAGES'))
        return;

      logChannel.send(new Discord.MessageEmbed()
        .setTitle(`🟣 Playerly | ${LOGS} Role Created`)
        .setColor('#4c4179')
        .setTimestamp()
        .setThumbnail(role.guild.iconURL({ dynamic: true }))
        .addFields(
          { name: '🎪 **Role**', value: `${role}` },
          { name: '💬 **Role Name**', value: '`' + role.name + '`' },
          { name: '🆔 **Role ID**', value: '`' + role.id + '`' },
          { name: '⬛ **Role Color**', value: '`' + role.hexColor + '`' },
          { name: '📌 **Permissions**', value: '`' + role.permissions + '`' }
        )
      )
    }
  })
})


client.on('roleDelete', role => {
  const Server = client.guilds.cache.get('809316388404723713')
  const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
  const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
  const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')

  logChannel.findOne({
    guildId: role.guild.id,
  }, async (err, data) => {
    if (err)
      return console.warn(err)

    if (!data) {
      return
    } else {
      const logChannel = role.guild.channels.cache.find(l => l.name === `<#${data.channelId}>` || l.id === data.channelId)

      if (!logChannel)
        return;

      if (!logChannel.viewable)
        return;

      if (!logChannel.permissionsFor(client.user).has('SEND_MESSAGES'))
        return;

      logChannel.send(new Discord.MessageEmbed()
        .setTitle(`🟣 Playerly | ${LOGS} Role Deleted`)
        .setColor('#4c4179')
        .setTimestamp()
        .setThumbnail(role.guild.iconURL({ dynamic: true }))
        .addFields(
          { name: '💬 **Role Name :**', value: '`' + role.name + '`' },
          { name: '🆔 **Role ID :**', value: '`' + role.id + '`' },
          { name: '⬛ **Role Color :**', value: '`' + role.hexColor + '`' },
          { name: '📌 **Permissions :**', value: '`' + role.permissions + '`' }
        )
      )
    }
  })
})

client.on('inviteCreate', invite => {
  const Server = client.guilds.cache.get('809316388404723713')
  const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
  const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
  const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')

  logChannel.findOne({
    guildId: invite.guild.id,
  }, async (err, data) => {
    if (err)
      return console.warn(err)

    if (!data) {
      return
    } else {
      const logChannel = invite.guild.channels.cache.find(l => l.name === `<#${data.channelId}>` || l.id === data.channelId)

      if (!logChannel)
        return;

      if (!logChannel.viewable)
        return;

      if (!logChannel.permissionsFor(client.user).has('SEND_MESSAGES'))
        return;

      const InviteExpire = moment(invite.expiresAt).calendar()
      logChannel.send(new Discord.MessageEmbed()
        .setTitle(`🟣 Playerly | ${LOGS} Invite Created`)
        .setColor('#4c4179')
        .setTimestamp()
        .setThumbnail(invite.guild.iconURL({ dynamic: true }))
        .addFields(
          { name: '⚙ **Invite Link :**', value: '`' + invite.url + '`' },
          { name: '👥 **Invite MaxMember :**', value: '`' + invite.maxUses + '`' },
          { name: '📚 **Invite Code :**', value: '`' + invite.code + '`' },
          { name: '📬 **Invite Channel :**', value: '<#' + invite.channel + '>' },
          { name: '👤 **Invite Expire :**', value: '`' + InviteExpire + '`' }
        )
      )
    }
  })
})

client.on('voiceStateUpdate', voice => {
  const Server = client.guilds.cache.get('809316388404723713')
  const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
  const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
  const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')

  voiceModel.findOne({
    guildId: voice.guild.id
  }, async (err, data) => {
    if (err)
      return console.warn(err)

    if (data) {
      return
    } else if (!data) {

      logChannel.findOne({
        guildId: voice.guild.id,
      }, async (err, data) => {
        if (err)
          return console.warn(err)

        if (!data) {
          return
        } else {
          const logChannel = voice.guild.channels.cache.find(l => l.name === `<#${data.channelId}>` || l.id === data.channelId)

          if (!logChannel)
            return;

          if (!logChannel.viewable)
            return;

          if (!logChannel.permissionsFor(client.user).has('SEND_MESSAGES'))
            return;

          if (voice.member.voice.channel) {

            logChannel.send(new Discord.MessageEmbed()
              .setTitle(`🟣 Playerly | ${LOGS} Voice Updated`)
              .setColor('#4c4179')
              .setTimestamp()
              .setThumbnail(voice.guild.iconURL({ dynamic: true }))
              .addFields(
                { name: '📥 **Member**', value: `${voice.member.user.username}` },
                { name: '🎤 **Voice Channel**', value: `**${voice.member.voice.channel.name}**` },
                { name: '🎤 **Voice ChannelID**', value: '`' + voice.member.voice.channel.id + '`' },
                // {name: '🎥 | **Member Streaming? :**', value: `${voice.member.voice.streaming}`}
              )
            )
          }
          const voiceMemberStreaming = voice.member.voice.streaming

          if (voiceMemberStreaming) {
            logChannel.send(new Discord.MessageEmbed()
              .setTitle(`🟣 Playerly | ${LOGS} Voice Streaming`)
              .setColor('#4c4179')
              .setDescription(`${voice.member.user} Started streaming on ${voice.channel}`)
              .setTimestamp()
              .setThumbnail(voice.guild.iconURL({ dynamic: true }))
            )
          }
        }
      })
    }
  })
})
//Commands

client.on('message', async (message) => {

  const Server = client.guilds.cache.get('809316388404723713')
  const BAD = Server.emojis.cache.find(l => l.name == 'Bad')
  const TICK = Server.emojis.cache.find(l => l.name == 'Tick')
  const LOGS = Server.emojis.cache.find(l => l.name == 'Logs')
  const UP = Server.emojis.cache.find(l => l.name == 'UP')
  const MIDDLE = Server.emojis.cache.find(l => l.name == 'MIDDLE')
  const DOWN = Server.emojis.cache.find(l => l.name == 'DOWN')

  if (message.author.bot || message.channel.type === 'dm')
    return;

  const data = await prefixDB.findOne({
    guildId: message.guild.id,
  })

  if (data) {
    const prefixChanged = data.prefix;

    if (!message.content.startsWith(prefixChanged))
      return;

    const args = message.content.slice(prefixChanged.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
      case 'commands' : {
        message.channel.send(new Discord.MessageEmbed()
        .setTitle ('🟣 Playerly | Commands Category')
        .setColor ('#4c4179')
        .setThumbnail (client.user.avatarURL({size: 256}))
        .setFooter (`${message.author.username}`, `${message.author.avatarURL()}`)
        .setDescription (`**⚙ Prefix = \`${data.prefix}\`**\n 
        ${UP} \u200b **Tool Commands** = \`${data.prefix}tc\` Or \`🔧\` \n
        ${UP} \u200b **Logs Commands** = \`${data.prefix}lc\` Or \`📚\` \n 
        ${UP} \u200b **OwnerShip Commands** = \`${data.prefix}oc\` Or \`👑\`  \n
        ${UP} \u200b **Modrator Commands** = \`${data.prefix}mc\` Or \`💼\`  \n
        ${UP} \u200b **Game Commands** = \`${data.prefix}gc\` Or \`🎮\` \n
        ${UP} \u200b **Fun Commands** = \`${data.prefix}fc\` Or \`😂\` \n
        ${UP} \u200b **Economy Commands** = \`${data.prefix}ec\` Or \`💸\``)
        ).then(m =>{
          m.react('🔧')
          m.react('📚')
          m.react('👑')
          m.react('💼')
          m.react('🎮')
          m.react('😂')
          m.react('💸')

          const toolFilter = (reaction, user) => (reaction.emoji.name === '🔧') && user.id === message.author.id

          const toolCollector = m.createReactionCollector(toolFilter, {
            max: 1,
            time: 5 * 60 * 1000
          }).catch (err => {
            console.log (err)
          })

          toolCollector.on('collect', () => {

            m.reactions.removeAll(1000)

            m.edit(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Tool Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${m.author.username}`, m.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} Target Avatar`, value: `\`${data.prefix}avatar <user>\``, inline:true},
              {name: `${UP} Server Stats`, value: `\`${data.prefix}server\``, inline:true},
              {name: `${UP} Steam Account Details`, value: `\`${data.prefix}steam <player>\``, inline:true},
              {name: `${UP} Server Invites`, value: `\`${data.prefix}invites\``, inline:true},
              {name: `${UP} Random Logo`, value: `\`${data.prefix}logo <word>\``, inline:true},
              {name: `${UP} Report Someone`, value: `\`${data.prefix}report <user>\``, inline:true},
              {name: `${UP} Region List`, value: `\`${data.prefix}rlist\``,inline:true},
              {name: `${UP} Show BirthDay Details`, value: `\`${data.prefix}year <Year> <Month 01 - 12> <Day 01 - 31>\``, inline:true}
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
          }).catch (err => {
            console.log (err)
          })

          const logFilter = (reaction, user) => (reaction.emoji.name === '📚') && user.id === message.author.id

          const logCollector = m.createReactionCollector(logFilter, {
            max: 1,
            time: 5 * 60 * 1000
          })

          logCollector.on('collect', () => {

            m.reactions.removeAll(1000)

            m.edit(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Log Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${m.author.username}`, m.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} Create Log Channel`, value: `\`${data.prefix}clog\``, inline:true},
              {name: `${UP} Logs Category Help`, value: `\`${data.prefix}hlog\``, inline:true},
              {name: `${UP} Set Logs Log Channel`, value: `\`${data.prefix}logs <channel>\``, inline:true},
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
          })


          const ownerFilter = (reaction, user) => (reaction.emoji.name === '👑') && user.id === message.author.id

          const ownerCollector = m.createReactionCollector(ownerFilter, {
            max: 1,
            time: 5 * 60 * 1000
          })

          ownerCollector.on('collect', () => {

            m.reactions.removeAll(1000)

            m.edit(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | OwnerShip Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${m.author.username}`, m.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} Join To Your Voice Channel`, value: `\`${data.prefix}join\``, inline:true},
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
          }).catch (err => {
            console.log (err)
          })


          const modratorFilter = (reaction, user) => (reaction.emoji.name === '💼') && user.id === message.author.id

          const modratorCollector = m.createReactionCollector(modratorFilter, {
            max: 1,
            time: 5 * 60 * 1000
          })

          modratorCollector.on('collect', () => {

            m.reactions.removeAll(1000)

            m.edit(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Modrator Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${m.author.username}`, m.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} Mute User`, value: `\`${data.prefix}mute <user>\``, inline:true},
              {name: `${MIDDLE} Unmute User`, value: `\`${data.prefix}unmute <user>\``, inline:true},
              {name: `${UP} Ban User`, value: `\`${data.prefix}ban <user>\``, inline:true},
              {name: `${UP} Delete Channels`, value: `\`${data.prefix}tdelete | ${data.prefix}vdelete\``, inline:true},
              {name: `${UP} Change Server Region`, value: `\`${data.prefix}setregion <region>\``, inline:true},
              {name: `${UP} Clear Text Channel`, value: `\`${data.prefix}clear <number>\``, inline:true},
              {name: `${UP} Set Report Channel`, value: `\`${data.prefix}setreport <channel>\``, inline:true},
              {name: `${UP} Change Prefix`, value: `\`${data.prefix}prefix <symbols>\``, inline:true},
              {name: `${UP} Reset Prefix`, value: `\`${data.prefix}resetprefix\``, inline:true},
              {name: `${UP} Voice Logs`, value: `\`${data.prefix}voice\``, inline:true},
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
          }).catch (err => {
            console.log (err)
          })


          const funnyFilter = (reaction, user) => (reaction.emoji.name === '😂') && user.id === message.author.id

          const funnyCollector = m.createReactionCollector(funnyFilter, {
            max: 1,
            time: 5 * 60 * 1000
          })

          funnyCollector.on('collect', () => {

            m.reactions.removeAll(1000)

            m.edit(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Funny Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${m.author.username}`, m.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} Random Cat Picture`, value: `\`${data.prefix}cat\``, inline:true},
              {name: `${UP} Random Persian Jokes`, value: `\`${data.prefix}joke\``, inline:true},
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
          }).catch (err => {
            console.log (err)
          })



          const gameFilter = (reaction, user) => (reaction.emoji.name === '🎮') && user.id === message.author.id

          const gameCollector = m.createReactionCollector(gameFilter, {
            max: 1,
            time: 5 * 60 * 1000
          })

          gameCollector.on('collect', () => {

            m.reactions.removeAll(1000)

            m.edit(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Game Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${m.author.username}`, m.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} CS:GO Stats`, value: `\`${data.prefix}csgo <steamID>\``, inline:true},
              {name: `${UP} Minecraft Skin`, value: `\`${data.prefix}mskin <player name>\``, inline:true},
              {name: `${DOWN} Fortnite Stats`, value: `\`${data.prefix}fortnite <name>\``, inline:true},
              {name: `${UP} Dota 2 Match stats`, value: `\`${data.prefix}dota <matchID>\``, inline:true},
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
          })
        }).catch (err => {
          console.log (err)
        })

        const economyFilter = (reaction, user) => (reaction.emoji.name === '💸') && user.id === message.author.id

          const economyCollector = m.createReactionCollector(economyFilter, {
            max: 1,
            time: 5 * 60 * 1000
          })

          economyCollector.on('collect', () => {

            m.reactions.removeAll(1000)

            m.edit(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Economy Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${m.author.username}`, m.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} Show's Profile`, value: `\`${data.prefix}profile\``, inline:true},
              {name: `${UP} Daily Income`, value: `\`${data.prefix}daily\``, inline:true},
              {name: `${UP} Work Income`, value: `\`${data.prefix}work\``, inline:true},
              {name: `${UP} Work List/Limits`, value: `\`${data.prefix}worklist\``, inline:true},
              {name: `${UP} Register Work`, value: `\`${data.prefix}register <work name>\``, inline: true}
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
          }).catch (err => {
            console.log (err)
          })
      }
      break;
      case 'tc' : {
        message.channel.send(new Discord.MessageEmbed()
        .setTitle ('🟣 Playerly | Tool Commands')
        .setColor ('#4c4179')
        .setThumbnail (client.user.avatarURL({size: 256}))
        .setFooter (`${message.author.username}`, message.guild.iconURL({dynamic: true}))
        .addFields (
          {name: `${UP} Target Avatar`, value: `\`${data.prefix}avatar <user>\``, inline:true},
          {name: `${UP} Server Stats`, value: `\`${data.prefix}server\``, inline:true},
          {name: `${UP} Steam Account Details`, value: `\`${data.prefix}steam <player>\``, inline:true},
          {name: `${UP} Server Invites`, value: `\`${data.prefix}invites\``, inline:true},
          {name: `${UP} Random Logo`, value: `\`${data.prefix}logo <word>\``, inline:true},
          {name: `${UP} Report Someone`, value: `\`${data.prefix}report <user>\``, inline:true},
          {name: `${UP} Region List`, value: `\`${data.prefix}rlist\``,inline:true},
          {name: `${UP} Show BirthDay Details`, value: `\`${data.prefix}year <Year> <Month 01 - 12> <Day 01 - 31>\``, inline:true}
        )).then(m => {
          m.react (TICK).then(
            m.react (BAD)
          )
        })
      }
      break;
      case 'lc' : {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Log Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${message.author.username}`, message.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} Create Log Channel`, value: `\`${data.prefix}clog\``, inline:true},
              {name: `${UP} Logs Category Help`, value: `\`${data.prefix}hlog\``, inline:true},
              {name: `${UP} Set Logs Log Channel`, value: `\`${data.prefix}logs <channel>\``, inline:true},
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
      }
      break;
      case 'oc' : {
        message.channel.send(new Discord.MessageEmbed()
        .setTitle ('🟣 Playerly | OwnerShip Commands')
        .setColor ('#4c4179')
        .setThumbnail (client.user.avatarURL({size: 256}))
        .setFooter (`${message.author.username}`, message.guild.iconURL({dynamic: true}))
        .addFields (
          {name: `${UP} Join To Your Voice Channel`, value: `\`${data.prefix}join\``, inline:true},
        )
        ).then(
          m.react(TICK).then(
            m.react(BAD)
          )
        )
      }
      break; 
      case 'mc' : {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Modrator Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${message.author.username}`, message.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} Mute User`, value: `\`${data.prefix}mute <user>\``, inline:true},
              {name: `${MIDDLE} Unmute User`, value: `\`${data.prefix}unmute <user>\``, inline:true},
              {name: `${UP} Ban User`, value: `\`${data.prefix}ban <user>\``, inline:true},
              {name: `${UP} Delete Channels`, value: `\`${data.prefix}tdelete | ${data.prefix}vdelete\``, inline:true},
              {name: `${UP} Change Server Region`, value: `\`${data.prefix}setregion <region>\``, inline:true},
              {name: `${UP} Clear Text Channel`, value: `\`${data.prefix}clear <number>\``, inline:true},
              {name: `${UP} Set Report Channel`, value: `\`${data.prefix}setreport <channel>\``, inline:true},
              {name: `${UP} Change Prefix`, value: `\`${data.prefix}prefix <symbols>\``, inline:true},
              {name: `${UP} Reset Prefix`, value: `\`${data.prefix}resetprefix\``, inline:true},
              {name: `${UP} Voice Logs`, value: `\`${data.prefix}voice\``, inline:true},
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
      }
      break;
      case 'gc' : {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Game Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${message.author.username}`, message.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} CS:GO Stats`, value: `\`${data.prefix}csgo <steamID>\``, inline:true},
              {name: `${UP} Minecraft Skin`, value: `\`${data.prefix}mskin <player name>\``, inline:true},
              {name: `${DOWN} Fortnite Stats`, value: `\`${data.prefix}fortnite <name>\``, inline:true},
              {name: `${UP} Dota 2 Match stats`, value: `\`${data.prefix}dota <matchID>\``, inline:true},
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
      }
      break;
      case 'fc' : {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Funny Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${message.author.username}`, message.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} Random Cat Picture`, value: `\`${data.prefix}cat\``, inline:true},
              {name: `${UP} Random Persian Jokes`, value: `\`${data.prefix}joke\``, inline:true},
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
      }
      break;
      case 'ec' : {
        message.channel.send(new Discord.MessageEmbed()
          .setTitle ('🟣 Playerly | Economy Commands')
          .setColor ('#4c4179')
          .setThumbnail (client.user.avatarURL({size: 256}))
          .setFooter (`${message.author.username}`, message.guild.iconURL({dynamic: true}))
          .addFields (
            {name: `${UP} Show's Profile`, value: `\`${data.prefix}profile\``, inline:true},
            {name: `${UP} Daily Income`, value: `\`${data.prefix}daily\``, inline:true},
            {name: `${UP} Work Income`, value: `\`${data.prefix}work\``, inline:true},
            {name: `${UP} Work List/Limits`, value: `\`${data.prefix}worklist\``, inline:true},
            {name: `${UP} Register Work`, value: `\`${data.prefix}register <work name>\``, inline: true}
            )
        )
      }
    }
  }else if (!data) {

    if (!message.content.startsWith(prefix))
      return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
      case 'commands' : {
        message.channel.send(new Discord.MessageEmbed()
        .setTitle ('🟣 Playerly | Commands Category')
        .setColor ('#4c4179')
        .setThumbnail (client.user.avatarURL({size: 256}))
        .setFooter (`${message.author.username}`, `${message.author.avatarURL()}`)
        .setDescription (`**⚙ Prefix = \`.\`**\n 
        ${UP} \u200b **Tool Commands** = \`.tc\` Or \`🔧\` \n
        ${UP} \u200b **Logs Commands** = \`.lc\` Or \`📚\` \n 
        ${UP} \u200b **OwnerShip Commands** = \`.oc\` Or \`👑\`  \n
        ${UP} \u200b **Modrator Commands** = \`.mc\` Or \`💼\`  \n
        ${UP} \u200b **Game Commands** = \`.gc\` Or \`🎮\` \n
        ${UP} \u200b **Fun Commands** = \`.fc\` Or \`😂\`  \n
        ${UP} \u200b **Economy Commands** = \`.ec\` Or \`💸\` `)
        ).then(m =>{
          m.react('🔧')
          m.react('📚')
          m.react('👑')
          m.react('💼')
          m.react('🎮')
          m.react('😂')
          m.react('💸')

          const toolFilter = (reaction, user) => (reaction.emoji.name === '🔧') && user.id === message.author.id

          const toolCollector = m.createReactionCollector(toolFilter, {
            max: 1,
            time: 5 * 60 * 1000
          })

          toolCollector.on('collect', () => {

            m.reactions.removeAll(1000)

            m.edit(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Tool Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${m.author.username}`, m.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} Target Avatar`, value: `\`.avatar <user>\``, inline:true},
              {name: `${UP} Server Stats`, value: `\`.server\``, inline:true},
              {name: `${UP} Steam Account Details`, value: `\`.steam <player>\``, inline:true},
              {name: `${UP} Server Invites`, value: `\`.invites\``, inline:true},
              {name: `${UP} Random Logo`, value: `\`.logo <word>\``, inline:true},
              {name: `${UP} Report Someone`, value: `\`.report <user>\``, inline:true},
              {name: `${UP} Region List`, value: `\`.rlist\``,inline:true},
              {name: `${UP} Show BirthDay Details`, value: `\`.year <Year> <Month 01 - 12> <Day 01 - 31>\``, inline:true}
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
          }).catch (err => {
            console.log (err)
          })

          const logFilter = (reaction, user) => (reaction.emoji.name === '📚') && user.id === message.author.id

          const logCollector = m.createReactionCollector(logFilter, {
            max: 1,
            time: 5 * 60 * 1000
          })

          logCollector.on('collect', () => {

            m.reactions.removeAll(1000)

            m.edit(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Log Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${m.author.username}`, m.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} Create Log Channel`, value: `\`.clog\``, inline:true},
              {name: `${UP} Logs Category Help`, value: `\`.hlog\``, inline:true},
              {name: `${UP} Set Logs Log Channel`, value: `\`.logs <channel>\``, inline:true},
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
          })


          const ownerFilter = (reaction, user) => (reaction.emoji.name === '👑') && user.id === message.author.id

          const ownerCollector = m.createReactionCollector(ownerFilter, {
            max: 1,
            time: 5 * 60 * 1000
          })

          ownerCollector.on('collect', () => {

            m.reactions.removeAll(1000)

            m.edit(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | OwnerShip Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${m.author.username}`, m.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} Join To Your Voice Channel`, value: `\`.join\``, inline:true},
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
          }).catch (err => {
            console.log (err)
          })


          const modratorFilter = (reaction, user) => (reaction.emoji.name === '💼') && user.id === message.author.id

          const modratorCollector = m.createReactionCollector(modratorFilter, {
            max: 1,
            time: 5 * 60 * 1000
          })

          modratorCollector.on('collect', () => {

            m.reactions.removeAll(1000)

            m.edit(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Modrator Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${m.author.username}`, m.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} Mute User`, value: `\`.mute <user>\``, inline:true},
              {name: `${UP} Unmute User`, value: `\`.unmute <user>\``, inline:true},
              {name: `${UP} Ban User`, value: `\`.ban <user>\``, inline:true},
              {name: `${UP} Delete Channels`, value: `\`.tdelete | .vdelete\``, inline:true},
              {name: `${UP} Change Server Region`, value: `\`.setregion <region>\``, inline:true},
              {name: `${UP} Clear Text Channel`, value: `\`.clear <number>\``, inline:true},
              {name: `${UP} Set Report Channel`, value: `\`.setreport <channel>\``, inline:true},
              {name: `${UP} Change Prefix`, value: `\`.prefix <symbols>\``, inline:true},
              {name: `${UP} Reset Prefix`, value: `\`.resetprefix\``, inline:true},
              {name: `${UP} Voice Logs`, value: `\`.voice\``, inline:true},
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
          }).catch (err => {
            console.log (err)
          })


          const funnyFilter = (reaction, user) => (reaction.emoji.name === '😂') && user.id === message.author.id

          const funnyCollector = m.createReactionCollector(funnyFilter, {
            max: 1,
            time: 5 * 60 * 1000
          })

          funnyCollector.on('collect', () => {

            m.reactions.removeAll(1000)

            m.edit(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Game Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${m.author.username}`, m.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} Random Cat Picture`, value: `\`.cat\``, inline:true},
              {name: `${UP} Random Persian Jokes`, value: `\`.joke\``, inline:true},
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
          }).catch (err => {
            console.log (err)
          })



          const gameFilter = (reaction, user) => (reaction.emoji.name === '🎮') && user.id === message.author.id

          const gameCollector = m.createReactionCollector(gameFilter, {
            max: 1,
            time: 5 * 60 * 1000
          })

          gameCollector.on('collect', () => {

            m.reactions.removeAll(1000)

            m.edit(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Game Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${m.author.username}`, m.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} CS:GO Stats`, value: `\`.csgo <steamID>\``, inline:true},
              {name: `${UP} Minecraft Skin`, value: `\`.mskin <player name>\``, inline:true},
              {name: `${DOWN} Fortnite Stats`, value: `\`.fortnite <name>\``, inline:true},
              {name: `${UP} Dota 2 Match stats`, value: `\`.dota <matchID>\``, inline:true},
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
          })
        }).catch (err => {
          console.log (err)
        })

        const economyFilter = (reaction, user) => (reaction.emoji.name === '💸') && user.id === message.author.id

        const economyCollector = m.createReactionCollector(economyFilter, {
          max: 1,
          time: 5 * 60 * 1000
        })

        economyCollector.on('collect', () => {

          m.reactions.removeAll(1000)

          m.edit(new Discord.MessageEmbed()
          .setTitle ('🟣 Playerly | Economy Commands')
          .setColor ('#4c4179')
          .setThumbnail (client.user.avatarURL({size: 256}))
          .setFooter (`${m.author.username}`, m.guild.iconURL({dynamic: true}))
          .addFields (
            {name: `${UP} Show's Profile`, value: `\`.profile\``, inline:true},
            {name: `${UP} Daily Income`, value: `\`.daily\``, inline:true},
            {name: `${UP} Work Income`, value: `\`.work\``, inline:true},
            {name: `${UP} Work List/Limits`, value: `\`.worklist\``, inline:true},
            {name: `${UP} Register Work`, value: `\`.register <work name>\``, inline: true}
          )
          ).then(
            m.react(TICK).then(
              m.react(BAD)
            )
          )
        }).catch (err => {
          console.log (err)
        })
      }
      break;
      case 'tc' : {
        message.channel.send(new Discord.MessageEmbed()
        .setTitle ('🟣 Playerly | Tool Commands')
        .setColor ('#4c4179')
        .setThumbnail (client.user.avatarURL({size: 256}))
        .setFooter (`${message.author.username}`, message.guild.iconURL({dynamic: true}))
        .addFields (
          {name: `${UP} Target Avatar`, value: `\`.avatar <user>\``, inline:true},
          {name: `${UP} Server Stats`, value: `\`.server\``, inline:true},
          {name: `${UP} Steam Account Details`, value: `\`.steam <player>\``, inline:true},
          {name: `${UP} Server Invites`, value: `\`.invites\``, inline:true},
          {name: `${UP} Random Logo`, value: `\`.logo <word>\``, inline:true},
          {name: `${UP} Report Someone`, value: `\`.report <user>\``, inline:true},
          {name: `${UP} Region List`, value: `\`.rlist\``,inline:true},
          {name: `${UP} Show BirthDay Details`, value: `\`.year <Year> <Month 01 - 12> <Day 01 - 31>\``, inline:true}
        )).then(m => {
          m.react (TICK).then(
            m.react (BAD)
          )
        })
      }
      break;
      case 'lc' : {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Log Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${message.author.username}`, message.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} Create Log Channel`, value: `\`.clog\``, inline:true},
              {name: `${UP} Logs Category Help`, value: `\`.hlog\``, inline:true},
              {name: `${UP} Set Logs Log Channel`, value: `\`.logs <channel>\``, inline:true},
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
      }
      break;
      case 'oc' : {
        message.channel.send(new Discord.MessageEmbed()
        .setTitle ('🟣 Playerly | OwnerShip Commands')
        .setColor ('#4c4179')
        .setThumbnail (client.user.avatarURL({size: 256}))
        .setFooter (`${message.author.username}`, message.guild.iconURL({dynamic: true}))
        .addFields (
          {name: `${UP} Join To Your Voice Channel`, value: `\`.join\``, inline:true},
        )
        ).then(
          m.react(TICK).then(
            m.react(BAD)
          )
        )
      }
      break; 
      case 'mc' : {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Modrator Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${message.author.username}`, message.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} Mute User`, value: `\`.mute <user>\``, inline:true},
              {name: `${MIDDLE} Unmute User`, value: `\`.unmute <user>\``, inline:true},
              {name: `${UP} Ban User`, value: `\`.ban <user>\``, inline:true},
              {name: `${UP} Delete Channels`, value: `\`.tdelete | .vdelete\``, inline:true},
              {name: `${UP} Change Server Region`, value: `\`.setregion <region>\``, inline:true},
              {name: `${UP} Clear Text Channel`, value: `\`.clear <number>\``, inline:true},
              {name: `${UP} Set Report Channel`, value: `\`.setreport <channel>\``, inline:true},
              {name: `${UP} Change Prefix`, value: `\`.prefix <symbols>\``, inline:true},
              {name: `${UP} Reset Prefix`, value: `\`.resetprefix\``, inline:true},
              {name: `${UP} Voice Logs`, value: `\`.voice\``, inline:true},
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
      }
      break;
      case 'gc' : {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Game Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${message.author.username}`, message.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} CS:GO Stats`, value: `\`.csgo <steamID>\``, inline:true},
              {name: `${UP} Minecraft Skin`, value: `\`.mskin <player name>\``, inline:true},
              {name: `${DOWN} Fortnite Stats`, value: `\`.fortnite <name>\``, inline:true},
              {name: `${UP} Dota 2 Match stats`, value: `\`.dota <matchID>\``, inline:true},
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
      }
      break;
      case 'fc' : {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle ('🟣 Playerly | Funny Commands')
            .setColor ('#4c4179')
            .setThumbnail (client.user.avatarURL({size: 256}))
            .setFooter (`${message.author.username}`, message.guild.iconURL({dynamic: true}))
            .addFields (
              {name: `${UP} Random Cat Picture`, value: `\`.cat\``, inline:true},
              {name: `${UP} Random Persian Jokes`, value: `\`.joke\``, inline:true},
            )
            ).then(
              m.react(TICK).then(
                m.react(BAD)
              )
            )
      }
      break;
      case 'ec' : {
        message.channel.send(new Discord.MessageEmbed()
          .setTitle ('🟣 Playerly | Economy Commands')
          .setColor ('#4c4179')
          .setThumbnail (client.user.avatarURL({size: 256}))
          .setFooter (`${message.author.username}`, message.guild.iconURL({dynamic: true}))
          .addFields (
            {name: `${UP} Show's Profile`, value: `\`.profile\``, inline:true},
            {name: `${UP} Daily Income`, value: `\`.daily\``, inline:true},
            {name: `${UP} Work Income`, value: `\`.work\``, inline:true},
            {name: `${UP} Work List/Limits`, value: `\`.worklist\``, inline:true},
            {name: `${UP} Register Work`, value: `\`.register <work name>\``, inline: true}
            )
        )
      }
    }
  }
})

client.on('guildMemberAdd', async (member) => {

  let profile = await profileModel.create({
    userId: member.id,
    serverId: member.guild.id,
    coins: 500,
    bank: 0,
    timeCreated: moment().format('LLL')
  })
  profile.save()
})


client.login(discordToken);
