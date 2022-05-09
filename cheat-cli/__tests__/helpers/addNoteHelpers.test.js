const { execFileSync } = require('child_process');
const { pathToReset, pathToCheatSheets } = require('../../../config');
const fs = require('fs/promises');
const inquirer = require('inquirer');

const {
	queryTopic,
	queryTech,
	collectNoteData,
	checkIfNoteExists
} = require('../../app/lib/helpers/addNoteHelpers');

// --- Declare Mocks ---
jest.mock('inquirer');
jest.mock('fs/promises');

describe('queryTopic()', () => {
	beforeEach(() => {
		jest.resetAllMocks();

		fs.readdir.mockResolvedValue(['backend', 'frontend']);

		execFileSync(pathToReset);
	});

	it('should return a string', async () => {
		inquirer.prompt.mockResolvedValue({ topicChoice: 'backend' });

		expect(typeof (await queryTopic())).toBe('string');
	});

	it('should invoke inquirer.prompt with correctly formed question - choices array should include results of readDir', async () => {
		inquirer.prompt.mockResolvedValue({ topicChoice: 'backend' });

		await queryTopic();

		expect(inquirer.prompt).toHaveBeenCalledWith({
			name: 'topicChoice',
			message: 'How would you class this note?',
			type: 'list',
			choices: ['backend', 'frontend', 'None of the above']
		});
	});

	it('should invoke inquirer.prompt with correctly formed question - readdir returns empty array', async () => {
		fs.readdir.mockResolvedValue([]);
		inquirer.prompt.mockResolvedValue({ topicChoice: 'backend' });

		await queryTopic();

		expect(inquirer.prompt).toHaveBeenCalledWith({
			name: 'topicChoice',
			message: 'How would you class this note?',
			type: 'list',
			choices: ['None of the above']
		});
	});

	it('should invoke fs.readdir', async () => {
		inquirer.prompt.mockResolvedValue({ topicChoice: 'backend' });

		await queryTopic();

		expect(fs.readdir).toHaveBeenCalledTimes(1);
	});

	// NEEDS FIGURING OUT
	// /expect(fs.readdir).toHaveBeenCalledWith(pathToCheatSheets);

	test.todo('should invoke fs.readdir with correct formed path');

	it('should return topic selected by user - single invocation of inquirer.prompt', async () => {
		inquirer.prompt.mockResolvedValue({ topicChoice: 'backend' });

		const topic = await queryTopic();

		expect(topic).toBe('backend');
		expect(inquirer.prompt).toHaveBeenCalledTimes(1);
	});

	it('should return topic created by user when user selects the "None of the above" option - inquirer.prompt invoked a second time with correctly formed question', async () => {
		inquirer.prompt
			.mockReturnValueOnce({ topicChoice: 'None of the above' })
			.mockReturnValueOnce({ newTopic: 'New topic' });

		await queryTopic();

		expect(inquirer.prompt).toHaveBeenCalledTimes(2);
		expect(inquirer.prompt).toHaveBeenCalledWith({
			name: 'topicChoice',
			message: 'How would you class this note?',
			type: 'list',
			choices: ['backend', 'frontend', 'None of the above']
		});
		expect(inquirer.prompt).toHaveBeenCalledWith({
			name: 'newTopic',
			message: 'Name your new topic...',
			type: 'input'
		});
	});

	it('should return user created topic in kebab-case', async () => {
		inquirer.prompt
			.mockReturnValueOnce({ topicChoice: 'None of the above' })
			.mockReturnValueOnce({ newTopic: 'New topic' });

		const output = await queryTopic();

		expect(output).toBe('New-topic');
	});

	it('should throw an error when user tries to create a topic that is an empty string', async () => {
		inquirer.prompt
			.mockReturnValueOnce({ topicChoice: 'None of the above' })
			.mockReturnValueOnce({ newTopic: '' });

		await expect(queryTopic()).rejects.toThrow(
			'---- PLEASE GIVE VALID TOPIC NAME ----'
		);
	});
	it('should throw an error when user tries to recreate a topic that already exists', async () => {
		inquirer.prompt
			.mockReturnValueOnce({ topicChoice: 'None of the above' })
			.mockReturnValueOnce({ newTopic: 'backend' });

		await expect(queryTopic()).rejects.toThrow(
			'--- Topic already exists - please select it from the options ---'
		);
	});
});

describe('queryTech()', () => {
	beforeEach(() => {
		jest.resetAllMocks();

		fs.readdir.mockResolvedValue(['react.json']);

		execFileSync(pathToReset);
	});

	it('should return a string', async () => {
		inquirer.prompt.mockResolvedValue({ topicChoice: 'react' });
		expect(typeof (await queryTopic('frontend'))).toBe('string');
	});

	it('should invoke fs.readdir with correctly formed path', async () => {
		fs.readdir.mockResolvedValue([]);
		inquirer.prompt.mockResolvedValue({ techChoice: 'frontend' });

		await queryTech('frontend');

		expect(fs.readdir).toHaveBeenCalledTimes(1);
		expect(fs.readdir).toHaveBeenCalledWith(`${pathToCheatSheets}/frontend`);
	});

	it('should invoke inquirer.prompt with correctly formed question - choices array should include results of readDir', async () => {
		inquirer.prompt.mockResolvedValue({ techChoice: 'react' });

		await queryTech('frontend');

		expect(inquirer.prompt).toHaveBeenCalledWith({
			name: 'techChoice',
			type: 'list',
			message: 'Which tech would you like to add a note for?',
			choices: ['react', 'None of the above']
		});
	});

	it('should invoke inquirer.prompt with properly formed question - readdir returns empty array', async () => {
		fs.readdir.mockResolvedValue([]);
		inquirer.prompt
			.mockResolvedValue({ techChoice: 'None of the above' })
			.mockResolvedValueOnce({ newTech: 'css' });

		await queryTech('frontend');

		expect(inquirer.prompt).toHaveBeenCalledWith({
			name: 'techChoice',
			type: 'list',
			message: 'Which tech would you like to add a note for?',
			choices: ['None of the above']
		});
	});

	it('should return tech selected by user - single invocation of inquirer.prompt', async () => {
		inquirer.prompt.mockResolvedValue({ techChoice: 'react' });

		const tech = await queryTech('frontend');

		expect(tech).toBe('react');
		expect(inquirer.prompt).toHaveBeenCalledTimes(1);
	});

	it('should return tech created by user if user selects "None of the above" - inquirer.prompt invoked a second time with correctly formed prompt', async () => {
		inquirer.prompt
			.mockReturnValueOnce({ techChoice: 'None of the above' })
			.mockReturnValueOnce({ newTech: 'html' });

		const tech = await queryTech('frontend');

		expect(tech).toBe('html');

		expect(inquirer.prompt).toHaveBeenCalledTimes(2);

		expect(inquirer.prompt).toHaveBeenNthCalledWith(1, {
			name: 'techChoice',
			type: 'list',
			message: 'Which tech would you like to add a note for?',
			choices: ['react', 'None of the above']
		});
		expect(inquirer.prompt).toHaveBeenNthCalledWith(2, {
			name: 'newTech',
			message: 'Name your new tech...',
			type: 'input'
		});
	});

	it('should return user created tech in kebab-case', async () => {
		inquirer.prompt
			.mockReturnValueOnce({ techChoice: 'None of the above' })
			.mockReturnValueOnce({ newTech: 'cool frontend stuff' });

		const tech = await queryTech();

		expect(tech).toBe('cool-frontend-stuff');
	});

	it('should throw an error if user tried to create a tech that is an empty string', async () => {
		inquirer.prompt
			.mockReturnValueOnce({ techChoice: 'None of the above' })
			.mockReturnValueOnce({ newTech: '' });

		await expect(queryTech()).rejects.toThrow(
			'---- PLEASE GIVE VALID TECH NAME ----'
		);
	});

	it('should throw an error when user tries to recreate a tech that already exists', async () => {
		inquirer.prompt
			.mockReturnValueOnce({ techChoice: 'None of the above' })
			.mockReturnValueOnce({ newTech: 'react' });

		await expect(queryTech()).rejects.toThrow(
			'--- Tech already exists - please select it from the options ---'
		);
	});
});

describe('collectNoteData()', () => {
	beforeEach(() => {
		jest.resetAllMocks();

		fs.readFile.mockResolvedValue(
			JSON.stringify({ grid: 'yes', flex: 'maybe' })
		);

		inquirer.prompt.mockReturnValueOnce({ title: 'vanilla', body: 'hmmm' });

		execFileSync(pathToReset);
	});

	it('should return an object with correct keys and values', async () => {
		const expKeys = ['grid', 'flex', 'vanilla'];
		const expValues = ['yes', 'maybe', 'hmmm'];

		const data = await collectNoteData('frontend', 'css');

		expect(Object.keys(data).length).toBeGreaterThan(0);

		expKeys.forEach((key, i) => {
			expect(data[key]).toBe(expValues[i]);
		});
	});

	it('should invoke fs.readFile', async () => {
		await collectNoteData('frontend', 'css');

		expect(fs.readFile).toHaveBeenCalledTimes(1);
	});

	// NEED TO FIGURE OUT HOW TO GET THIS TO WORK PROPERLY!
	// expect
	// 	(fs.readFile)
	// 	.toHaveBeenCalledWith(
	// 		path.resolve(__dirname, `${pathToCheatSheets}/frontend/css.json`),
	// 		'utf-8'
	// 	);

	test.todo('should invoke fs.readFile with correctly formed arguments');

	it('should invoke inquirer.prompt with correctly formed questions', async () => {
		await collectNoteData('frontend', 'css');

		expect(inquirer.prompt).toHaveBeenCalledTimes(1);
		expect(inquirer.prompt).toHaveBeenCalledWith([
			{
				type: 'input',
				name: 'title',
				message: 'What is the title of your note?'
			},
			{ type: 'input', name: 'body', message: 'Please type your note...' }
		]);
	});

	it('should throw an error if chosen title already exists', async () => {
		jest.resetAllMocks();
		fs.readFile.mockResolvedValue(
			JSON.stringify({ grid: 'yes', flex: 'maybe' })
		);
		inquirer.prompt.mockReturnValueOnce({ title: 'grid', body: 'hmmm' });

		await expect(collectNoteData('frontend', 'css')).rejects.toThrow(
			'Title already exists - please choose another'
		);
	});
});

describe('checkIfNoteExists', () => {
	it('should return true if given title is a key on the notes object', () => {
		expect(checkIfNoteExists('hello', { hello: 'world' })).toBe(true);
	});
	it('should return false if given title is NOT a key on the notes object', () => {
		expect(checkIfNoteExists('world', { hello: 'world' })).toBe(false);
	});
	it('should not mutate given notes object', () => {
		const notes = { hello: 'world' };
		checkIfNoteExists('yo', notes);
		expect(notes).toEqual({ hello: 'world' });
	});
});
