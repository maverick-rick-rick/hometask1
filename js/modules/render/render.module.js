import {DOMElements} from "./../view/DOMElements.module.js";
import { DOMElementsStructre } from "./../view/DOMElementsStructure.module.js";
import {createNotePopupContent, tableOfNotesHeadline, tableOfQuantityHeadline} from "./render_data.module.js";
import { contentData } from "./../data/content_data.module.js";
import { notesQuantityByCategories } from "./../data/data_operations.module.js";


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

    let headline = DOMElements.newTableRow.tableRow(tableOfNotesHeadline, {headline : true, buttons : true});

    table.append(headline);

    arr.forEach(el => {
        let row = DOMElements.newTableRow.tableRow(el, {headline : false, buttons : true});
        table.append(row);
    });

    return table;
};

export const newNoteTable = noteTable(contentData.visibleNotes);

// creating a table with notes quantity

function quantityTable(arr){
    let table = document.createElement('div');
    table.classList.add('table');
    let headline = DOMElements.newTableRow.tableRow(tableOfQuantityHeadline, {headline : true, buttons : false});
    table.append(headline);
    arr.forEach(el => {
        let row = DOMElements.newTableRow.tableRow(el, {headline : false, buttons : false});
        table.append(row);
    });
    return table;
};

let notesQuantity = notesQuantityByCategories(contentData);

export const newQuantityTable =  quantityTable(notesQuantity);








