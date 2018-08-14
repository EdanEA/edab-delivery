exports.run = function(message, args) {
  return message.channel.createMessage({embed: {
    color: 0x00FFC1,
    fields: [
      { name: "Bot Invite", value: "[`discordapp.com/oauth2/authorize` link](https://discordapp.com/oauth2/authorize?client_id=412401784586371102&scope=bot&permissions=330817)" },
      { name: "Support Server", value: "[`discord.me` link](https://discord.me/xdd)" }
    ]
  }});
};

exports.info = {
  usage: "invite%",
  args: "None.",
  description: "Gives you the invites for the bot, and the support server invite."
};
