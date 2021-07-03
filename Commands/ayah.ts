import * as inter from './int'
import * as discord from 'discord.js'
// LOOKING FOR A PROPER API
export const ayah: inter.command = {
    title: 'Getting Ayah',
    description: 'fetting a particular ayah from the Quran Surah Number:Ayah Number',
    category: "islamic",
    command: function getingAyah(message: any) {
        if (message.content.split(' ') > 1) {
            const ayah = message.content.split(' ')[1]
            console.log(ayah)
        }
    }
}

