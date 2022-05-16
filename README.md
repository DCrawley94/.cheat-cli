# Cheat-CLI

A command line tool that you can use to create your own local cheatsheets.

---

## Get Started

**Please follow these steps to setup setup the Cheat-CLI on your machine:**

First fork the project then clone the repo into your HOME directory, then change directory into `.cheat-cli` and run the following command:

```sh
npm run setup
```

---

## Usage

Once the setup is complete you will have access to the `cheat` command globally on your machine.

---

When you run the cheat command you will be given a choice on what you want to do as seen here:

![cheatsheet tool main menu](images/main.png 'Cheatsheet tool main menu')

### **Adding a Note**

When adding a note you are able to choose from the current topics and techs or create new ones by choosing the **None of the above** option.

Finally you are asked to provide both a tile and a body for the note.

See below for an example:

![adding a note](images/add-note.png 'adding a note with the cheatsheet tool')

### **Browsing Notes**

When you choose to browse your notes you will be asked to choose both the topic and tech that you wish to browse.

The notes will then all be printed to your terminal as shown below:

![browsing notes](images/browse-notes.png 'browsing notes with the cheatsheet tool')

### **Backup Notes**

Finally, something I recommend doing regularly, you have the option to backup your notes. Just in case something goes wrong!

![backup notes](images/backup.png 'backing up notes with the cheatsheet tool')

---

## Features to be added:

- Basic search functionality
- Add flags such as `-b` (for browse) or `-a` (for add) to the command
