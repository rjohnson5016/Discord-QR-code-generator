const { Client, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
const QRCode = require('qrcode');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready');
});

client.on('interactionCreate', (interaction) => {
	const embed = new MessageEmbed().setTitle('Hi, I dog!');
	qrcode = QRCode.toDataURL('www.google.com', function (error, code) {
		if (error) {
			console.log(error);
		}
		return code;
	});

	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'generate-qr-code') {
		interaction.channel.send({
			embeds: [embed],
			files: ['./dog_pic.jpeg'],
		});
	}
});

client.login(token);
