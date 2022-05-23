const { pathToCheatSheets } = require('../../../../config');
const fs = require('fs/promises');
const glob = require('glob');
const inquirer = require('inquirer');
const { printErrorMessage, printNotes } = require('../utils/printMessage');
const { kebabCase } = require('../utils/textFormatting');

async function searchNotes() {
	const question = {
		name: 'searchTerm',
		message: 'Which tech would you like to search for?',
		type: 'input'
	};
	const { searchTerm } = await inquirer.prompt(question);
	// some kind of text formatting function here

	const isValidSearch = /.+/.test(searchTerm);
	if (!isValidSearch) printErrorMessage('Not a Valid Search 😞');
	else {
		const searchPattern = `/*/${kebabCase(searchTerm)}.json`;
		const searchOptions = { root: pathToCheatSheets };

		glob(searchPattern, searchOptions, async (err, matches) => {
			if (err) throw err;
			else {
				if (matches.length === 0)
					printErrorMessage('No matches found for your search');
				else {
					const rawNotes = await fs.readFile(matches[0], 'utf-8');
					const parsedNotes = JSON.parse(rawNotes);

					printNotes(parsedNotes, searchTerm);
				}
			}
		});
	}
}

module.exports = searchNotes;
