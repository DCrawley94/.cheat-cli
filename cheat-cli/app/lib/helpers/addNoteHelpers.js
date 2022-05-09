const fs = require('fs/promises');
const inquirer = require('inquirer');
const { pathToCheatSheets } = process.env;

async function queryTopic() {
	const topicsList = await fs.readdir(pathToCheatSheets);
	const topicsQuestions = [
		{
			name: 'topicChoice',
			message: 'How would you class this note?',
			type: 'list',
			choices: [...topicsList, 'None of the above']
		},
		{ name: 'newTopic', message: 'Name your new topic...', type: 'input' }
	];

	let { topicChoice } = await inquirer.prompt(topicsQuestions[0]);
	let formattedTopicName;

	if (topicChoice === 'None of the above') {
		const { newTopic } = await inquirer.prompt(topicsQuestions[1]);
		if (newTopic === '') {
			throw new Error('---- PLEASE GIVE VALID TOPIC NAME ----');
		} else {
			formattedTopicName = newTopic.replace(' ', '-');
			if (topicsList.includes(formattedTopicName)) {
				throw new Error(
					'--- Topic already exists - please select it from the options ---'
				);
			} else {
				await fs.mkdir(`${pathToCheatSheets}/${formattedTopicName}`);
			}
		}

		topicChoice = newTopic;
	}

	return formattedTopicName || topicChoice;
}

async function queryTech(topicChoice) {
	const techList = await fs.readdir(`${pathToCheatSheets}/${topicChoice}`);
	const formattedTechList = techList.map((tech) =>
		tech.substring(0, tech.length - 5)
	);

	const [question1, question2] = [
		{
			name: 'techChoice',
			type: 'list',
			message: 'Which tech would you like to add a note for?',
			choices: [...formattedTechList, 'None of the above']
		},
		{ name: 'newTech', message: 'Name your new tech...', type: 'input' }
	];

	let { techChoice } = await inquirer.prompt(question1);
	let kebabCaseTech;

	if (techChoice === 'None of the above') {
		const { newTech } = await inquirer.prompt(question2);
		if (newTech === '') {
			throw new Error('---- PLEASE GIVE VALID TECH NAME ----');
		} else {
			kebabCaseTech = newTech.replace(/ /g, '-');
			if (formattedTechList.includes(kebabCaseTech)) {
				throw new Error(
					'--- Tech already exists - please select it from the options ---'
				);
			}
			await fs.writeFile(
				`${pathToCheatSheets}/${topicChoice}/${kebabCaseTech}.json`,
				'{}'
			);
		}

		techChoice = newTech;
	}

	return kebabCaseTech || techChoice;
}

async function collectNoteData(topicChoice, techChoice) {
	let raw;

	try {
		raw = await fs.readFile(
			`${pathToCheatSheets}/${topicChoice}/${techChoice}`,
			'utf-8'
		);
	} catch (error) {
		raw = null;
	}

	const questions = [
		{
			type: 'input',
			name: 'title',
			message: 'What is the title of your note?'
		},
		{ type: 'input', name: 'body', message: 'Please type your note...' }
	];

	const { title, body } = await inquirer.prompt(questions);

	const newNotes = { ...JSON.parse(raw) } || {};

	if (checkIfNoteExists(title, newNotes)) {
		throw new Error('Title already exists - please choose another');
	} else {
		newNotes[title] = body;
	}

	return newNotes;
}

function checkIfNoteExists(title, currNotes) {
	return currNotes[title] ? true : false;
}

module.exports = { queryTopic, queryTech, collectNoteData, checkIfNoteExists };
