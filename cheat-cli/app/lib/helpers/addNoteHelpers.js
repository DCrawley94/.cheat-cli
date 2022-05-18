const fs = require('fs/promises');
const inquirer = require('inquirer');
const path = require('path');
const { pathToCheatSheets } = require('../../../../config');
const { removeFileExtension } = require('./text-formatting');

async function queryTopic() {
	const currTopics = await fs.readdir(
		path.resolve(__dirname, pathToCheatSheets)
	);
	const [question1, question2] = [
		{
			name: 'topicChoice',
			message: 'What is the topic of this note?',
			type: 'list',
			choices: [...currTopics, 'None of the above']
		},
		{ name: 'newTopic', message: 'Name your new topic...', type: 'input' }
	];

	let { topicChoice } = await inquirer.prompt(question1);
	let formattedTopicName;

	if (topicChoice === 'None of the above') {
		const { newTopic } = await inquirer.prompt(question2);
		if (newTopic === '') {
			throw new Error('---- PLEASE GIVE VALID TOPIC NAME ----');
		} else {
			formattedTopicName = newTopic.replace(' ', '-');
			if (currTopics.includes(formattedTopicName)) {
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
	const techFileNames = await fs.readdir(`${pathToCheatSheets}/${topicChoice}`);
	const currTechs = techFileNames.map((tech) => removeFileExtension(tech));
	const [question1, question2] = [
		{
			name: 'techChoice',
			type: 'list',
			message: 'Which tech would you like to add a note for?',
			choices: [...currTechs, 'None of the above']
		},
		{ name: 'newTech', message: 'Name your new tech...', type: 'input' }
	];

	let { techChoice } = await inquirer.prompt(question1);
	let formattedTechChoice;

	if (techChoice === 'None of the above') {
		const { newTech } = await inquirer.prompt(question2);
		if (newTech === '') {
			throw new Error('---- PLEASE GIVE VALID TECH NAME ----');
		} else {
			formattedTechChoice = newTech.replace(/ /g, '-');
			if (currTechs.includes(formattedTechChoice)) {
				throw new Error(
					'--- Tech already exists - please select it from the options ---'
				);
			}
			await fs.writeFile(
				`${pathToCheatSheets}/${topicChoice}/${formattedTechChoice}.json`,
				'{}'
			);
		}

		techChoice = newTech;
	}

	return formattedTechChoice || techChoice;
}

async function collectNoteData(topicChoice, techChoice) {
	const questions = [
		{
			type: 'input',
			name: 'title',
			message: 'What is the title of your note?'
		},
		{
			type: 'input',
			name: 'body',
			message: 'Please type the body of your note...'
		}
	];
	let rawTechNotes;

	try {
		rawTechNotes = await fs.readFile(
			path.resolve(
				__dirname,
				`${pathToCheatSheets}/${topicChoice}/${techChoice}.json`
			),
			'utf-8'
		);
	} catch (error) {
		console.log('error reading file - collectNoteData:', { error });
		rawTechNotes = null;
	}

	const { title, body } = await inquirer.prompt(questions);
	const newTechNotes = { ...JSON.parse(rawTechNotes) } || {};

	if (!title.length || !body.length) {
		throw new Error('---- PLEASE GIVE VALID TITLE AND BODY ----');
	}

	if (checkIfNoteExists(title, newTechNotes)) {
		throw new Error('Title already exists - please choose another');
	} else {
		newTechNotes[title] = body;
	}
	return newTechNotes;
}

function checkIfNoteExists(title, currNotes) {
	return currNotes[title] ? true : false;
}

module.exports = { queryTopic, queryTech, collectNoteData, checkIfNoteExists };
