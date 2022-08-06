const { Client, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
const QRCode = require('qrcode');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready');
});

const generateQRCode = (phrase) => {
	const filepath = '/tmp/generated_qr_code.png';
	QRCode.toFile(filepath, phrase, (error) => {
		if (error) {
			console.log(error);
		}
	});
	return filepath;
};

client.on('interactionCreate', (interaction) => {
	const embed = new MessageEmbed().setTitle('QRCode for Google');
	const qrcode = generateQRCode('www.google.com/news');

	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'generate-qr-code') {
		interaction.channel.send({
			embeds: [embed],
			files: [qrcode],
		});
	}
});

client.login(token);
