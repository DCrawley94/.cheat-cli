// PRINT FANCY MESSAGES 🧑‍🎨 💅

const terminalStyles = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	dim: '\x1b[2m',
	underscore: '\x1b[4m',
	blink: '\x1b[5m',
	reverse: '\x1b[7m',
	hidden: '\x1b[8m',

	black: '\x1b[30m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m',
	white: '\x1b[37m',

	BGblack: '\x1b[40m',
	BGred: '\x1b[41m',
	BGgreen: '\x1b[42m',
	BGyellow: '\x1b[43m',
	BGblue: '\x1b[44m',
	BGmagenta: '\x1b[45m',
	BGcyan: '\x1b[46m',
	BGwhite: '\x1b[47m'
};

//{
// 	lightBlueBold: '\n\x1b[36m\x1b[1m',
// 	darkBlueBold: '\n\x1b[34m\x1b[1m',
// 	yellowBold: '\x1b[1m\x1b[33m',
// 	reset: '\x1b[0m'
// };

// TEXT FORMATTING

function capitalise(str) {
	return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
}

function removeFileExtension(fileName) {
	return fileName.substring(0, fileName.length - 5);
}

function formatFileName(fileName) {
	if (fileName.endsWith('.json')) {
		return capitalise(removeFileExtension(fileName));
	}
	return capitalise(fileName);
}

// Test this
function kebabCase(string) {
	const lowercased = string.toLowerCase();
	return lowercased.replaceAll(' ', '-');
}

// PRINTING NOTES

function printNotes(notes, techName) {
	console.log(
		`\n${terminalStyles.cyan}${terminalStyles.bright}--- ${formatFileName(
			techName
		)} ---`
	);
	for (const title in notes) {
		console.log(`\n${terminalStyles.blue}  ${title}`);
		console.log(`   ${terminalStyles.reset} ~ ${notes[title]}\n`);
	}
}

function printErrorMessage(message) {
	console.log(
		` - ${terminalStyles.yellow}${message}${terminalStyles.reset} - `
	);
}

module.exports = {
	printNotes,
	printErrorMessage,
	removeFileExtension,
	kebabCase
};
