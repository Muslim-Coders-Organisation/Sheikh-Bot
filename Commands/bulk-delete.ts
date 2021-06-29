import * as discord from 'discord.js'
import * as embed from './embed'

export function BulkDelete(message: any) {
  if (message.member.hasPermission('ADMINISTRATOR')) {

    message.channel.clone().then((x: any) => {  }).catch(console.error)
    message.channel.delete().then((x: any) => {  }).catch(console.error);       
     }
          else {
            
         message.channel.send("You aren't based enough to use the command :)")
  
          }
   
}