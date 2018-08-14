var sql = require('sqlite');
var config = require('../storage/config.json');
sql.open('./storage/storage.sqlite');

module.exports = {
  async addOrder(order) {
    var id = oid + 1;
    oid += 1;

    var write = await fs.writeFileSync('./storage/progID.json', JSON.stringify({ id: oid }));
    var insert = await sql.run('INSERT INTO orders (userID, channelID, guildID, id, orderInfo, status, staffMember, declineReason) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [order.userID, order.channelID, order.guildID, id, order.orderInfo, 1, "null", "null"]);
    var alert = await client.createMessage(config.bot.deliveryCenter, {content: "<@&478775956052508684>", embed: {
      footer: {text:"New Order"},
      fields: [
        {
          name: "Order Info",
          value: `ID: ${id}\nOrder: \`${order.orderInfo}\`\nUser: \`${client.users.get(order.userID).username}#${client.users.get(order.userID).discriminator} (${order.userID})\`\nGuild: \`${client.guilds.get(order.guildID).name} (${order.guildID})\``
        }
      ],
      color: 0xE30B5D
    }});

    return id;
  },

  async decline(id, reason, staff, message) {
    try {
      sql.get(`SELECT * FROM orders WHERE id = ${id}`).then(async r => {
        if(!r) {
          var no = await message.addReaction('❌');
          var i = await message.addReaction('🆔');

          return;
        }

        if(r.status == 0 || r.status == 4) {
          var no = await message.addReaction('❌');
          return;
        }

        var staffInfo = `${client.users.get(staff).username}#${client.users.get(staff).discriminator}`;
        sql.run(`UPDATE orders SET declineReason = '${reason}', status = 0, staffMember = '${staff}' WHERE id = ${id}`);

        var tell = await client.getDMChannel(r.userID).then(channel => {
          if(!channel) return message.channel.createMessage(`<@${message.author.id}>, I couldn't message that user, though it was still declined.`);
          else return channel.createMessage(`Your order was declined by \`${staffInfo}\`\n\nReason:\n\`\`\`${reason}\`\`\``);
        });

        return message.addReaction('✅');
      });
    } catch (e) {
      return message.channel.createMessage(`\`\`\`${e}\`\`\``);
    }

    return;
  },

  async finished(id, message) {
    try {
      sql.get(`SELECT * FROM orders WHERE id = ${id}`).then(async r => {
        if(!r) {
          var no = await message.addReaction('❌');
          var id = await message.addReaction('🆔');

          return;
        }

        if(r.status !== 3) return message.addReaction('❌');

        sql.run(`UPDATE orders SET status = 4 WHERE id = ${r.id}`);

        var confirm = await message.addReaction('✅');
        return;
      });

      return;
    } catch (e) {
      throw e;
    }
  },

  async delivering(id, staff, message) {
    try {
      sql.get(`SELECT * FROM orders WHERE id = ${id}`).then(async r => {
        if(!r) {
          var no = await message.addReaction('❌');
          var i = await message.addReaction('🆔');

          return;
        }

        if(r.status !== 2) {
          var no = await message.addReaction('❌');
          return;
        }

        var staffInfo = `${client.users.get(staff).username}#${client.users.get(staff).discriminator}`;
        sql.run(`UPDATE orders SET status = 3 WHERE id = ${id}`);

        var tell = await client.getDMChannel(r.userID).then(channel => {
          channel.createMessage(`Your order should be delivered soon.`);
        });

        return message.addReaction('✅');
      });
    } catch (e) {
      throw e;
    }
  },

  async claim(id, message, staff) {
    try {
      sql.get(`SELECT * FROM orders WHERE id = ${id}`).then(async r => {
        if(!r) {
          var no = await message.addReaction('❌');
          var i = await message.addReaction('🆔');

          return;
        }

        if(r.status !== 1) {
          var no = await message.addReaction('❌');
          return;
        }

        var staffInfo = `${client.users.get(staff).username}#${client.users.get(staff).discriminator}`;
        sql.run(`UPDATE orders SET status = 2, staffMember = '${staff}' WHERE id = ${id}`);

        var tell = await client.getDMChannel(r.userID).then(channel => {
          channel.createMessage(`Your order was claimed by \`${staffInfo}\``);
        });

        return message.addReaction('✅');
      });
    } catch (e) {
      throw e;
    }
  },

  async unclaim(id, message) {
    try {
      sql.get(`SELECT * FROM orders WHERE id = ${id}`).then(async r => {
        if(!r) {
          var no = await message.addReaction('❌');
          var i = await message.addReaction('🆔');

          return;
        }

        if(r.status <= 1 || r.status === 4) {
          var no = await message.addReaction('❌');
          return;
        }

        sql.run(`UPDATE orders SET status = 1, staffMember = 'null' WHERE id = ${id}`);

        var tell = await client.getDMChannel(r.userID).then(channel => {
          channel.createMessage(`Your order was unclaimed by the previous staff member. Though, it should still be done soon.`);
        });

        return message.addReaction('✅');
      });
    } catch (e) {
      throw e;
    }
  }
};
