import {DOMElements} from "./../view/DOMElements.module.js";
import { DOMElementsStructre } from "./../view/DOMElementsStructure.module.js";
import {createNotePopupContent, tableOfNotesHeadline} from "./render_data.module.js";
import { contentData } from "./../data/content_data.module.js";


// Creating a newNote form



function createNoteForm (arr) {
    let result = DOMElements.newNoteForm.formStructure(arr);
    return result;
};

export const newNoteForm = createNoteForm(DOMElementsStructre.noteForm);


// creating a note table

function noteTable (arr){
    let table = document.createElement('div');
    table.classList.add('table');

    let notesTableHeadline = DOMElements.newTableRow.tableRow(tableOfNotesHeadline, true);

    table.append(notesTableHeadline);

    arr.forEach(el => {
        let row = DOMElements.newTableRow.tableRow(el);
        table.append(row);
    });

    return table;
};

export const newNoteTable = noteTable(contentData.visibleNotes);








