var Discord = require('discord.js');
const tokens = require('../tokens.json');
const log = require(`../handlers/logHandler.js`);
const client = new Discord.Client();

exports.run = async (client, msg, params) => {
	const args = msg.content.slice(tokens.prefix.length+exports.help.name).trim().split(/ +/g);

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

	if (!args[1]) {
		const embed = new Discord.RichEmbed()
		.setAuthor(tokens.generic.messages.error)
		.setDescription('Enter a message to reply with')
		.setColor(tokens.generic.colour.error)
		.setTimestamp()
		.setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
		msg.channel.send(embed).catch((error) => {log.error(error)});
		return;
	}

  let thisUser = msg.channel.name.replace('t-', '')
  let user = client.users.get(thisUser);

  var reply = args.splice(1).join(" ");
  user.send(reply)
  msg.react('🔥')
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['reply']
};

exports.help = {
  name: 'reply',
  description: 'Replys to a ticket',
  usage: 'reply'
};
