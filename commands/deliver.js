const orderUtil = require('../util/orders.js');
const permUtil = require('../util/perms.js');

exports.run = async function(message, args) {
  if(!permUtil.isStaff(staff, message.author.id)) return message.addReaction('❌');
  if(!args[0]) return message.addReaction('❌');

  try {
    sql.get(`SELECT * FROM orders WHERE id=${args[0]}`).then(async r => {
      if(!r) {
        var no = await message.addReaction('❌');
        var i = await message.addReaction('🆔');

        return;
      }

      if(r.status !== 2) return message.addReaction('❌');

      client.guilds.get(r.guildID).channels.get(r.channelID).createInvite().then(i => {
        return message.channel.createMessage(`https://discord.gg/${i.code}`);
      });

      var deliver = await orderUtil.delivering(args[0], message.author.id, message);
      return;
    });
  } catch (e) {
    throw e;
  }

  return;
};

exports.info = {
  usage: "]>deliver [args]",
  args: "An order ID.",
  description: "Lets a staff member tell a user that their order will be delivered soon, and gives the staff member an invite to the guild.",
  type: "staff",
  aliases: "`del`"
};
