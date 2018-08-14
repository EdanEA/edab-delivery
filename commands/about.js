exports.run = function(message, args) {
  return message.channel.createMessage({embed: {
    color: 0xff0000,
    fields: [
      { name: "What is this bot?", value: "Do you remember about two years ago, maybe a year and a half ago, when suddenly there were these cool delivery bots? Those were pretty nice -- real simple. This bot was originally made when those were still pretty popular, around early 2017. This is the recreation of it, just infinitely better, as with the original I had no idea what the hell I was doing with every Discord library I used. The main idea of this bot, is to sort-of be like a GrubHub, or Uber Eats -- a delivery service of almost anything you want." },
      { name: "Who made this?", value: "Some boy named Edan, nothing too much to say about him." },
      { name: "Any way I can help out?", value: "Yeah, sure. You could contribute to the [GitHub](https://github.com/EdanEA/edab-delivery), you could also join the [official Discord server](https://discord.me/xdd) and become a deliverer or give some ideas. Or you could help by donating on [PayPal](https://paypal.me/edanea)." },
      { name: "Upcoming Features", value: " • \`User owned stores, that will have their specific items, which will be delivered by people in the main server.\`\n • \`A command to apply to become a deliverer.\`" }
    ]
  }});
};

exports.info = {
  usage: "]>about",
  args: "None.",
  description: "Tells you about the bot, and its developer. It's kinda like a FAQ, with some other info on the bot and its development, I guess.",
  type: "user"
};
