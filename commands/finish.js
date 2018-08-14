const orderUtil = require('../util/orders.js');
const permUtil = require('../util/perms.js');

exports.run = async function(message, args) {
  if(!permUtil.isStaff(staff, message.author.id)) return message.addReaction('❌');
  if(!args[0]) return message.addReaction('❌');

  var finish = await orderUtil.finished(parseInt(args[0]), message);
  return;
};

exports.info = {
  usage: "]>finish [args]",
  args: "An order ID.",
  description: "Lets a staff member set an order as being finished.",
  type: "staff",
  aliases: "`f`, `fin`"
};
