import { Interaction, Message } from "discord.js";

export async function run(interaction?: Interaction, message?: Message) {
    let msg: string = `**Salafi-**

> **Al-Salafiyah (Salafism)** is a term derived from the word **“Salaf”**, which refers to the righteous predecessors of the **first three generations of Muslims** which include the Sahabah (Companions of the Prophet), Tabi‘un (Followers, the generation after the Companions of the Prophet) and Tabi‘ Al-Tabi‘un (Successors, the generation after the Tabi‘un). 

**The Messenger of Allah attested to their righteousness when he said:  “The best of people are my generation (or my century), then those who come after them, then those who come after them. Then there will come a people whose testimony will precede their oath and their oath will precede their testimony.” Narrated by Al-Bukhari, Muslim and Imam Ahmad in his Musnad.**

> The word **“Salafiyun” (Salafis)** is the plural of **“Salafi”**, derived from **“Salaf”** that has the above-mentioned meaning. It refers to those following the way of the Salaf (righteous predecessors) of the **early Muslim generation** in their adherence to the **Qur‘an** and the **Sunnah** and calling people to believe and act upon them, and thereby became known as **“Ahl-ul-Sunnah wal-Jama\`ah.”**

** May Allah grant us success.May peace and blessings be upon our Prophet Muhammad, his family, and Companions.**`
    message?.channel.send(msg)
}