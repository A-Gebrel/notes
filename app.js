console.log("Starting app.js");

const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes.js");

const titleOptions = {
  describe: "Title of note",
  demand: true,
  alias: "t"
};

const bodyOptions = {
  describe: "Body of note",
  demand: true,
  alias: "b"
};

const argv = yargs
  .command("add", "Add a new note", {
    title: titleOptions,
    body: bodyOptions
  })
  .command("list", "List all notes")
  .command("read", "Read a note", { title: titleOptions })
  .command("remove", "Remove a note", { title: titleOptions })
  .help().argv;
var command = argv._[0];

const printNote = note => {
  console.log(`Title: ${note.title}\nBody: ${note.body}`);
  console.log("---");
};

console.log("==========");
if (command === "add") {
  let note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log("Note Created\n--");
    printNote(note);
  } else {
    console.log("Title already in use, Pick another title!");
  }
} else if (command === "list") {
  let notez = notes.getAll();
  if (notez) {
    console.log(`Displaying ${notez.length} note(s)`);
    notez.map(printNote);
  } else {
    console.log("0 Notes found!");
  }
} else if (command === "read") {
  let note = notes.getNote(argv.title);
  if (note) printNote(note);
  else console.log("Note not found!");
} else if (command === "remove") {
  let noteRemoved = notes.removeNote(argv.title);
  console.log(noteRemoved ? "Note was removed" : "Note not found!");
} else {
  console.log("Command not recognized");
}
