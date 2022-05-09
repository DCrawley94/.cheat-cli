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
		console.error(err);
		throw new Error('How did you fuck this up?');
	});
