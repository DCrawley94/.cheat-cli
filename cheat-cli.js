const inquirer = require('inquirer');
const { addNote } = require('./cheat-cli/app');

const questions = [
	{
		type: 'list',
		name: 'action',
		message: 'What would you like to do?',
		choices: ['Add note', 'Find note', 'Delete note']
	}
];

inquirer
	.prompt(questions)
	.then(({ action }) => {
		if (action === 'Add note') addNote();
	})
	.catch((err) => {
		throw new Error("Couldn't start cheat-cli")
	});
