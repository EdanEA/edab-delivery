const orderUtil = require('../util/orders.js');
const permUtil = require('../util/perms.js');

exports.run = async function(message, args) {
  if(!args[0]) return message.channel.createMessage(`<@${message.author.id}>, gotta leave some arguments.`);
  if(!permUtil.isStaff(staff, message.author.id)) return message.addReaction('❌');

  args = args.join(' ').toLowerCase().split(' ');

  if(args[0] == "help") {
    return message.channel.createMessage({embed: {
      title: "Order Update Info",
      description: "To update an order, you must do something like the following:\n`]>update [orderID] [status code] [decline reason]`\nThat last argument isn't needed unless you're declining an order.",
      fields: [
        {
          name: "0",
          value: "\`\`\`The update code \"0\", or \"declined\" is used to decline an order.\`\`\`",
          inline: true
        },
        {
          name: "1",
          value: "```The update code \"1\", or \"pending\", is used for setting an order as pending; this is the default status of an order. If an order is already claimed, but the person that claimed it cannot fulfill it, they set it back to pending.```",
          inline: true
        },
        {
          name: "2",
          value: "```The update code \"2\", or \"preparing\" is used for setting an order as being prepared currently. This is done by default when claiming an order.```",
          inline: true
        },
        {
          name: "3",
          value: "```The update code \"3\", or \"delivering\", is used to tell the orderer that their order is finished, and it should be delivered to their server soon.```",
          inline: true
        },
        {
          name: "4",
          value: "```The update code \"4\", or \"finished\", is used to set an order as finised -- delivered.```",
          inline: true
        }
      ],
      color: 0xFF8C00
    }});
  }

  sql.get(`SELECT * FROM orders WHERE id=${args[0]}`).then(async r => {
    if(!r) {
      var no = await message.addReaction('❌');
      var id = await message.addReaction('🆔');

      return;
    }

    switch(args[1]) {
      case '4': case 'finish':
        orderUtil.finished(r.id, message);
        break;

      case '3': case 'delivering':
        orderUtil.delivering(r.id, message.author.id, message);
        break;

      case '2': case 'preparing':
        orderUtil.claim(r.id, message, message.author.id);
        break;

      case "1": case 'pending':
        orderUtil.unclaim(r.id, message, message.author.id);
        break;

      case "0": case 'decline':
        if(!args[2]) return message.channel.createMessage(`<@${message.author.id}>, gotta leave a reason for declining an order.`);
        var dec = await orderUtil.decline(r.id, args.slice(2).join(' '), message.author.id, message);
        return message.addReaction('✅');

      default:
        return message.channel.createMessage(`<@${message.author.id}>, that's an invalid status, for more info do \`${prefixes[message.channel.guild.id]}update help\``);
    }
  });

  return;
};

exports.info = {
  usage: "]>update [args]",
  args: "An order ID, followed by a status code, then if you're declining an order, that is followed by a decline reason.",
  description: "The manual way to update orders, rather than using the commands which are built for the specific status updates.",
  type: "staff",
  aliases: "`u`, `up`"
};
