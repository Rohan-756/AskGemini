import dotenv from 'dotenv';
dotenv.config();

import { Client } from "discord.js";
const client=new Client();

client.login(process.env.DISCORDJS_BOT_TOKEN);

client.on("ready",()=>{
    console.log(`${client.user.username} has logged in!`);
})



client.on("message",async(message)=>{
  if(message.author.bot)
    return;
  message.reply("Hello!");
})