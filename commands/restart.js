var conf = require('../storage/config.json');

exports.run = async function(message, args) {
  if(message.author.id !== conf.owner.id) return message.channel.createMessage({content: `if you wanna use this command, I'm gonna need that succy fuccy, <@${message.author.id}>`, tts: true});

  async function writeAsync(path, content) {
    var write = await fs.writeFile(path, content, 'utf8', (err, result) => {
      if(err) throw err;
      else console.log(`Successfully logged ${Object.keys(content).length} items in ${path} before exit.`);
    });
  }

  var writePrefixes = await writeAsync('./storage/prefixes.json', JSON.stringify(prefixes));
  var writeProgID = await writeAsync('./storage/progID.json', JSON.stringify({ id: oid }));

  message.channel.createMessage("okay, okay, okay, okay").then(() => {
    process.exit(0);
  });
};

exports.info = {
  usage: "]>restart",
  args: "None.",
  description: "Lets the owner restart the bot.",
  type: "staff"
};
