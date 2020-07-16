require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`)
})

const getMessages = async (channel) => {
  const messagesArray = []
  let lastId = null
  let isLoop = true
  while (isLoop) {
    await channel.messages.fetch({ limit: 100, before: lastId }).then(async msg => {
      try {
        for (const msgItem of msg.array()) {
          messagesArray.push(msgItem.content)
        }
        lastId = msg.last().id
        console.log({ msgSize: msg.size })
        if (msg.size != 100) {
          isLoop = false
        }
      }
      catch (error) {
        console.log('error ---', error)
      }
    })
  }
  console.log({
    messagesArray,
    lastId,
    length: messagesArray.length
  })
  return messagesArray
}

client.on('message', message => {
  if (message.content === '/message') {
    getMessages(message.channel)
  }
})

client.login(process.env.TOKEN)