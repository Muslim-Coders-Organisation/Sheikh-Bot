import * as inter from './int'
import * as discord from 'discord.js'
import { CreateEmbed } from './embed'
import * as axios from 'axios'
import { multipleayah } from './multipleayah'
export const ayah: inter.command = {
    title: 'Getting Ayah',
    description: 'fetting a particular ayah from the Quran Surah Number:Ayah Number',
    category: "islamic",
    command: function getingAyah(message: any) {
        if (message.content.split(' ').length > 1) {

            const ayah = message.content.split(' ')[1]
<<<<<<< HEAD
            const ayatCheck = /[123456789:]/;

            if (!ayah.match(ayatCheck)) {
                message.channel.send({
                    embed: CreateEmbed('#ff0000', 'Error', '', 'Use the format surah:ayah number where both are numbers big brain', [], 'hmm', '')
                })
            } else {
=======
            const ayatCheck = /[1234567890:]/;
            const multipleayatcheck = /[1234567890:-]/
            if (!ayah.match(ayatCheck)) {
                message.channel.send({
                    embed: CreateEmbed('fail', 'Error', '', 'Use the format surah:ayah number where both are numbers big brain', [], 'hmm', '')
                })
            }
            else if (ayah.match(multipleayatcheck)) {
                multipleayah.command(message)
            }
            else {
>>>>>>> 3867fab7a91b26b65b2bcbac30980afea7e60e99
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
<<<<<<< HEAD
                                embed: CreateEmbed('#90ee90',
=======
                                embed: CreateEmbed('success',
>>>>>>> 3867fab7a91b26b65b2bcbac30980afea7e60e99
                                    resp.data.surah?.englishName,
                                    '',
                                    resp.data.text,
                                    [],
<<<<<<< HEAD
                                    resp.data.page, '')
=======
                                    'page-number: ' + resp.data.page, '')
>>>>>>> 3867fab7a91b26b65b2bcbac30980afea7e60e99
                            })

                        }

                    })
                    .catch(async (err: any) => {
<<<<<<< HEAD
                        const resp = await err.response.data
                        message.channel.send({ embed: CreateEmbed('#ff0000', resp.status, '', resp.data, [], 'Try again', '') })
=======
                        const resp = await err?.response.data
                        if (resp.status) {
                            message.channel.send({ embed: CreateEmbed('fail', resp.status, '', resp.data, [], 'Try again', '') })
                        }
>>>>>>> 3867fab7a91b26b65b2bcbac30980afea7e60e99
                    })

            }
        }
    }
}