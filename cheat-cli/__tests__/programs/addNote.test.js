process.env.pathToCheatSheets = '__tests__/cheatsheets';

const fs = require('fs/promises');
const { execFileSync } = require('child_process');
const { pathToCheatSheets, pathToReset } = process.env;

const helpers = require('../../app/lib/helpers/addNoteHelpers');
const addNote = require('../../app/lib/programs/add-note');

jest.mock('fs/promises', () => {
	return {
		writeFile: jest.fn().mockImplementation(() => 'Successfully written!'),
		readFile: jest
			.fn()
			.mockReturnValueOnce('')
			.mockReturnValueOnce(
				JSON.stringify({
					title: 'Error handling middleware',
					body: "It's reet good"
				})
			)
	};
});
jest.mock('../../app/lib/helpers/addNoteHelpers', () => {
	return {
		queryTopic: jest.fn().mockImplementation(async () => 'backend'),
		queryTech: jest.fn().mockImplementation(async () => 'express'),
		collectNoteData: jest.fn().mockImplementation(async () => {
			return {
				'Error handling middleware': "It's reet good"
			};
		})
	};
});

beforeEach(() => {
	execFileSync(pathToReset);
});

afterEach(() => {
	helpers.queryTopic.mockClear();
	helpers.queryTech.mockClear();
	helpers.collectNoteData.mockClear();
	fs.writeFile.mockClear();
});

describe('addNote()', () => {
	it('should invoke the queryTopic() helper function', async () => {
		await addNote();
		expect(helpers.queryTopic).toHaveBeenCalledTimes(1);
	});

	it('should invoke the queryTech helper function with the output of queryTopic()', async () => {
		await addNote();
		expect(helpers.queryTech).toHaveBeenCalledTimes(1);
		expect(helpers.queryTech).toHaveBeenCalledWith('backend');
	});

	it('should invoke the collectNoteData helper function with output of both queryTopic() and queryTech()', async () => {
		await addNote();
		expect(helpers.collectNoteData).toHaveBeenCalledTimes(1);
		expect(helpers.collectNoteData).toHaveBeenCalledWith('backend', 'express');
	});

	it('should should invoke fs.writeFile() with correctly formed path and data when chosen tech DOES have a matching json file', async () => {
		await addNote();

		expect(fs.writeFile).toHaveBeenCalledTimes(1);
		expect(fs.writeFile).toHaveBeenLastCalledWith(
			`${process.env.pathToCheatSheets}/backend/express.json`,
			JSON.stringify({
				'Error handling middleware': "It's reet good"
			})
		);
	});

	test.todo(
		"should should invoke fs.writeFile() with correctly formed path when chosen tech DOESN'T have a matching json file"
	);

	it('should invoke fs.writeFile() with correctly formed path and updated tech when chosen tech already has note in the JSON file', async () => {
		await addNote();

		helpers.collectNoteData.mockReturnValueOnce({
			'Error handling middleware': "It's reet good",
			'Error-handling-middleware': "It's reet good"
		});

		await addNote();

		expect(fs.writeFile).toHaveBeenCalledTimes(2);
		expect(fs.writeFile).toHaveBeenLastCalledWith(
			'__tests__/cheatsheets/backend/express.json',
			JSON.stringify({
				'Error handling middleware': "It's reet good",
				'Error-handling-middleware': "It's reet good"
			})
		);
	});

	test.todo('throws error/ asks again if suggested note already exists');
	// reassign mock return value
	// write and test util to check if a note exists
});
