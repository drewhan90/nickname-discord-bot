require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`)
})

client.login(process.env.TOKEN)