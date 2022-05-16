const { execFile } = require('child_process');
const { pathToBackUp } = require('../../../../config');

function backupNotes() {
	return execFile(pathToBackUp, null, (err, stdout, stderr) => {
		if (err) {
			throw new Error('pathToBackUp in the config.js file is incorrect');
		} else if (stderr) {
			console.log({ stderr });
			throw new Error(
				'Error in backup script! Please message Duncan if this persists :p45: \n'
			);
		} else {
			console.log(`\n${stdout}`);
		}
	});
}
module.exports = backupNotes;
