const fs = require('fs');
var fetchNotes = () => {
  try{
    var noteString = fs.readFileSync('notes-data.json');
    return JSON.parse(noteString);
  } catch(e) {
    return [];
  }
};
var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};
var logNote = (note) => {
  console.log(`-----`);
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};
var getAll = () => {
  return fetchNotes();
};
var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
  var dublicateNotes = notes.filter((note) => note.title === title);
  if(dublicateNotes.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};
var getNote = (title) => {
  var allNotes = fetchNotes();
  var filteredNote = allNotes.filter((note) => note.title === title);
  return filteredNote[0];
};
var removeNote = (title) => {
  var allNotes = fetchNotes();
  var filteredNote = allNotes.filter((note) => note.title !== title);
  saveNotes(filteredNote);
  return filteredNote.length < allNotes.length ? true : false;
};
var updateNote = (title, body) => {
  var allNotes = fetchNotes();
  var filteredNote = allNotes.filter((note) => note.title === title);
  var filteredUpdateNote = allNotes.filter((note) => note.title !== title);
  if(filteredNote){
    filteredNote[0].body = body;
    filteredUpdateNote.push(filteredNote);
    saveNotes(filteredUpdateNote);
    return true;
  } else {
    return false;
  }
};
module.exports = {
  logNote,
  getAll,
  addNote,
  getNote,
  removeNote,
  updateNote,
};
