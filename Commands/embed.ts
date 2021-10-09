import * as Discord from 'discord.js'

export function CreateEmbed(c:'success'|'fail'|'others',title:string,author:string,desc:string,fields:[string, string, boolean][],footer:string,thumbnail:string|undefined):object{
    let color = c=='success'? '#90ee90' : c == 'fail' ?'#ff0000' : ' #337fd5' 

    let embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setAuthor(author)
        .setDescription(desc)
        .addFields( 
        )
        thumbnail != undefined? embed.setThumbnail(thumbnail) : ''

// Fields should be added in the form of a list [[title,value,inline]]

        if(fields.length>0){
            for(let i = 0; i<fields.length;i++){
            
                embed.addField(fields[i][0],fields[i][1],fields[i][2]==true?true:false)
            }
        }
        embed.setTimestamp()
        .setFooter(footer);

    return embed
}
