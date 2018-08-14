const Eris = require('eris');

global.config = require('./storage/config.json');
global.prefixes = require('./storage/prefixes.json');

global.snek = require('snekfetch');
global.c = require('chalk');
global.fs = require('fs');
global.sql = require('sqlite');

global.client = new Eris.Client(config.bot.token);
global.staff = {};

var progID = require('./storage/progID.json');
global.oid = progID.id;

sql.open('./storage/storage.sqlite');

process.on('unhandledRejection', async (reason, p) => {
  console.log(c.bold.red(`Unhandled rejection at: ${p} reason: ${reason}`));
});

process.on('uncaughtException', err => {
  console.log(c.bold.red(err.stack));
});

client.on('ready', () => {
  if(client.user.id == config.bot.id && client.guilds.get(config.bot.officialserver)) {
    client.guilds.get(config.bot.officialserver).members.forEach(m => {
      if(m.id == config.owner.id) null;
      else if(m.roles.includes('38031167692185610') || m.roles.includes('407694807591550977') || m.roles.includes('458083280743301121')) admins[m.username.toLowerCase()] = m.id;
    });
  }

  sql.run('CREATE TABLE IF NOT EXISTS orders (userID TEXT, channelID TEXT, guildID TEXT, id INTEGER, orderInfo TEXT, status INTEGER, staffMember TEXT, declineReason TEXT)');
  console.log(c.hex('#FF8C00')("Aw yeah, baby. Back in business!"));

  client.editStatus("dnd", { name: `in ${client.guilds.size} servers | Use ]>help` });
  
  client.guilds.forEach(g => {
    if(!prefixes[g.id]) prefixes[g.id] = ']>';
  });
});

client.on('warn', e => {
  console.log(c.gray(e.stack));
});

client.on('error', e => {
  if(e.message.includes("Cannot read property \'id\'")) return;
  console.log(c.gray(e.stack));
});

client.on('guildCreate', (g) => {
  console.log(c.magenta(`I've joined: ${g.name}. Servers: ${client.guilds.size}`));
  client.createMessage(conf.bot.logs, `I've joined \`${g.name}\`. Server amount: \`${client.guilds.size}\`.`);

  if(!prefixes[g.id]) prefixes[g.id] = ']>';
});

client.on('guildDelete', (g) => {
  console.log(c.hex('#E30B5D')(`I've left: ${g.name}`));
  client.createMessage(conf.bot.logs, `I've left: \`${g.name}\`. Server amount: \`${client.guilds.size}\`.`);
});

client.on('messageCreate', message => {
  var prefix;
  if(!message.content.startsWith(prefixes[message.channel.guild.id]) && !message.content.startsWith(config.bot.prefix) && !message.content.startsWith(`<@${client.user.id}> `)) return;
  if(message.author === client.user) return;
  if(!message.channel.guild) return;
  if(message.author.bot) return;

  var args = message.content.split(' ').slice(1);

  if(message.content.startsWith(prefixes[message.channel.guild.id])) var prefix = prefixes[message.channel.guild.id];
  else if(message.content.startsWith(config.bot.prefix)) var prefix = ']>';
  else {
    var prefix = `<@${client.user.id}> `;
    args = message.content.split(' ').slice(2);
  }

  var cmd = message.content.slice(prefix.length).split(' ')[0];

  switch(cmd) {
    case "o":
      cmd = 'order';
      break;
    case "c":
      cmd = 'claim';
      break;
    case "dec":
      cmd = 'decline';
      break;
    case "del":
      cmd = 'deliver';
      break;
    case "f": case "fin":
      cmd = 'finish';
      break;
    case "h":
      cmd = 'help';
      break;
    case "i": case "in":
      cmd = 'info';
      break;
    case "l":
      cmd = "list";
      break;
    case "un":
      cmd = "unclaim";
      break;
    case "u": case "up":
      cmd = 'update';
      break;
    default:
      null;
  }

  try {
    require(`./commands/${cmd}`).run(message, args);
  } catch (e) {
    // if(e.message.includes('Cannot find module') || e.message.includes('ENOENT')) return;
    console.log(c.gray(e.stack));

    if(e.length > 2000) return;
    message.channel.createMessage(`\`\`\`${e}\`\`\``);
  }
});

client.connect();

// rawr xd
