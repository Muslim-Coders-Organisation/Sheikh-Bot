import * as Discord from 'discord.js'
import * as dotenv from 'dotenv';
//import * as embed from '../Commands/embed';
const process = dotenv.config().parsed
//console.log(process)
const getToken = function(obj:any ): string {
  const token = obj['token'];
  return token
}
const client = new Discord.Client();

let prefix:String = '<' 
// later add an option to change the prefix in the server it is 

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {

  if (message.content === 'ping') {
   message.channel.send('pong')
  }
});

client.login(getToken(process));