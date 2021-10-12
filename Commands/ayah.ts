import * as inter from './int'
import * as discord from 'discord.js'
import { CreateEmbed } from './embed'
import axios from 'axios'
import { multipleayah } from './multipleayah'
export const ayah: inter.command = {
    title: 'Getting Ayah',
    description: 'fetting a particular ayah from the Quran Surah Number:Ayah Number',
    category: "islamic",
    command: function getingAyah(message: any) {
        if (message.content.split(' ').length > 1) {

            const ayah = message.content.split(' ')[1]
            const ayatCheck = /[1234567890:]/;
            const multipleayatcheck = /[1234567890:-]/
            if (!ayah.match(ayatCheck)) {
                message.channel.send({
                    embeds: CreateEmbed('fail', 'Error', '', 'Use the format surah:ayah number where both are numbers big brain', [], 'hmm', '')
                })
            }
            else if (ayah.match(multipleayatcheck)) {
                multipleayah.command(message)
            }
            else {
                // send

                axios({
                    method: 'get',
                    url: `http://api.alquran.cloud/v1/ayah/${ayah}/en.hilali`,
                })
                    .then(async function (response: any) {
                        const resp = await response.data
                        if (resp.code == 200) {
                            await resp
                            message.channel.send({
                                embed: CreateEmbed('success',
                                    resp.data.surah?.englishName,
                                    '',
                                    resp.data.text,
                                    [],
                                    'page-number: ' + resp.data.page, '')
                            })

                        }

                    })
                    .catch(async (err: any) => {

                        const resp: any = await err?.response.data
                        if (resp.status) {
                            message.channel.send({ embeds: CreateEmbed('fail', resp.status, '', resp.data, [], 'Try again', '') })
                        }
                    })

            }
        }
    }
}