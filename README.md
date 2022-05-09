# Cheat-CLI

A command line tool that you can use to create your own local cheatsheets.

---

## Get Started

**Please follow these steps to setup setup the Cheat-CLI on your machine:**

First fork the project then clone the repo into your HOME directory, then change directory into `.cheat-cli` and continue with the next steps

### **Cheatsheet Setup Command**

```sh
npm run setup
```

### **Config setup**

If you go to the `config.js` file in the root of `.cheat-cli` it should look something like this. Replace the capitalized string with the <ins>absolute path</ins> _**from your home directory**_ to the relevant file/directory.

- **pathToCheatSheets:** The `cheatsheets` directory can be found in the root directory of `~/.cheat-cli`
- **pathToReset:** Only needed if you plan to run the tests - can be found in the `scripts` directory within `__tests__`

```js
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
```

This file is `.gitignore`'d so won't be pushed to GitHub

---

## Usage

The cheatsheets are designed to be divided into **topics** (e.g. backend) and techs (e.g. express) and can be found in the cheatsheets directory. I have included a couple of topics to get you started but you are able to add as many as you like!

Use the command `npm run cheat` to add notes to a cheatsheet of your choice.

\* I will make it so you can use the `cheat` command globallybut currently I'm working on a way to browse your notes and edit/delete them.
