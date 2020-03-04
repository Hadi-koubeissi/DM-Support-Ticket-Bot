const Discord = require(`discord.js`);
const tokens = require('../tokens.json');
const log = require(`../handlers/logHandler.js`);
const client = new Discord.Client();

module.exports = (client, msg) => {
  if (msg.author.bot) return;

  let guild = client.guilds.get(tokens.guild);

  if (msg.guild === null) {
    if (guild.channels.exists('name', `t-${msg.author.id}`)) {
      let c = guild.channels.find(channel => channel.name === `t-${msg.author.id}`);
      msg.react('✅')
      c.send("Message from **" + msg.author + "(" + msg.author.id + ")**\n\n```yaml\n" + msg.content + "\n```")
    } else {
      guild.createChannel(`t-${msg.author.id}`, 'text').then(async c => {
        c.setParent(tokens.ticket_category)

        let everyone = guild.id;
        let user = msg.author.id;

        c.overwritePermissions(everyone, {
          READ_MESSAGES: false,
          SEND_MESSAGES: false
        })

        c.overwritePermissions(user, {
          READ_MESSAGES: true,
          SEND_MESSAGES: true
        })
        msg.react('✅')
        c.send("Message from **" + msg.author + "(" + msg.author.id + ")**\n\n```yaml\n" + msg.content + "\n```")
      })
    }
  }

  if (!msg.content.startsWith(tokens.prefix)) return;
  let command = msg.content.toLowerCase().split(' ')[0].slice(tokens.prefix.length);
  let params = msg.content.split(' ').slice(1);
  let cmd;
  client.cmd = cmd;

  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
      cmd.run(client, msg, params);
    }
  }
