const QRCode = require('qrcode');

const data = {
	name: 'Ron Swanson',
	age: 43,
	hobbies: ['woodworking', 'fishing', 'Giving Tom shit'],
};

const stringData = JSON.stringify(data);
const generateQRCode = (phrase) => {
	const qrcode = QRCode.toFile('/tmp/generated_qr_code.png', phrase, (error) => {
		if (error) {
			console.log(error);
		}
	});
	return qrcode;
};
const qrcode = QRCode.toFile('/tmp/test_qr_code.png', 'www.google.com', (error) => {
	if (error) {
		console.log(error);
	}
});

console.log(typeof qrcode);
console.log(stringData);
