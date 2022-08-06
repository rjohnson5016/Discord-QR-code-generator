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

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	await interaction.deferReply();
	const { commandName } = interaction;
	const input = interaction.options.getString('input');
	const qrcodePath = await generateQRCode(input);
	const embed = new MessageEmbed().setTitle(`QRCode for ${input}`);

	if (commandName === 'generate-qr-code') {
		await interaction.channel.send({
			embeds: [embed],
			files: [qrcodePath],
		});
	}
});

client.login(token);
