import * as Discord from 'discord.js'
import * as dotenv from 'dotenv';
//import * as embed from '../Commands/embed';
const process = dotenv.config().parsed
//console.log(process)
const getToken = function(obj:any ): string {
  const token = obj['token'];
  return token
}
const client = new Discord.Client( {fetchAllMembers: false,
  presence: {
    status: 'online',
    activity: {
      name: `to Quran`,
      type: 'LISTENING'
    } 
  }});

let prefix:String = '<' 
// later add an option to change the prefix in the server it is 

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', async message => {
  if (message.channel.type !== "dm") {
    if (message.author.bot == false) {
      if (message.content.toLowerCase() == 'as') {
        await message.channel.send('السَّلاَم عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ')
      }
      if (message.content.toLowerCase() == 'ws') {
        await message.channel.send('وعليكم السلام ، ورحمة الله وبركاته')
      }
      if (message.content.toLowerCase() == 'jzk') {
        await message.channel.send('جَزَاكَ ٱللَّٰهُ خَيْرًا‎')
      }
      if (message.content.toLowerCase() == 'ms') {
        await message.channel.send('   ما شاء الله لا قوة إلا بالله')
      }
      if (message.content.toLowerCase() == 'wi') {
        await message.channel.send('  وَأَنْتُمْ فَجَزَاكُمُ ٱللَّٰهُ خَيْرًا‎')
      }
    }
  }
});

client.login(getToken(process));