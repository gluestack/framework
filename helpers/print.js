const colors = require('colors');

const newline = () => console.log();

const info = (msg1, msg2) => {
	if (!msg2 || msg2 === '') {
		return warning(msg1);
	}
	return console.log('>', msg1.brightBlue, '→', msg2);
};

const success = (msg1, msg2) => {
	if (!msg2 || msg2 === '') {
		return console.log('>', msg1.brightGreen);
	} else {
		return console.log('>', msg1.brightGreen, '→', msg2);
	}
};

const error = (msg1, msg2) => {
	if (!msg2 || msg2 === '') {
		console.log('>', msg1.brightRed);
	} else {
		console.log('>', msg1.brightRed, '→', msg2);
	}
};

const json = (msg1) => console.log(msg1.brightGreen);

const warning = (msg1, msg2) => {
	if (!msg2 || msg2 === '') {
		return console.log('>', msg1.brightYellow);
	}
	return console.log('>', msg1.brightYellow, '→', msg2);
};
module.exports = {
	newline,
	info,
	success,
	error,
	json,
	warning,
};
