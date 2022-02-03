import { Interaction, Message } from "discord.js";

export async function run(interaction?: Interaction, message?: Message) {

    let msg: string = `** Islam -**

The ** essence ** of ** Islam ** had been ** clearly defined ** in the ** answer ** given by the ** Messenger of Allah(peace be upon him) when Jibril(Gabriel, peace be upon him) asked him about Islam.**

> ** The Messenger of Allah said: Al - Islam implies that you testify that there is none worthy of worship(in truth) but Allah and that Muhammad is the Messenger of Allah, and you establish Salah(Prayer), pay Zakah(obligatory charity), observe Sawm(Fast) in Ramadan, and perform Hajj(Pilgrimage) to Al - Bayt(the House; a name of the Ka\`bah) if you are solvent enough (to bear the expense of) the journey. **

> Islam also means **to believe in Allah, His angels, Books, Messengers, the Last Day and Predestination whether good or bad**.

> It also includes **Ihsan (the perfection of Faith)** which means to worship Allah as if you are **seeing Him**; and **although you do not see Him, He sees you**. 

> The term Islam in general **implies believing in all these matters of faith**. 

This is based on the **Ayah (Qur'anic verse)** in which **Allah (Exalted be He) says**:

>  **Truly, the religion with Allâh is Islâm. The above is also based on the Hadith in which the Prophet (peace be upon him) gave answers to Jibril when he asked him about Islam, Iman (faith) and Ihsan. In this Hadith the Prophet (peace be upon him) told his Sahabah (Companions) that Jibril asked him these questions with the purpose of teaching them their religion. Thus it becomes clear that true Islam basically means to submit oneself to the orders of Allah both in secret and in public and at the same time to avoid what He has prohibited.**

*May Allah grant us success. May peace and blessings be upon our Prophet Muhammad, his family, and Companions.*

https://www.alifta.gov.sa/En/IftaContents/PermanentCommitee/Pages/FatawaSubjects.aspx?cultStr=en&View=Page&HajjEntryID=0&HajjEntryName=&RamadanEntryID=0&RamadanEntryName=&NodeID=4134&PageID=20&SectionID=7&SubjectPageTitlesID=20&MarkIndex=1&0 `

    message?.channel.send(msg)

}