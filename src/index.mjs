import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenAI } from "@google/genai";
const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

import { Client } from "discord.js";
const client = new Client();



client.login(process.env.DISCORDJS_BOT_TOKEN);

client.on("ready", () => {
    console.log(`${client.user.username} has logged in!`)
})



const PREFIX = "#";


function splitMessage(text, maxLength = 2000) {
    const chunks = [];
    let current = '';

    for (const line of text.split('\n')) {
        if ((current + '\n' + line).length > maxLength) {
            chunks.push(current);
            current = line;
        } else {
            current += '\n' + line;
        }
    }

    if (current) chunks.push(current);
    return chunks;
}

client.on("message", async (message) => {
    if (message.author.bot || !message.content.startsWith(PREFIX))
        return;
    const [cmd_type, ...args] = message.content.trim().substring(PREFIX.length).split(" ");
    if (cmd_type != "ask")
        return;
    const query = args.join(" ");
    const response = await gemini.models.generateContent({
        model: "gemini-2.0-flash",
        contents: query,
    });

    const parts = splitMessage(response.text);
    for (const part of parts) {
        await message.channel.send(part)
    }
})