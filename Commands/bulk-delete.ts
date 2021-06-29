import * as discord from 'discord.js'
import * as embed from './embed'

export function BulkDelete(message:object)  {
    if (message['member'].hasPermissions('ADMINSTRATOR')) {
        message['channel'].send('working')
    }
}