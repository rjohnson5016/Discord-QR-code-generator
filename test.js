const QRCode = require('qrcode');

const data = {
	name: 'Ron Swanson',
	age: 43,
	hobbies: ['woodworking', 'fishing', 'Giving Tom shit'],
};

const stringData = JSON.stringify(data);

QRCode.toDataURL(stringData, function (error, code) {
	if (error) {
		console.log(error);
	}
	console.log(code);
});
