

const createNotePopupContent = {
    noteName : {
				type: 'text',
				idName : 'create_note_name',
				placeholder : 'Type here...',
				labelContent : 'Enter your note name',
				required : true
			},
		
	noteCategory : {
		name: 'create_note_category',
		idName: 'create_note_category',
		optionValues : ['Task', 'Thought', 'Idea', 'Quote'],
		labelContent: 'Choose a category of your note'
	},

	noteContent : {
		type: 'textarea',
		idName : 'create_note_content',
		placeholder : 'Type here...',
		labelContent : 'Enter your note content here...',
		required : true
	},
	noteSubmit : {
		type: 'submit',
		idName: 'create_note_submit',
		placeholder : '',
		labelContent : 'If it`s all right, press submit button below',
		value: 'Create a note'
	}
}

const tableButtonsData = [
	{
		role : 'edit',
		pic : 'pencil'
	},
	{
		role : 'archive',
		pic : 'archive'
	}
]

const tableOfNotesHeadline = {
	name : 'Name',
	created : 'Created',
	category : 'Category',
	content : 'Content', 
	deadlines : 'Deadlines'
		
}
const tableOfQuantityHeadline = {
	category : 'Note category',
	active : 'Active',
	archived : 'Archived'
		
}




export {createNotePopupContent, tableOfNotesHeadline, tableButtonsData, tableOfQuantityHeadline} 

