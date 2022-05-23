// TEXT FORMATTING

function capitalise(str) {
	return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
}

function removeFileExtension(fileName) {
	return fileName.substring(0, fileName.length - 5);
}

function formatFileName(fileName) {
	if (fileName.endsWith('.json')) {
		return capitalise(removeFileExtension(fileName));
	}
	return capitalise(fileName);
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
