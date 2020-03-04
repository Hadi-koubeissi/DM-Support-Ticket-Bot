var Discord = require('discord.js');
const tokens = require('../tokens.json');
const log = require(`../handlers/logHandler.js`);
const client = new Discord.Client();

exports.run = async (client, msg, params) => {

  if(!msg.channel.name.startsWith(`t-`)) {
    const embed = new Discord.RichEmbed()
    .setAuthor(`${tokens.generic.messages.noPermissions}`)
    .setDescription(`You can only execute this command in a ticket channel!`)
    .setColor(tokens.generic.colour.error)
    .setTimestamp()
    .setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
    msg.channel.send(embed)
    return;
  }

  let thisUser = msg.channel.name.replace('t-', '')
  let user = client.users.get(thisUser);

  user.send('Ticket has been closed by ' + msg.author.tag)
  msg.channel.delete()
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['close']
};

exports.help = {
  name: 'close',
  description: 'Replys to a ticket',
  usage: 'close'
};
