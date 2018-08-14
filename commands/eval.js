exports.run = function(message, args) {
  if(message.author.id !== config.owner.id) return;

  var input = args.join(' ');
  try {
    var output = eval(input);
  } catch (err) {
    return message.channel.createMessage({embed: {
      fields: [
        {
          name: "`Input:`",
          value: `\`\`\`${input}\`\`\``,
          inline: false
        },
        {
          name: '`Error:`',
          value: `\`\`\`${err}\`\`\``,
          inline: false
        }
      ],
      color: 0xff0000
    }});
  }

  return message.channel.createMessage({embed: {
    fields: [
      {
        name: '`Input:`',
        value: `\`\`\`${input}\`\`\``,
        inline: false
      },
      {
        name: '`Output:`',
        value: `\`\`\`${output}\`\`\``,
        inline: false
      }
    ],
    color: 0xFF8C00
  }});
};

exports.info = {
  usage: "]>eval [args]",
  args: "A code sample, to evaluate.",
  description: "Lets the owner evaluate code remotely.",
  type: "staff"
};
