import * as inter from './int'
import * as discord from 'discord.js'
import { CreateEmbed } from './embed'
import axios from 'axios'
export const ayah: inter.command = {
    title: 'Getting Ayah',
    description: 'fetting a particular ayah from the Quran Surah Number:Ayah Number',
    category: "islamic",
    command: function getingAyah(message: any) {
        if (message.content.split(' ').length > 1) {

            const ayah = message.content.split(' ')[1]
            axios({
                method: 'get',
                url: `http://api.alquran.cloud/v1/ayah/${ayah}/en.hilali`,
            })
                .then(async function (response: any) {
                    const resp = await response.data
                    if (resp.code == 200) {
                        await resp
                        message.channel.send({
                            embed: CreateEmbed('#ffffff',
                                resp.data.surah?.englishName,
                                '',
                                resp.data.text,
                                [],
                                resp.data.page, '')
                        })

                    }

                })
                .catch(async (err: any) => {
                    const resp = await err.response.data
                    message.channel.send({ embed: CreateEmbed('####', resp.status, '', resp.data, [], 'Try again', '') })
                })

        }
    }
}