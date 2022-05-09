# Cheat-CLI

A command line tool that you can use to create your own local cheatsheets.

---

## Get Started

_Please follow these steps to setup setup the Cheat-CLI on your machine:_

First clone the repo into your HOME directory, then change directory into the repo and continue with the next steps

### **Cheatsheet Setup Command**

```sh
npm run setup
```

### **Env setup**

- Add the following two values to the `.env` file in the root of the Cheat-CLI repository:

```sh
pathToCheatSheets="ABSOLUTE_PATH_TO_THE_CHEATSHEETS_DIRECTORY"
pathToReset="ABSOLUTE_PATH_TO_THE_RESET_SCRIPT" #Only needed for testing - found at __tests__/scripts/reset-cheatsheets.sh
```

---

## Usage

The cheatsheets are designed to be divided into **topics** (e.g. backend) and techs (e.g. express) and can be found in the cheatsheets directory. I have included a couple of topics to get you started but you are able to add as many as you like!

Use the command `npm run cheat` to add notes to a cheatsheet of your choice.

\* I will make it so you can use the `cheat` command globallybut currently I'm working on a way to browse your notes and edit/delete them.
