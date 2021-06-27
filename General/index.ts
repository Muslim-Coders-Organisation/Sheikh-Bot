import * as Discord from 'discord.js'

const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {

  if (message.content === 'ping') {
  
    message.channel.send('pong');
  }
});

client.login('ODU4NjU1NDM0MDMwNDQ4NjYy.YNhTMA.4wVFUGceN8JfOpWosiW69W3Awbs');