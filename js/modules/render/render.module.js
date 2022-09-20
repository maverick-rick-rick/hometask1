import { DOMElements } from "./../view/DOMElements.module.js";
import { DOMElementsStructre } from "./../view/DOMElementsStructure.module.js";
import {
  createNotePopupContent,
  tableOfNotesHeadline,
  tableOfQuantityHeadline,
} from "./render_data.module.js";
import { contentData } from "./../data/content_data.module.js";
import {
  notesQuantityByCategories,
  addNewNoteItem,
  dislocateNote,
  changeNoteItem,
} from "./../data/data_operations.module.js";

// Creating a newNote form

function createNoteForm(arr) {
  let result = DOMElements.newNoteForm.formStructure(arr);
  return result;
}

export const newNoteForm = createNoteForm(DOMElementsStructre.noteForm);

// creating a note table

// Function which fills table content with notes

function fillNoteTable(table, arr) {
  let tableContent = table.querySelector(".table_content");

  for (let i = 0; i < arr.length; i++) {
    let row = DOMElements.newTableRow.tableRow(arr[i], {
      headline: false,
      buttons: true,
    });
    row.dataset.index = i;
    tableContent.append(row);
  }

  return tableContent;
}

// function which create note table

function noteTable(arr, type) {
  let table = document.createElement("div");
  table.classList.add("table");
  table.dataset.type = type;

  let headline = DOMElements.newTableRow.tableRow(tableOfNotesHeadline, {
    headline: true,
    buttons: true,
  });
  table.append(headline);

  let tableContent = document.createElement("div");
  tableContent.classList.add("table_content");
  table.append(tableContent);

  table.append(fillNoteTable(table, arr));

  return table;
}

// function, which create table`s specimen for displaying on the screen

export function appendVisibleTable(el) {
  let newNoteTable = noteTable(contentData.visibleNotes, "visible");
  newNoteTable.querySelector(".table_headline-buttons").firstChild.remove();

  el.append(newNoteTable);
}

// function which uses when need to update list of notes without building new table

export function rerenderNoteTables() {
  let visibleTable = document.querySelector('.table[data-type="visible"]');
  let archivedTable = document.querySelector('.table[data-type="archived"]');

  function func(el) {
    let type = el.dataset.type;
    let source;
    if (type == "visible") {
      source = contentData.visibleNotes;
    }
    if (type == "archived") {
      source = contentData.archivedNotes;
    }
    el.querySelector(".table_content").innerHTML = "";
    let newNoteTable = fillNoteTable(el, source);
    el.append(newNoteTable);
  }

  func(visibleTable);
  if (archivedTable) {
    func(archivedTable);
  }
}

//Creating a archived note table

export function appendArchivedTable(el) {
  let archivedNoteTable = noteTable(contentData.archivedNotes, "archived");
  el.append(archivedNoteTable);
}

// creating a table with notes quantity

function fillQuantityTable(arr, el) {
  arr.forEach((element) => {
    let row = DOMElements.newTableRow.tableRow(element, {
      headline: false,
      buttons: false,
    });
    el.append(row);
  });
}

function quantityTable(arr) {
  let table = document.createElement("div");
  table.classList.add("table");
  table.classList.add("table_quantity");
  let headline = DOMElements.newTableRow.tableRow(tableOfQuantityHeadline, {
    headline: true,
    buttons: false,
  });
  table.append(headline);

  let tableContent = document.createElement("div");
  tableContent.classList.add("table_content");
  fillQuantityTable(arr, tableContent);
  table.append(tableContent);

  return table;
}

let notesQuantity = notesQuantityByCategories(contentData);

export const newQuantityTable = quantityTable(notesQuantity);

export function rerenderQuantityTable(el) {
  let content = el.querySelector(".table_content");
  content.innerHTML = "";
  let notesQuantity = notesQuantityByCategories(contentData);
  let newQuantityTable = fillQuantityTable(notesQuantity, content);
}

// Parcing data from newNote form, appending new table row

export function createNewTableItem(el) {
  let newDatabaseElem = addNewNoteItem(el);
  contentData.visibleNotes.push(newDatabaseElem);

  let obj = contentData.visibleNotes[contentData.visibleNotes.length - 1];
  let result = DOMElements.newTableRow.tableRow(obj, {
    headline: false,
    buttons: true,
  });
  result.dataset.index = contentData.visibleNotes.length - 1;
  return result;
}

// Archiving / restoring notes

export function moveNote(index, type) {
  dislocateNote(index, type);
}

// Editing existing note

export function fillFormWithExistingNote(index, type) {
  let currentNoteObj;
  if (type == "visible") {
    currentNoteObj = contentData.visibleNotes[index];
  }
  if (type == "archived") {
    currentNoteObj = contentData.archivedNotes[index];
  }

  newNoteForm.reset();

  newNoteForm.querySelector("#create_note_name").value = currentNoteObj.name;
  newNoteForm.querySelector("#create_note_category").value =
    currentNoteObj.category;
  newNoteForm.querySelector("#create_note_content").value =
    currentNoteObj.content;

  console.log(newNoteForm);

  return newNoteForm;
}

export function editExistingNote(el, index, val) {
  let newDatabaseElem = addNewNoteItem(el);
  changeNoteItem(newDatabaseElem, index, val);
}
