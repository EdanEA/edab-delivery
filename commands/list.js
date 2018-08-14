const util = require('../util/perms.js');

exports.run = function(message, args) {
  if(!util.isStaff(staff, message.author.id));

  sql.all('SELECT id, orderInfo FROM orders WHERE status=1 ORDER BY id ASC LIMIT 25').then(rows => {
    if(!rows[0]) {
      return message.channel.createMessage(`<@${message.author.id}>, I can't seem to find any pending orders.`);
    }

    var fields = [];
    rows.forEach(r => {
      fields.push({ name: `ID: \`${r.id}\``, value: `\`${r.orderInfo}\`` });
    });

    return message.channel.createMessage({embed: {
      fields: fields,
      color: 0xFF8C00
    }});
  });

};

exports.info = {
  usage: "]>list",
  args: "None.",
  description: "Lists the orders which have yet to be finished. This list is ordered by the oldest order, to the newest.",
  type: "staff",
  aliases: "`l`"
};
