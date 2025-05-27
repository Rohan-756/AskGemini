import dotenv from 'dotenv';
dotenv.config();

import { Client } from "discord.js";
const client=new Client();

client.login(process.env.DISCORDJS_BOT_TOKEN);

client.on("ready",()=>{
    console.log(`${client.user.username} has logged in!`);
})

const PREFIX="#";

client.on("message",async(message)=>{
    if(message.author.bot || !message.content.startsWith(PREFIX))
        return;
    const [cmd_type, ...args]=message.content.trim().substring(PREFIX.length).split(" ");
    if(cmd_type!="ask")
        return;
    const query=args.join(" ");
    console.log(cmd_type+" "+query);
    message.reply(cmd_type+query);
})