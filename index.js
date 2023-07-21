'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const Discord = require('discord.js');
require('dotenv').config()

const app = express();
const PORT = 3000;

const botToken = process.env.TOKEN;
const channelId = '1131043906612625441';

const client = new Discord.Client({
  intents: [
    Discord.IntentsBitField.Flags.Guilds,

  ]
});

client.on('ready', () => {
  console.log('Bot is online, playa!');
});

app.use(bodyParser.json());

app.post('/send-to-discord', (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Content is required.' });
  }

  const channel = client.channels.cache.get(channelId);
  if (!channel) {
    return res.status(404).json({ error: 'Channel not found.' });
  }

  channel.send(content);
  res.status(200).json({ message: 'Message sent to Discord successfully.' });
});

app.listen(PORT, () => {
  console.log(`API server is running on PORT: ${PORT}, playa`);
});

client.login(botToken);

