const orderUtil = require('../util/orders.js');
const permUtil = require('../util/perms.js');

exports.run = async function(message, args) {
  if(!permUtil.isStaff(staff, message.author.id)) return message.addReaction('❌');
  if(!args[0]) return message.addReaction('❌');

  var decline = await orderUtil.decline(args[0], args.slice(1).join(' '), message.author.id, message);
  return;
};

exports.info = {
  usage: "]>decline [args]",
  args: "The order ID, followed by the reason for declining the order.",
  description: "Lets a staff member decline an order, whether it be infeasible to complete, or it not actually being an order.",
  type: "staff",
  aliases: "`dec`"
};
