const { pathToCheatSheets } = require('../../../../config');
const fs = require('fs/promises');

const {
	queryTopic,
	queryTech,
	collectNoteData
} = require('../helpers/addNoteHelpers');

async function addNote() {
	const topicChoice = await queryTopic();
	const techChoice = await queryTech(topicChoice);
	const updatedNotes = await collectNoteData(topicChoice, techChoice);

	let filePath = `${pathToCheatSheets}/${topicChoice}/${techChoice}`;

	if (!filePath.endsWith('.json')) {
		filePath += '.json';
	}

	try {
		await fs.writeFile(filePath, JSON.stringify(updatedNotes));
	} catch (error) {
		console.log('Error in add-note.js', { error });
	}
}

module.exports = addNote;
