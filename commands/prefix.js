exports.run = async function(message, args) {
  if(!args[0]) return message.channel.createMessage("No prefix given.");
  if(args[0].length > 15) return message.channel.createMessage("Prefix is too long.");

  prefixes[message.channel.guild.id] = args[0];

  var confirm = await message.addReaction("✅");
};

exports.info = {
  usage: "]>prefix [args]",
  args: "The new prefix",
  description: "Allows a moderator, in your current guild, to change the prefix of the bot to their liking. (Note: You'll still be able to use the default prefix after changing it.)",
  type: "user",
  aliases: ""
};
