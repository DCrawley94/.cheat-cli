const inquirer = require('inquirer');
const fs = require('fs/promises');

const { pathToCheatSheets } = require('../../../../config');
const { printNotes } = require('../helpers/text-formatting');

async function browseNotes() {
	const currTopics = await fs.readdir(pathToCheatSheets);

	const question1 = {
		name: 'topicChoice',
		message: 'Which topic would you like to browse?',
		type: 'list',
		choices: [...currTopics]
	};

	const { topicChoice } = await inquirer.prompt(question1);
	const techFileNames = await fs.readdir(`${pathToCheatSheets}/${topicChoice}`);

	const question2 = {
		name: 'techChoice',
		message: 'Which tech would you like to browse?',
		type: 'list',
		choices: [...techFileNames]
	};

	const { techChoice } = await inquirer.prompt(question2);

	const notes = JSON.parse(
		await fs.readFile(
			`${pathToCheatSheets}/${topicChoice}/${techChoice}`,
			'utf-8'
		)
	);

	printNotes(notes, techChoice);
}

module.exports = browseNotes;
