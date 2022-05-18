#!/usr/bin/env node

const inquirer = require('inquirer');
const {
	searchNotes,
	addNote,
	backupNotes,
	browseNotes
} = require('./cheat-cli/app');

const questions = [
	{
		type: 'list',
		name: 'action',
		message: 'What would you like to do?',
		choices: ['Search', 'Add note', 'Browse notes', 'Backup notes']
	}
];

inquirer
	.prompt(questions)
	.then(({ action }) => {
		switch (action) {
			case 'Search':
				searchNotes();
				break;
			case 'Add note':
				addNote();
				break;
			case 'Backup notes':
				backupNotes();
				break;
			case 'Browse notes':
				browseNotes();
				break;
			default:
				break;
		}
	})
	.catch((err) => {
		console.log({ err });
		throw new Error("Couldn't start cheat-cli");
	});
