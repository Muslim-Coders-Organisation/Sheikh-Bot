import * as discord from 'discord.js'
import { command } from './int'

export const VerifyCreate: command = {
    title: 'Verification System - 1',
    description: 'Only for the bot',
    category: "moderation-general",
    command: async function command(message: any) {
        let exists: boolean = false,
            id: number = 0,
            parent: any
        message.guild.channels.cache.forEach((channel: any) => {
            if (channel.type == 'category') {
                if (channel.name == 'BVerification') {
                    exists = true
                    parent = channel.id
                }
            }
        });

        if (exists) {
            message.channel.send('It exists')
        }
        else {
            parent = await message.guild.channels.create('BVerification', {
                type: 'category', permissionOverwrites: [{
                    id: '841728006224347167',
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: '842083990420193361',
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'USE_EXTERNAL_EMOJIS']
                },
                {
                    id: "842083989577400411",
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'USE_EXTERNAL_EMOJIS']
                }]
            })

        }
        let ch = await message.guild.channels.create(`ticket-${message.author.tag}`, {
            type: 'text', parent: parent, permissionOverwrites: [{
                id: '841728006224347167',
                deny: ['VIEW_CHANNEL']
            },
            {
                id: message.author.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'USE_EXTERNAL_EMOJIS']

            },

            {
                id: '842083990420193361',
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'USE_EXTERNAL_EMOJIS']
            },
            {
                id: "842083989577400411",
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'USE_EXTERNAL_EMOJIS']
            }
            ]
        }).then((c: any) => {
            id = c.id
        })
            .catch(console.error)


    }
}