// PRINT FANCY MESSAGES 🧑‍🎨 💅

const terminalStyles = {
	lightBlueBold: '\n\x1b[36m\x1b[1m',
	darkBlueBold: '\n\x1b[34m\x1b[1m',
	yellowBold: '\x1b[1m\x1b[33m',
	reset: '\x1b[0m'
};

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
		`${terminalStyles.lightBlueBold}--- ${formatFileName(techName)} ---`
	);
	for (const title in notes) {
		console.log(`${terminalStyles.darkBlueBold}  ${title}`);
		console.log(`   ${terminalStyles.reset} ~ ${notes[title]}\n`);
	}
}

function printErrorMessage(message) {
	console.log(
		` - ${terminalStyles.yellowBold}${message}${terminalStyles.reset} - `
	);
}

module.exports = {
	printNotes,
	printErrorMessage,
	removeFileExtension,
	kebabCase
};
