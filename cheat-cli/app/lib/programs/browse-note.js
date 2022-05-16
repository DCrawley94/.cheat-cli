const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs/promises');

const { pathToCheatSheets } = require('../../../../config');
const { capitalise, terminalStyles } = require('../helpers/text-formatting');

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

	const techName = techChoice.slice(0, techChoice.length - 5);

	console.log(`${terminalStyles.lightBlueBold}--- ${capitalise(techName)} ---`);
	for (const title in notes) {
		console.log(`${terminalStyles.darkBlue}  ${title}`);
		console.log(`   ${terminalStyles.reset} ~ ${notes[title]}\n`);
	}
}

module.exports = browseNotes;
