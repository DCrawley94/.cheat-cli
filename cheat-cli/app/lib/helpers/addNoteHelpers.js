const fs = require('fs/promises');
const path = require('path');
const { pathToCheatSheets } = require('../../../../config');
const askUser = require('./askUser');
const {
	removeFileExtension,
	printErrorMessage,
	kebabCase
} = require('./text-formatting');

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

	let { topicChoice } = await askUser(question1);
	let formattedTopicName;

	if (topicChoice === 'None of the above') {
		const { newTopic } = await askUser(
			question2,
			[''],
			'Please Supply Topic Name'
		);

		formattedTopicName = kebabCase(newTopic);

		if (currTopics.includes(formattedTopicName)) {
			printErrorMessage(
				'Topic already exists - please select it from the options'
			);
			return queryTopic();
		} else {
			await fs.mkdir(`${pathToCheatSheets}/${formattedTopicName}`);
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

	let { techChoice } = await askUser(question1);
	let formattedTechChoice;

	if (techChoice === 'None of the above') {
		const { newTech } = await askUser(
			question2,
			[''],
			'Please give valid tech name'
		);

		formattedTechChoice = kebabCase(newTech);

		if (currTechs.includes(formattedTechChoice)) {
			printErrorMessage(
				'Tech already exists - please select it from the options'
			);
			return queryTech(topicChoice);
		} else {
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
		rawTechNotes = null;
	}

	const { title, body } = await askUser(
		questions,
		[''],
		'Title and body must contain at least 1 character'
	);
	const newTechNotes = { ...JSON.parse(rawTechNotes) } || {};
	if (checkIfNoteExists(title, newTechNotes)) {
		printErrorMessage('Title already exists - please select from the list');
		return collectNoteData(topicChoice, techChoice);
	} else {
		newTechNotes[title] = body;
	}

	return newTechNotes;
}

function checkIfNoteExists(title, currNotes) {
	return currNotes[title] ? true : false;
}

module.exports = {
	queryTopic,
	queryTech,
	collectNoteData,
	askUser,
	checkIfNoteExists
};
