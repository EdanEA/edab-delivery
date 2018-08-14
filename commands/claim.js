const orderUtil = require('../util/orders.js');
const permUtil = require('../util/perms.js');

exports.run = async function(message, args) {
  if(!permUtil.isStaff(staff, message.author.id)) return message.addReaction('❌');
  if(!args[0]) return message.addReaction('❌');

  var claim = await orderUtil.claim(args[0], message, message.author.id);
  return;
};

exports.info = {
  usage: "]>claim [args]",
  args: "An order id",
  description: "Lets a staff member claim an order, as theirs to make.",
  type: "staff",
  aliases: "`c`"
};
