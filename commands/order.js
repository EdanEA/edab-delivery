const util = require('../util/orders.js');

exports.run = async function(message, args) {
  if(!args[0]) return message.addReaction('❌');
  var args = args.join(' ');

  let order = {
    orderInfo: args,
    userID: message.author.id,
    channelID: message.channel.id,
    guildID: message.channel.guild.id
  };

  var id = await util.addOrder(order);

  return message.channel.createMessage(`Successfully placed your order of \`${args}\`. Order ID: \`${id}\`\nIf you want to check on your order, do \`${prefixes[message.channel.guild.id]}info ${id}\``);
};

exports.info = {
  usage: ']>order [args]',
  args: "What you want to order",
  description: "The command that lets you order shit.",
  type: "user",
  aliases: "`o`"
}
