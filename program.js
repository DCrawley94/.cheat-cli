#!/usr/bin/env node
const { Command } = require('commander');
const {
	searchNotes,
	addNote,
	backupNotes,
	browseNotes
} = require('./cheat-cli/app');
const { printErrorMessage } = require('./cheat-cli/app/lib/utils/printMessage');

const program = new Command();

program
	.option('-a, --add', 'add a note to your cheatsheets')
	.option('-br, --browse', 'browse your existing cheatsheets')
	.option('-bk, --backup', 'backup your cheatsheet files')
	.option('-s, --search', 'search for a particular cheatsheet');

program.parse(process.argv);

const options = program.opts();
const amountOfFlags = Object.values(options).filter(
	(value) => value === true
).length;

if (amountOfFlags === 0) {
	printErrorMessage(
		'Please use the -h or --help flags to see a list of options'
	);
} else if (amountOfFlags > 1) {
	printErrorMessage('Please use only one flag');
} else {
	const { add, browse, backup, search } = options;

	if (add) addNote();
	if (browse) browseNotes();
	if (backup) backupNotes();
	if (search) searchNotes();
}
