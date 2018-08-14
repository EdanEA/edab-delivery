const permUtil = require('../util/perms.js');

exports.run = function(message, args) {
  function getHelp(staffMember, single=false, cmd=null) {
    if(single === true) {
      var i = require(`../commands/${cmd}`).info;
      var e = { description: `\`${i.usage.split(' ')[0].replace("]>", prefixes[message.channel.guild.id])}\` Info`, fields: [ { name: "**Arguments**", value: `\`\`\`${i.args}\`\`\`` }, { name: "**Description**", value: `\`\`\`${i.description}\`\`\`` } ], color: 0xFF8C00 };

      if(i.aliases.length > 0) e.fields.push({name: "**Command Aliases**", value: i.aliases});
      return e;
    }

    var staff = "";
    var user = "";

    fs.readdirSync('./commands').forEach(f => {
      let name = f.split('.')[0];
      var i = require(`../commands/${f}`).info;

      if(i.usage.includes("help") || i.usage.includes("eval")) null;
      else if(i.type == "staff") staff += `\`${name}\` `;
      else if(i.type == "user") user += `\`${name}\` `;
    });

    if(!staff) staff = "`None`";
    if(!user) user = "`None`";

    if(staffMember == true) return [ {name: "**User Commands**", value: user}, {name: "**Staff Commands**", value: staff} ];
    else return [ { name: "**Commands**", value: user } ]
  }

  var staffCheck = permUtil.isStaff(staff, message.author.id);

  if(!args[0] && staffCheck === false) {
    return message.channel.createMessage({embed: {
      fields: getHelp(false),
      color: 0xFF8C00,
      footer: { text: `For in-depth on a command, do "${prefixes[message.channel.guild.id]}help [command name]"` }
    }});
  } else if(!args[0] && staffCheck === true) {
    return message.channel.createMessage({embed: {
      fields: getHelp(true),
      color: 0xFF8C00,
      footer: { text: `For in-depth on a command, do "${prefixes[message.channel.guild.id]}help [command name]"` }
    }});
  } else if(args[0]) {
    try {
      require(`../commands/${args[0]}`);
    } catch (e) {
      return message.channel.createMessage(`<@${message.author.id}>, I cannot find that module.`);
    }

    return message.channel.createMessage({embed: getHelp(true, true, args[0])});
  }
};

exports.info = {
  usage: "]>help [args]",
  args: "Either the name of a command, or nothing.",
  description: "Just a help command. Helps you with the bot.",
  type: "user",
  aliases: "`h`"
};
