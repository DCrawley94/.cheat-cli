// TEXT FORMATTING

function capitaliseWords(str) {
	return str
		.split(' ')
		.map((subStr) => {
			return `${subStr.slice(0, 1).toUpperCase()}${subStr.slice(1)}`;
		})
		.join(' ');
}

function removeFileExtension(fileName) {
	return fileName.substring(0, fileName.length - 5);
}

function formatFileName(fileName) {
	if (fileName.endsWith('.json')) {
		return capitaliseWords(removeFileExtension(fileName));
	}
	return capitaliseWords(fileName);
}

// Test this
function kebabCase(string) {
	const lowercased = string.toLowerCase();
	return lowercased.replaceAll(' ', '-');
}

module.exports = {
	removeFileExtension,
	kebabCase,
	formatFileName
};
