import { ColorResolvable } from "discord.js";

export function getRandomColorHex(): ColorResolvable {
    return `#${(Math.floor(Math.random() * 16777215)).toString(16).padStart(6, '0')}`
}