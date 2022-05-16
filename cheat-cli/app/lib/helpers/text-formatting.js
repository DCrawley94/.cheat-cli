exports.capitalise = (str) => {
	return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
};

// PRINT FANCY MESSAGES 🧑‍🎨 💅

exports.terminalStyles = {
	lightBlueBold: '\n\x1b[36m\x1b[1m',
	darkBlue: '\n\x1b[34m',
	reset: '\x1b[0m'
};
