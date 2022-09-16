import {tableButtonsData} from './../render/render_data.module.js'

export const DOMElements = {
    newNoteForm : {
		newInput : (obj) => {
			let label =  document.createElement('label');
			let input = document.createElement('input');

			input.setAttribute('type', obj.type);
			input.setAttribute('id', obj.idName);
			input.setAttribute('placeholder', obj.placeholder);
			if(obj.value){
				input.setAttribute('value', obj.value);
			};
			if (obj.required) {
				input.setAttribute('required', '');
			}
			label.setAttribute('for', obj.idName);
			label.innerText = obj.labelContent;

			let result = document.createDocumentFragment();
			result.appendChild(label);
			result.appendChild(input);

			return result;

		},
		newSelect : (obj) => {
			let label =  document.createElement('label');
			let select =  document.createElement('select');
			

			select.setAttribute('name', obj.name);
			select.setAttribute('id', obj.idName);
			select.setAttribute('value', obj.optionValues[0]);

			obj.optionValues.forEach(val => {
				let option = document.createElement('option');
				option.setAttribute('value', val)
				option.innerText = val;
				select.append(option);
			});
			
			label.setAttribute('for', obj.idName);
			label.innerText = obj.labelContent;

			let result = document.createDocumentFragment();
			result.appendChild(label);
			result.appendChild(select);

			return result;

		},
        
        formStructure : function(arr){
            let createNoteForm =  document.createElement('form');
			createNoteForm.setAttribute('id', 'create_note_form');
			createNoteForm.setAttribute('action', '#');
			createNoteForm.classList.add('create_note');

			arr.forEach(el => {
				createNoteForm.append(el);	
			});
			return createNoteForm;
        }
    },
	
	newTableRow : {
		roundedIcon : (val) => {
			let iconWrapper = document.createElement('div');
			iconWrapper.classList.add('rounded_icon');
			iconWrapper.innerHTML = `<svg><use href="./images/dist/sprite.svg#svg-${val}"></use></svg>`
			return iconWrapper;
		},

		tableButton : (arr) => {
			let button = document.createElement('button');
			button.classList.add('btn');
			button.classList.add(`btn-${arr.role}`)
			button.innerHTML = `<svg><use href="./images/dist/sprite.svg#svg-${arr.pic}"></use></svg>`;

			return button;
		},

		tableRow : (obj, headline) => {
			let row = document.createElement('div');
			row.classList.add('table_row');
			if (headline) {
				row.classList.add('table_headline');
			}
			
			let arr = Object.entries(obj);

			for (let i = 0; i < arr.length; i++) {
				let item = document.createElement('div');
				item.classList.add('table_row-item');

				// Adding an icon to the 'Name' item

				if (!headline && i == 0) {
					let iconName = arr[2][1].toLowerCase();
					iconName = iconName.replace(/ /ig, '_')
					let icon = DOMElements.newTableRow.roundedIcon(iconName);
					item.append(icon);
				}

				let paragraph = document.createElement('p');

				item.append(paragraph);
				paragraph.innerText = `${arr[i][1]}`
				row.append(item);
			}
			let tableButtons = document.createElement('div');
			tableButtons.classList.add('table_row-item');
			if(headline){
				tableButtons.classList.add('table_headline-buttons');
			}
			tableButtonsData.forEach(el => {
				let button = DOMElements.newTableRow.tableButton(el);
				tableButtons.append(button);
			});
			
			row.append(tableButtons);

	
			return row;
		},
	}
	
};

