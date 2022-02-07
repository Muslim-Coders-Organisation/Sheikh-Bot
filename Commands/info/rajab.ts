import { Interaction, Message } from "discord.js";

export async function run(interaction?: Interaction, message?: Message) {
    let msg: string = `The month of Rajab and the innovations

The month of Rajab is among the sacred months in Islam along with Dhul - Qi3dah, Dhul - Hijjah and Al - Muharram and the reason for these being sacred is for the following:

    1.) Fighting in these months are Haram unless the enemy transgresses upon you.

2.) Sinning in these months are worse than sinning outside of these months(as in they are still sins, but sinning in these months are worse)

It has been reported by scholars such as Ibn Taymiyah, Ibn al Qayyim, and sheikh Sayyid Sabiq that there are no sahih ahadith(Authentic narrations) that tells us that fasting rajab is Mustahab(preferred), rather, there are ahadith that indicate that fasting in these months in general is good and is recommended, any hadith that talks about rajab being singled out in fasting is either fabricated or weak.

Another point to add about rajab.Fasting or singling out the 27th day or night of rajab for fasting or night prayers is an Innovation “every newly invented thing is an innovation, every innovation is misguidance, every misguidance is in the hellfire” as was reported in Sunnan An - Nisa’i(1578)

In conclusion, fasting during the sacred months is recommended, but singling out a certain month like the months of rajab has no evidence for it.`

    message?.channel.send(msg)
}