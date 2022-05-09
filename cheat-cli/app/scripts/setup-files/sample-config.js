const path = require('path');

module.exports = {
	pathToCheatSheets:
		process.env.NODE_ENV === 'test'
			? '__tests__/cheatsheets'
			: path.resolve(
					process.cwd(),
					'__ABSOLUTE_PATH_TO_YOUR_CHEATSHEETS_DIRECTORY__'
			  ),
	pathToReset: path.resolve(
		process.cwd(),
		'__ABSOLUTE_PATH_TO_THE_TEST_RESET_SCRIPT__'
	)
};
