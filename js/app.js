import {newNoteForm, appendVisibleTable, appendArchivedTable, newQuantityTable, createNewTableItem, moveNote, rerenderNoteTables, rerenderQuantityTable, fillFormWithExistingNote, editExistingNote} from "./modules/render/render.module.js";

//   

document.addEventListener('DOMContentLoaded', () => {

	//Some useful variables
	
	const popupWindow = document.querySelector('.popup');
	const popupCloseBtn = document.getElementById('popup_close');
	const newNoteBtn = document.getElementById('add_new_note');
	const noteList = document.querySelector('.note_list > .container');
	const noteCategories = document.querySelector('.note_categories > .container');
	const popupContent = popupWindow.querySelector('.popup_content');
	

	//Rendering table with existing notes

	appendVisibleTable(noteList);
		
	//Rendering table with notes quantity

	noteCategories.append(newQuantityTable);

	// "Adding new note" functionality

	newNoteBtn.addEventListener('click', function(){
		popupContent.innerHTML = '';
		newNoteForm.reset();
		popupContent.append(newNoteForm);
		popupWindow.classList.remove('hidden');
		const noteListTableContent = noteList.querySelector('.table_content');
		newNoteForm.addEventListener('submit', function evnt(e){
        	e.preventDefault();
			let result = createNewTableItem(newNoteForm);
			noteListTableContent.append(result);
			popupWindow.classList.add('hidden');
			popupContent.innerHTML = '';
			newNoteForm.removeEventListener('submit', evnt, false);
    	}, false);
	});

	// Archieved notes

	const archiveListButton = document.querySelector('.table_headline-buttons > .btn-archive');
	archiveListButton.addEventListener('click', function(){
		popupContent.innerHTML = '';
		appendArchivedTable(popupContent);
		popupWindow.classList.remove('hidden');
	});
	
	

	// Archive/Unarchive Note

	document.addEventListener('click', function(e){
		let targetButtonSign = e.target.classList.contains('btn-archive');
		if (!targetButtonSign || e.target.closest('.table_headline-buttons')) {
			return false;
		}
		if (targetButtonSign) {
			let currentNote = e.target.closest('.table_row');
			let parentTable = e.target.closest('.table');
			let typeOfParentTable = parentTable.dataset.type;
			let currentNoteIndex = currentNote.dataset.index;

			moveNote(currentNoteIndex, typeOfParentTable);

			rerenderNoteTables();

			const quantityTable = document.querySelector('.table_quantity');
			rerenderQuantityTable(quantityTable);
		}
	});

	// Edit note

	document.addEventListener('click', function(e){
		let targetButtonSign = e.target.classList.contains('btn-edit');
		if (!targetButtonSign) {
			return false;
		}
		if (targetButtonSign) {
			let currentNote = e.target.closest('.table_row');
			let parentTable = e.target.closest('.table');
			let typeOfParentTable = parentTable.dataset.type;
			let currentNoteIndex = currentNote.dataset.index;

			popupContent.innerHTML = '';
			let editNoteForm = fillFormWithExistingNote(currentNoteIndex, typeOfParentTable);
			popupContent.append(editNoteForm);
			popupWindow.classList.remove('hidden');

			editNoteForm.addEventListener('submit', function evnt(e){
        	e.preventDefault();

			editExistingNote(editNoteForm, currentNoteIndex, typeOfParentTable);

			
			popupWindow.classList.add('hidden');
			popupContent.innerHTML = '';
			rerenderNoteTables();
			editNoteForm.removeEventListener('submit', evnt, false);
    	}, false);
			
			

			
		}
	});

	// Popup control

	popupCloseBtn.addEventListener('click', function(){
		this.closest('.popup').classList.add('hidden');
	});

	window.addEventListener('click', function(e){
		if(e.target == newNoteBtn || e.target == archiveListButton || e.target.closest('.popup') || e.target.classList.contains('btn')) {
			return false;
		}
		else {
			popupWindow.classList.add('hidden');
				
		}
	});
	
});




