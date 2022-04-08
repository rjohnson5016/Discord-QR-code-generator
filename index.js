const { Client, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
const QRCode = require('qrcode');
const fs = require('fs-extra');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const qrcode = new QRCode.toDataURL('www.google.com', function (error, code) {
	if (error) {
		console.log(error);
	}
	const matches = code.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
	const qrcodeImage = {};

	qrcodeImage.type = matches[1];
	qrcodeImage.data = Buffer.from(matches[2], 'base64');
	fs.writeFileSync('qrcode.png', qrcodeImage.data);
});

if (qrcode);
client.once('ready', () => {
	console.log('Ready');
});

client.on('interactionCreate', (interaction) => {
	const embed = new MessageEmbed().setTitle('Hi, I dog!');

	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'generate-qr-code') {
		interaction.channel.send({
			embeds: [embed],
			files: ['qrcode.png'],
		});
	}
});

client.login(token);
