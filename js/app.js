import {newNoteForm, newNoteTable, newQuantityTable} from "./modules/render/render.module.js";

document.addEventListener('DOMContentLoaded', () => {

	//Some useful variables
	
	const popupWindow = document.querySelector('.popup');
	const popupCloseBtn = document.getElementById('popup_close');
	const newNoteBtn = document.getElementById('add_new_note');
	const noteList = document.querySelector('.note_list > .container');
	const noteCategories = document.querySelector('.note_categories > .container');

	//Rendering table with existing notes

	noteList.insertBefore(newNoteTable, newNoteBtn.closest('div'));
		(function(){
			let el = noteList.querySelector('.table_headline-buttons');
			el.removeChild(el.firstChild)
		}())

		//Rendering table with notes quantity

		noteCategories.append(newQuantityTable);


	// "Adding new note" functionality

	newNoteBtn.addEventListener('click', function(){
		popupWindow.querySelector('.popup_content').append(newNoteForm);
		popupWindow.classList.remove('hidden');
	});

	popupCloseBtn.addEventListener('click', function(e){
		this.closest('.popup').classList.add('hidden');
	})

	window.addEventListener('click', function(e){
		if(e.target == newNoteBtn || e.target.closest('.popup')) {
			return false;
		}
		else {
			popupWindow.classList.add('hidden');
		}
	})

		
		




});




