const orderUtil = require('../util/orders.js');
const permUtil = require('../util/perms.js');

exports.run = async function(message, args) {
  if(!permUtil.isStaff(staff, message.author.id)) return message.addReaction('❌');
  if(!args[0]) return message.addReaction('❌');

  var unclaim = await orderUtil.unclaim(args[0], message);
  return;
};

exports.info = {
  usage: "]>unclaim [args]",
  args: "An order ID.",
  description: "Lets a staff member unclaim an order, as to say they cannot finish it, and opting to leave it for someone else.",
  type: "staff",
  aliases: "`un`"
};
