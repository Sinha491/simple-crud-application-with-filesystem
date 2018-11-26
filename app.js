const yargs = require('yargs');
const notes = require('./notes/notes.js');
const titleOption = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};
const bodyOption = {
  describe: 'body of note',
  demand: true,
  alias: 'b'
};
yargs
.command('list', 'Get list of all notes')
.command('add', 'Add a note', {
  title: titleOption,
  body: bodyOption
})
.command('read', 'Read a note', {
  title: titleOption
})
.command('update', 'Update a note', {
  title: titleOption,
  body: bodyOption
})
.command('remove', 'Remove a note', {
  title: titleOption,
})
.help()
const allcommands = yargs.argv;
const command = allcommands._[0];
if(command == 'list'){
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => {
    notes.logNote(note);
  });
} else if(command == 'add') {
  var note = notes.addNote(allcommands.title, allcommands.body);
  if(note){
    console.log(`New note added`);
    notes.logNote(note);
  } else {
    console.log('Note already added.');
  }
} else if(command == 'read'){
  var note = notes.getNote(allcommands.title);
  if(note){
    notes.logNote(note);
  } else {
    console.log(`Note not available.`);
  }
} else if(command == 'remove'){
  var note = notes.removeNote(allcommands.title);
  var message = note ? 'Note deleted.' : 'Note not avaialable.';
  console.log(message);
} else if(command == 'update'){
  console.log('Updating one notes');
}
