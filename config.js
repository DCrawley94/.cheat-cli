const path = require('path');

module.exports = {
	pathToCheatSheets:
		process.env.NODE_ENV === 'test'
			? '__tests__/cheatsheets'
			: path.resolve(
					process.cwd(),
					`${process.env.HOME}/.cheat-cli/cheatsheets`
			  ),
	pathToReset: path.resolve(
		process.cwd(),
		`${process.env.HOME}/cheat-cli/__tests__/scripts/reset-cheatsheets.sh`
	)
};
