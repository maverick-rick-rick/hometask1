import { DOMElements } from "./DOMElements.module.js";
import {
  createNotePopupContent,
  tableOfNotesHeadline,
} from "./../render/render_data.module.js";

export const DOMElementsStructre = {
  noteForm: [
    DOMElements.newNoteForm.newInput(createNotePopupContent.noteName),
    DOMElements.newNoteForm.newSelect(createNotePopupContent.noteCategory),
    DOMElements.newNoteForm.newInput(createNotePopupContent.noteContent),
    DOMElements.newNoteForm.newInput(createNotePopupContent.noteSubmit),
  ],
};
