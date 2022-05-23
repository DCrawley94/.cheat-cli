const fs = require('fs/promises');
const askUser = require('../utils/askUser');
const { pathToCheatSheets } = require('../../../../config');
const { printNotes } = require('../utils/printMessage');

async function browseNotes() {
	const currTopics = await fs.readdir(pathToCheatSheets);

	const question1 = {
		name: 'topicChoice',
		message: 'Which topic would you like to browse?',
		type: 'list',
		choices: [...currTopics]
	};

	const { topicChoice } = await askUser(question1);
	const techFileNames = await fs.readdir(`${pathToCheatSheets}/${topicChoice}`);

	const question2 = {
		name: 'techChoice',
		message: 'Which tech would you like to browse?',
		type: 'list',
		choices: [...techFileNames]
	};

	const { techChoice } = await askUser(question2);

	const notes = JSON.parse(
		await fs.readFile(
			`${pathToCheatSheets}/${topicChoice}/${techChoice}`,
			'utf-8'
		)
	);

	printNotes(notes, techChoice);
}

module.exports = browseNotes;
