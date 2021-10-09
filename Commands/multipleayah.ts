import { command } from './int'
import * as discord from 'discord.js'
import { CreateEmbed } from './embed'
import axios from 'axios'

export const multipleayah: command = {
    title: 'Get multiple ayahs',
    description: 'getting mulltiple english ayahs',
    category: 'islamic',
    command: function command(message: any) {
        let content: string[] = []
        const ayah = message.content.split(' ')[1].split(':')[0]
        let maxnum: number = Number(message.content.split('-')[1])
        let minimum: number = Number(message.content.split('-')[0][message.content.split('-')[0].length - 1])
        if (minimum > maxnum || minimum == maxnum) {
            message.reply({
                embed: CreateEmbed('fail', 'Error', '', 'Use the format surah:starting ayah - final ayah where all are numbers big brain', [], 'hmm', ''
                )
            })
        }
        else {
            for (let i = minimum; i <= maxnum; i += 1) {
                axios({
                    method: 'get',
                    url: `http://api.alquran.cloud/v1/ayah/${ayah + ':' + i}/en.hilali`,
                })
                    .then(async function (response: any) {
                        const resp = await response.data
                        if (resp.code == 200) {
                            await resp
                            await content.push(resp.data.text)
                            console.log(content)
                            if (i == maxnum) {
                                con(content)
                            }

                        }

                    })
                    .catch(async (err: any) => {
                        const resp = await err?.response.data
                        if (resp.status) {
                            message.channel.send({ embed: CreateEmbed('fail', resp.status, '', resp.data, [], 'Try again', '') })
                        }
                    })
            }

        }
    }
}

function con(arr: any) {
    console.log(arr)

}