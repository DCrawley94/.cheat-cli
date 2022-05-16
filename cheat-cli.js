const inquirer = require('inquirer');
const { addNote, backupNotes } = require('./cheat-cli/app');

const questions = [
	{
		type: 'list',
		name: 'action',
		message: 'What would you like to do?',
		choices: ['Add note', 'Find notes', 'Backup notes']
	}
];

inquirer
	.prompt(questions)
	.then(({ action }) => {
		switch (action) {
			case 'Add note':
				addNote();
				break;
			case 'Backup notes':
				backupNotes();
				break;
			default:
				break;
		}
	})
	.catch((err) => {
		console.log({ err });
		throw new Error("Couldn't start cheat-cli");
	});
