const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder()
		.setName('generate-qr-code')
		.setDescription('This command will generate a QR code for the argument provided.')
		.addStringOption((option) =>
			option.setName('input').setDescription('This argument takes a string and returns a QR code.').setRequired(true)
		),
].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

/**
 * The clientId is stored in the OAuth section of your application https://discord.com/developers/applications/954212844155588609/oauth2/general The guild id is the ID of the server. You must enable dev mode in your profile and then you can right click on the server to copy the ID.
 */

rest
	.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Success registering commands'))
	.catch(console.error);
