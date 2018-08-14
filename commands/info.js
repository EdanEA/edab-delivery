const util = require('../util/perms.js');

exports.run = function(message, args) {
  if(!args[0]) return message.channel.createMessage(`<@${message.author.id}>, you've gotta give me the ID of the order.`);

  function getInfo(row, staffMember) {
    var status;

    switch(parseInt(row.status)) {
      case 0:
        status = '\`declined\`';
      break;

      case 1:
        status = '\`pending\`';
      break;

      case 2:
        status = '\`preparing\`';
      break;

      case 3:
        status = '\`delivering\`';
      break;

      case 4:
        status = '\`delivered\`';
      break;

      default:
        status = "Error: Unknown Status Code"
    }

    try {
      if(row.status == 0) {
        return {
          fields: [
            { name: "**Order Info**", value: `ID: \`${row.id}\`\nOrder: \`${row.orderInfo}\`\nOrderer: \`${client.users.get(row.userID).username}#${client.users.get(row.userID).discriminator}\`` },
            { name: "**Order Status**", value: `Current Status: ${status}\nDecline Reason: \`${row.declineReason}\`\nDeclined By: \`${client.users.get(row.staffMember).username}#${client.users.get(row.staffMember).discriminator}\`` }
          ],
          color: 0xff0000
        }
      } else {
        return {
          fields: [
            { name: "**Order Info**", value: `ID: \`${row.id}\`\nOrder: \`${row.orderInfo}\`\n  Orderer: \`${client.users.get(row.userID).username}#${client.users.get(row.userID).discriminator}\`` },
            { name: "**Order Status**", value: `Current Status: ${status}\nCurrent Handler: \`${staffMember}\`` }
          ],
          color: 0xFF8C00
        }
      }
    } catch (e) {
      throw e;
    }
  }


  var checkStaff = util.isStaff(staff, message.author.id);

  sql.get(`SELECT * FROM orders WHERE id=${args[0]}`).then(async r => {
    if(!r) {
      var no = await message.addReaction('❌');
      var id = await message.addReaction('🆔');

      return;
    }

    if(r.userID !== message.author.id && checkStaff !== true) return message.addReaction('❌');

    var embed;

    if(client.users.get(r.staffMember)) var embed = getInfo(r, `${client.users.get(r.staffMember).username}#${client.users.get(r.staffMember).discriminator}`);
    else var embed = getInfo(r, "Unclaimed");

    return message.channel.createMessage({embed: embed});
  });
};

exports.info = {
  usage: "]>info [args]",
  args: "An order ID",
  description: "Gives info on a specific order -- your own, or if you're a staff, anyone's.",
  type: "user",
  aliases: "`i`, `in`"
};
