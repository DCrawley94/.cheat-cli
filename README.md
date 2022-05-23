# Cheat-CLI

A command line tool that you can use to create your own local cheatsheets ✏️ 📓

## Minimum version requirements

<strong> Node.js: </strong> `v17.7.2`

## Get Started

**Please follow these steps to setup setup the Cheat-CLI on your machine:**

First fork the project then clone the repo into your HOME directory, then navigate into the `.cheat-cli` directory and run the following command:

```sh
npm run setup
```

---

## Usage

Once the setup is complete you will have access to the `cheat` command globally on your machine.

---

The `cheat` command currently accepts only a single flag at a time. These options are described in the table below.

| Action                | Shorthand | Longhand |
| --------------------- | --------- | -------- |
| Add a new note        | -a        | --add    |
| Browse existing notes | -br       | --browse |
| Backup notes          | -bk       | --backup |
| Search notes          | -s        | --search |
| Help                  | -h        | --help   |

---

### **Adding a Note**

When adding a note you are able to choose from the current topics and techs or create new ones by choosing the `"None of the above"` option.

Finally you are asked to provide both a tile and a body for the note.

See below for an example:

![adding a note](images/add-note.png 'adding a note with the cheatsheet tool')

### **Searching Notes**

When searching your notes you are asked to provide the name of the technology you are searching for. Please only search for valid tech names - **no characters that aren't in the alphabet!**

![searching for a note](images/search-notes.png 'searching for a note with the cheatsheet tool')

### **Browsing Notes**

When you choose to browse your notes you will be asked to choose both the topic and tech that you wish to browse.

The notes will then all be printed to your terminal as shown below:

![browsing notes](images/browse-notes.png 'browsing notes with the cheatsheet tool')

### **Backup Notes**

Finally, something I recommend doing regularly, you have the option to backup your notes. Just in case something goes wrong!

![backup notes](images/backup-notes.png 'backing up notes with the cheatsheet tool')

---
