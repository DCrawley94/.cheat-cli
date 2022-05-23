const inquirer = require('inquirer');
const { printErrorMessage } = require('./printMessage');

async function askUser(questions, invalidAnswers, invalidMsg) {
	const preparedQuestions = Array.isArray(questions) ? questions : [questions];

	const answers = await inquirer.prompt(preparedQuestions);
	if (invalidAnswers) {
		for (key in answers) {
			if (invalidAnswers.includes(answers[key])) {
				printErrorMessage(invalidMsg);

				return askUser(questions, invalidAnswers, invalidMsg);
			}
		}
	}
	return answers;
}

module.exports = askUser;
