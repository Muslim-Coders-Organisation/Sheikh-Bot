"use strict";
exports.__esModule = true;
exports.CreateEmbed = void 0;
var Discord = require("discord.js");
function CreateEmbed(c, title, author, desc, fields, footer, thumbnail) {
    var color = c == 'success' ? '#90ee90' : c == 'fail' ? '#ff0000' : ' #337fd5';
    var embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setAuthor(author)
        .setDescription(desc)
        .addFields();
    thumbnail != undefined ? embed.setThumbnail(thumbnail) : '';
    // Fields should be added in the form of a list [[title,value,inline]]
    if (fields.length > 0) {
        for (var i = 0; i < fields.length; i++) {
            embed.addField(fields[i][0], fields[i][1], fields[i][2] == true ? true : false);
        }
    }
    embed.setTimestamp()
        .setFooter(footer);
    return embed;
}
exports.CreateEmbed = CreateEmbed;
